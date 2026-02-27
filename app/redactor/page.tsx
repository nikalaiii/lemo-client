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
import { calculateEMA } from "./hooks/useEMA";
import EmaMetric from "@/components/redactor/Ema";
import RightBar from "@/components/redactor/RightBar";
import calculateMACD, { MACDResult } from "./hooks/useMACD";
import MacdMetric from "@/components/redactor/MacdMetric";

type CandleWithMeta = Candle & { id: number; isEditing: boolean };

const candleSlotWidth = 40;

const TOP_BAR_HEIGHT = 64;
const RIGHT_BAR_WIDTH = 360;

type EditKey = "open" | "close" | "high" | "low";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

export interface MarketConfig {
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
  const [canStart, setCanstart] = useState<boolean>(false);
  const [ema20, setEma20] = useState<number[] | null>(null);
  const [macdData, setMacdData] = useState<MACDResult | null>(null);
  const [config, setConfig] = useState<MarketConfig>({
    traders: 10,
    targetCandles: 5,
    balance: 10_000,
  });
  // compute indicators in memo blocks; the helpers themselves are pure functions
  const emaValues = useMemo(() => calculateEMA(candles, 20), [candles]);

  const macdResult = useMemo(
    () =>
      calculateMACD({
        candles,
        period1: 12,
        period2: 26,
        periodSignal: 9,
      }),
    [candles],
  );

  const slotsCount = useMemo(
    () => Math.max(1, candles.length + 1),
    [candles.length],
  );

  const slotsWidth = slotsCount * candleSlotWidth + (slotsCount - 1) * 8;

  const cellWidth = candleSlotWidth; // ширина слота
  const cellHeight = 32; // можна залишити фіксованою по вертикалі

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

  useEffect(() => {
    if (candles.length >= config.targetCandles && candles.length > 0) {
      setCanstart(true);
    }
  }, [candles.length, config.targetCandles]);

  async function handleEmaGenerate() {
    try {
      if (!canStart || candles.length === 0) {
        setEma20(null);
        return;
      }

      setEma20(emaValues || null);
    } catch (error) {
      console.error("Error generating EMA:", error);
      setEma20(null);
    }
  }

  async function handleMacdGenerate() {
    try {
      if (!canStart || candles.length === 0) {
        setMacdData(null);
        return;
      }

      setMacdData(macdResult || null);
    } catch (error) {
      console.error("Error generating MACD:", error);
      setMacdData(null);
    }
  }

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
        handleEmaClick={handleEmaGenerate}
        hanldeMacdClick={handleMacdGenerate}
        config={config}
        setConfig={setConfig}
        scenarioLabel={scenarioLabel}
        remainingToCreate={remainingToCreate}
        canStart
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
              position: "relative",
              width: slotsWidth,
              margin: "0 auto",
              height: "100%",
            }}
          >
            {canStart && ema20 && (
              <EmaMetric
                width={slotsWidth}
                values={ema20}
                viewport={viewport}
                candleSlotWidth={candleSlotWidth}
              />
            )}

            {canStart && macdData && macdData.signalLine && (
              <MacdMetric
                width={slotsWidth}
                macdLine={macdData.macdLine}
                signalLine={macdData.signalLine}
                viewport={viewport}
                candleSlotWidth={candleSlotWidth}
              />
            )}

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
                  candles.length === 0 &&
                  index === 0 &&
                  !candle &&
                  !isSpawnSlot;

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

/* шо осталось зробить? 
в целом сам редактор і його система позиционирование працює добре, тепер треба сделать валотильность, тобто у кожного слота має бути паралельно 
свеча яка буде указувать на валотильность основной свечи. после цього треба создать індикатори ринка, починаем робить EMA а потом від нього\
уже робим Macd і колідори. якщо то всьо буде готово то осталось навчить фронт делать правильні реквести до сервера і желательно построїть 
не тільки мутации а й подписки для подальших сокетів
*/
