"use client";
import { Candle, ChartViewport, yToPrice } from "@/components/redactor/candle";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

type CandleWithMeta = Candle & { id: number; isEditing: boolean };

const candleSlotWidth = 40;

const TOP_BAR_HEIGHT = 64;
const RIGHT_BAR_WIDTH = 360;

type EditKey = "open" | "close" | "high" | "low";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

interface MarketConfig {
  traders: number;
  targetCandles: number;
  balance: number;
}

const RedactorPage = () => {
  const [candles, setCandles] = useState<CandleWithMeta[]>([]);
  const [spawningCandle, setSpawningCandle] = useState<CandleWithMeta | null>(
    null,
  );
  const [spawningIndex, setSpawningIndex] = useState<number | null>(null);
  const [chartHeight, setChartHeight] = useState<number>(0);
  const [viewport, setViewport] = useState<ChartViewport | null>(null);
  const [config, setConfig] = useState<MarketConfig>({
    traders: 10,
    targetCandles: 5,
    balance: 10_000,
  });

  const cellWidth = candleSlotWidth; // ширина слота
  const cellHeight = 32; // можна залишити фіксованою по вертикаліF

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h = window.innerHeight - TOP_BAR_HEIGHT;
    setChartHeight(h);
    setViewport({
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
      height: h,
    });
  }, []);

  // Extend viewport only outward based on finalized candles
  useEffect(() => {
    if (!chartHeight) return;
    if (candles.length === 0) {
      setViewport((prev) => ({
        minPrice: prev?.minPrice ?? DEFAULT_MIN_PRICE,
        maxPrice: prev?.maxPrice ?? DEFAULT_MAX_PRICE,
        height: chartHeight,
      }));
      return;
    }

    setViewport((prev) => {
      const lows = candles.map((c) => c.low);
      const highs = candles.map((c) => c.high);
      let minLow = Math.min(...lows);
      let maxHigh = Math.max(...highs);

      if (!prev) {
        if (minLow === maxHigh) {
          minLow -= 1;
          maxHigh += 1;
        }
        const padding = (maxHigh - minLow) * 0.05;
        return {
          minPrice: minLow - padding,
          maxPrice: maxHigh + padding,
          height: chartHeight,
        };
      }

      let minPrice = prev.minPrice;
      let maxPrice = prev.maxPrice;

      if (minLow < minPrice) minPrice = minLow;
      if (maxHigh > maxPrice) maxPrice = maxHigh;
      if (minPrice === maxPrice) {
        minPrice -= 1;
        maxPrice += 1;
      }

      return { ...prev, minPrice, maxPrice, height: chartHeight };
    });
  }, [candles, chartHeight]);

  const slotsCount = useMemo(
    () => Math.max(1, candles.length + 1),
    [candles.length],
  );

  const scenarioLabel = useMemo(() => {
    if (candles.length === 0) return "create the first candle";
    if (candles.length === 1) return "set market information";
    if (candles.length < config.targetCandles) {
      const remaining = config.targetCandles - candles.length;
      return `create ${remaining} more candles`;
    }
    return "ready! start?";
  }, [candles.length, config.targetCandles]);

  function handleClickSlot(e: React.MouseEvent<HTMLDivElement>, index: number) {
    if (!viewport) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const priceAtClick = yToPrice(
      clickY,
      viewport.minPrice,
      viewport.maxPrice,
      viewport.height,
    );

    const hasCandle = index < candles.length;

    if (!spawningCandle) {
      if (hasCandle) {
        setCandles((prev) =>
          prev.map((c, i) => ({ ...c, isEditing: i === index })),
        );
      } else {
        setCandles((prev) => prev.map((c) => ({ ...c, isEditing: false })));
        setSpawningCandle({
          id: Date.now(),
          open: priceAtClick,
          close: priceAtClick,
          high: priceAtClick,
          low: priceAtClick,
          timestamp: Date.now(),
          isEditing: false,
        });
        setSpawningIndex(index);
      }
      return;
    }

    // finish spawning into the clicked slot
    setCandles((prev) => {
      const next = [...prev];
      const candle = {
        ...(spawningCandle as CandleWithMeta),
        id: Date.now(),
        isEditing: false,
      };
      if (index >= next.length) {
        next.push(candle);
      } else {
        next[index] = candle;
      }
      return next;
    });
    setSpawningCandle(null);
    setSpawningIndex(null);
  }

  useEffect(() => {
    if (!spawningCandle || spawningIndex === null || !viewport) return;

    const handleMouseMove = (e: MouseEvent) => {
      const slotsDom = document.querySelectorAll(".candleSlot");
      const slotEl = slotsDom[spawningIndex] as HTMLElement | undefined;
      if (!slotEl) return;

      const rect = slotEl.getBoundingClientRect();
      const currentY = e.clientY - rect.top;
      const price = yToPrice(
        currentY,
        viewport.minPrice,
        viewport.maxPrice,
        viewport.height,
      );

      setSpawningCandle((prev) => {
        if (!prev) return null;
        const open = prev.open;
        const close = price;
        const high = Math.max(prev.high, open, close);
        const low = Math.min(prev.low, open, close);
        return { ...prev, open, close, high, low };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [spawningCandle, spawningIndex, viewport]);

  function applyCandleEdit(
    candle: CandleWithMeta,
    key: EditKey,
    value: number,
  ): CandleWithMeta {
    let { open, close, high, low } = candle;

    if (key === "open") {
      const crosses =
        (open <= close && value > close) || (open >= close && value < close);
      if (crosses) {
        const oldClose = close;
        open = oldClose;
        close = value;
      } else {
        open = value;
      }
    } else if (key === "close") {
      const crosses =
        (close <= open && value > open) || (close >= open && value < open);
      if (crosses) {
        const oldOpen = open;
        close = oldOpen;
        open = value;
      } else {
        close = value;
      }
    } else if (key === "high") {
      const bodyHigh = Math.max(open, close);
      high = Math.max(value, bodyHigh);
    } else if (key === "low") {
      const bodyLow = Math.min(open, close);
      low = Math.min(value, bodyLow);
    }

    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);
    high = Math.max(high, bodyHigh);
    low = Math.min(low, bodyLow);

    return { ...candle, open, close, high, low };
  }

  function handleEditCandle(index: number, key: EditKey, price: number) {
    setCandles((prev) =>
      prev.map((c, i) => (i === index ? applyCandleEdit(c, key, price) : c)),
    );
  }

  const remainingToCreate = Math.max(config.targetCandles - candles.length, 0);

  return (
    <Box sx={{ height: "100vh", width: "100vw", background: "#000" }}>
      <RightBar
        config={config}
        setConfig={setConfig}
        scenarioLabel={scenarioLabel}
        remainingToCreate={remainingToCreate}
        canStart={candles.length >= config.targetCandles && candles.length > 0}
      />

      <Box
        sx={{
          position: "absolute",
          top: TOP_BAR_HEIGHT,
          left: 0,
          right: RIGHT_BAR_WIDTH,
          bottom: 0,
          backgroundColor: "#000",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
      linear-gradient(to right, rgba(207,207,207,0.4) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(207,207,207,0.4) 1px, transparent 1px)
    `,
            backgroundSize: `${cellWidth}px ${cellHeight}px`,
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        {viewport ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
              gap: 1,
              width: "100%",
              height: "100%",
            }}
          >
            {Array.from({ length: slotsCount }).map((_, index) => {
              const candle = candles[index];
              const isSpawnSlot = spawningIndex === index && spawningCandle;
              const isFirstEmpty =
                candles.length === 0 && index === 0 && !candle && !isSpawnSlot;

              return (
                <CandleSlot
                  key={index}
                  width={candleSlotWidth}
                  handleClick={(e) => handleClickSlot(e, index)}
                  isSpawning={
                    spawningIndex === index || index === candles.length
                  }
                >
                  {candle && viewport && (
                    <Candle
                      candle={candle}
                      centerX={candleSlotWidth / 2}
                      bodyWidth={18}
                      viewport={viewport}
                      isEditing={candle.isEditing}
                      onChangeOpen={(price) =>
                        handleEditCandle(index, "open", price)
                      }
                      onChangeClose={(price) =>
                        handleEditCandle(index, "close", price)
                      }
                      onChangeHigh={(price) =>
                        handleEditCandle(index, "high", price)
                      }
                      onChangeLow={(price) =>
                        handleEditCandle(index, "low", price)
                      }
                    />
                  )}
                  {isSpawnSlot && spawningCandle && viewport && (
                    <Candle
                      candle={spawningCandle}
                      centerX={candleSlotWidth / 2}
                      bodyWidth={18}
                      viewport={viewport}
                    />
                  )}
                  {isFirstEmpty && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "100%",
                        transform: "translate(12px, -50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pointerEvents: "none",
                      }}
                    >
                      <Box
                        sx={{
                          width: 0,
                          height: 0,
                          borderTop: "6px solid transparent",
                          borderBottom: "6px solid transparent",
                          borderLeft: "10px solid #e5e7eb",
                        }}
                      />
                      <Typography variant="body1" color="#e5e7eb">
                        create the first candle
                      </Typography>
                    </Box>
                  )}
                </CandleSlot>
              );
            })}
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
};

export default RedactorPage;

const CandleSlot = ({
  width,
  children,
  handleClick,
  isSpawning = false,
}: {
  width: number;
  children: React.ReactNode | null;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSpawning?: boolean;
}) => (
  <div
    className="candleSlot"
    onClick={handleClick}
    style={{
      minWidth: width,
      height: "100%",
      position: "relative",
      backgroundColor: isSpawning ? "rgba(169, 169, 169, 0.18)" : "inherit",
    }}
  >
    {children}
  </div>
);

interface RightBarProps {
  config: MarketConfig;
  setConfig: (cfg: MarketConfig) => void;
  scenarioLabel: string;
  remainingToCreate: number;
  canStart: boolean;
}

const RightBar: React.FC<RightBarProps> = ({
  config,
  setConfig,
  scenarioLabel,
  remainingToCreate,
  canStart,
}) => {
  const handleNumberChange = (key: keyof MarketConfig, value: string): void => {
    const num = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(num)) return;
    setConfig({ ...config, [key]: num });
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: TOP_BAR_HEIGHT,
        right: 0,
        bottom: 0,
        width: RIGHT_BAR_WIDTH,
        borderLeft: "1px solid #111827",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: "#9ca3af" }}>
          Scenario
        </Typography>
        <Typography variant="h6">{scenarioLabel}</Typography>
        {remainingToCreate > 0 && (
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            create {remainingToCreate} more candles
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: "#9ca3af" }}>
          Market configuration
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Set market information for the current scenario.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Number of traders"
            type="number"
            size="small"
            value={config.traders}
            onChange={(e) => handleNumberChange("traders", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Number of candles"
            type="number"
            size="small"
            value={config.targetCandles}
            onChange={(e) =>
              handleNumberChange("targetCandles", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Current balance"
            type="number"
            size="small"
            value={config.balance}
            onChange={(e) => handleNumberChange("balance", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>

      <Box sx={{ mt: "auto" }}>
        {canStart ? (
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => {
              // placeholder for future start logic
              // eslint-disable-next-line no-console
              console.log("Start scenario", { config });
            }}
          >
            Start
          </Button>
        ) : (
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Create the required number of candles to start.
          </Typography>
        )}
      </Box>
    </Box>
  );
};
