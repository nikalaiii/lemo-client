"use client";
import { Candle, ChartViewport, yToPrice } from "@/components/redactor/candle";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import RsiMetric from "@/components/redactor/RsiMetric";
import { calculateEMA } from "./features/calculateEMA";
import EmaMetric from "@/components/redactor/EmaMetric";
import RightBar from "@/components/redactor/RightBar";
import calculateMACD, { MACDResult } from "./features/calculateMACD";
import calculateRSI from "./features/calculateRSI";
import CandleSlot from "@/components/redactor/CandleSlot";
import MacdMetric from "@/components/redactor/MacdMetric";
import generateCandles from "./features/generateCandles";

export type CandleWithMeta = Candle & { id: number; isEditing: boolean };

const candleSlotWidth = 40;

const TOP_BAR_HEIGHT = 64;
const RIGHT_BAR_WIDTH = 360;

type EditKey = "open" | "close" | "high" | "low";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

// Helper that attaches global mousemove/mouseup and forwards clientY
function ResizeWatcher({
  onMove,
  onEnd,
}: {
  onMove: (clientY: number) => void;
  onEnd: () => void;
}) {
  useEffect(() => {
    const move = (e: MouseEvent) => onMove(e.clientY);
    const up = () => onEnd();
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [onMove, onEnd]);

  return null;
}

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
  const [rsi14, setRsi14] = useState<number[] | null>(null);

  const [config, setConfig] = useState<MarketConfig>({
    traders: 10,
    targetCandles: 5,
    balance: 10_000,
  });
  const [panOffset, setPanOffset] = useState<number>(0);
  const [panOffsetY, setPanOffsetY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartY, setDragStartY] = useState<number>(0);

  const rsiValues = useMemo(() => {
    if (candles.length < 2) return null; 
    return calculateRSI(candles, 14);
  }, [candles]);

  const slotsCount = useMemo(
    () => Math.max(1, candles.length + 1),
    [candles.length],
  );

  const slotsWidth = slotsCount * candleSlotWidth + (slotsCount - 1) * 8;

  const cellWidth = candleSlotWidth; 
  const cellHeight = 32; 

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

  async function handleEmaGenerate(period: number = 20) {
    try {
      if (!canStart || candles.length === 0) {
        setEma20(null);
        return;
      }

      setEma20(calculateEMA(candles, period) || null);
    } catch (error) {
      console.error("Error generating EMA:", error);
      setEma20(null);
    }
  }

  async function handleMacdGenerate(ema1: number = 12, ema2: number = 26, signal: number = 9) {
    try {
      if (!canStart || candles.length === 0) {
        setMacdData(null);
        return;
      }

      setMacdData(calculateMACD({
        candles,
        period1: ema1,
        period2: ema2,
        periodSignal: signal,
      }) || null);
    } catch (error) {
      console.error("Error generating MACD:", error);
      setMacdData(null);
    }
  }

  useEffect(() => {
    console.log("rsi14:", rsi14);
    console.log("rsiValues:", rsiValues);
    console.log("isArray:", Array.isArray(rsiValues));
  }, [rsi14, rsiValues]);

  async function handleRsiGenerate(period: number = 14) {
    try {
      if (!canStart || candles.length === 0) {
        setRsi14(null);
        console.warn("Not enough candles to calculate RSI");
        return;
      }

      if (!rsiValues || rsiValues.length === 0) {
        console.warn(
          `RSI calculation produced no data (need at least ${14 + 1} candles). ` +
            "Add more candles or adjust the period.",
        );
        setRsi14(null);
        return;
      }

      setRsi14(calculateRSI(candles, period));
    } catch (error) {
      console.error("Error generating RSI:", error);
      setRsi14(null);
    }
  }

  async function handleCandlesGenerate(candlesCount: number) {
    const newCandles = generateCandles(candlesCount, candles[candles.length - 1]?.close);
    setCandles(prev => [...prev, ...newCandles]);
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
        const prevuisClose = candles[index - 1]?.close ?? priceAtClick;
        setSpawningCandle({
          id: Date.now(),
          open: prevuisClose,
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
  const MACD_MIN = 80;
  const MACD_MAX = 600;
  const RSI_MIN = 80;
  const RSI_MAX = 600;

  const [macdHeight, setMacdHeight] = useState<number>(200);
  const [rsiHeight, setRsiHeight] = useState<number>(200);
  const [resizingPanel, setResizingPanel] = useState<null | "macd" | "rsi">(
    null,
  );
  const [resizeStartY, setResizeStartY] = useState<number>(0);
  const [resizeStartHeight, setResizeStartHeight] = useState<number>(0);

  const handleChartMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only pan if not clicking on a candle slot to edit
    if ((e.target as HTMLElement).classList.contains("candleSlot")) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleChartMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    const deltaY = e.clientY - dragStartY;
    setPanOffset((prev) => prev + deltaX);
    setPanOffsetY((prev) => prev + deltaY);
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  };

  const handleChartMouseUp = () => {
    setIsDragging(false);
  };

  const handleChartWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomAmount = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * zoomAmount, 0.5), 3);
    setScale(newScale);
  };

  //#region MARCUP  

  return (
    <Box sx={{ height: "100vh", width: "100vw", background: "#000" }}>
      <RightBar
        handleEmaClick={handleEmaGenerate}
        handleMacdClick={handleMacdGenerate}
        handleRsiClick={handleRsiGenerate}
        handleGenerateCandlesClick={handleCandlesGenerate}
        config={config}
        setConfig={setConfig}
        scenarioLabel={scenarioLabel}
        remainingToCreate={remainingToCreate}
        canStart={canStart} // previously always true; now reflect actual state
        rsiAvailable={candles.length >= 2}
      />
      {canStart && macdData && macdData.signalLine && (
        <MacdMetric
          macdLine={macdData.macdLine}
          signalLine={macdData.signalLine}
          candleSlotWidth={candleSlotWidth}
          height={macdHeight}
          bottomOffset={rsi14 && rsi14.length ? rsiHeight : 0}
          onResizeStart={(e: React.MouseEvent) => {
            e.preventDefault();
            setResizingPanel("macd");
            setResizeStartY(e.clientY);
            setResizeStartHeight(macdHeight);
          }}
        />
      )}

      {canStart && rsi14 && (
        <RsiMetric
          width={slotsWidth}
          values={rsi14}
          candleSlotWidth={candleSlotWidth}
          height={rsiHeight}
          onResizeStart={(e: React.MouseEvent) => {
            e.preventDefault();
            setResizingPanel("rsi");
            setResizeStartY(e.clientY);
            setResizeStartHeight(rsiHeight);
          }}
        />
      )}

      {/* global mouse handlers for resizing */}
      {resizingPanel && (
        <ResizeWatcher
          onMove={(clientY: number) => {
            const delta = resizeStartY - clientY; // dragging up increases height
            if (resizingPanel === "macd") {
              const next = Math.min(
                Math.max(resizeStartHeight + delta, MACD_MIN),
                MACD_MAX,
              );
              setMacdHeight(next);
            } else {
              const next = Math.min(
                Math.max(resizeStartHeight + delta, RSI_MIN),
                RSI_MAX,
              );
              setRsiHeight(next);
            }
          }}
          onEnd={() => setResizingPanel(null)}
        />
      )}

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
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleChartMouseDown}
        onMouseMove={handleChartMouseMove}
        onMouseUp={handleChartMouseUp}
        onMouseLeave={handleChartMouseUp}
        onWheel={handleChartWheel}
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
               minHeight: "100vh",
              width: slotsWidth + 200,
              margin: "0 auto",
              height: "100%",
              transform: `translate(${panOffset}px, ${panOffsetY}px) scale(${scale})`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.1s ease-out",
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
                            textWrap: "nowrap",
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

/* шо осталось зробить? 
в целом сам редактор і його система позиционирование працює добре, тепер треба сделать валотильность, тобто у кожного слота має бути паралельно 
свеча яка буде указувать на валотильность основной свечи. после цього треба создать індикатори ринка, починаем робить EMA а потом від нього\
уже робим Macd і колідори. якщо то всьо буде готово то осталось навчить фронт делать правильні реквести до сервера і желательно построїть 
не тільки мутации а й подписки для подальших сокетів
*/
