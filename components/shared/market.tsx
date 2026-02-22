'use client';

import { Box } from "@mui/material";
import React from "react";
import { Candledecoration } from "../home/journal/candle";
import { useSyntheticMarket } from "@/hooks/useRandomMarket";
import { CandleType } from "@/hooks/useBinanceMarket";
// import useBinanceKlines, { CandleType } from "@/hooks/useBinanceMarket";

const GAP = 4;
const BASE_CANDLE_WIDTH = 22;

const RealtimeBackground: React.FC = () => {
  const candles: CandleType[] = useSyntheticMarket({
    intervalMs: 400,      // нова свічка кожні ~0.4с
    historySize: 260,     // скільки тримаємо
    volatility: 0.015,    // збільш волатильність, щоб “літало”
    startPrice: 100,
    trendChangeProb: 0.1,
  });

  const [viewport, setViewport] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const update = () =>
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!candles.length || !viewport.width || !viewport.height) return null;

  const candleWidth = BASE_CANDLE_WIDTH;
  const maxVisible = Math.max(
    40,
    Math.floor(viewport.width / (candleWidth + GAP))
  );
  const visible = candles.slice(-maxVisible);

  const prices = visible.flatMap((c) => [c.high, c.low, c.open, c.close]);
  const max = Math.max(...prices);
  const min = Math.min(...prices);
  const range = max - min || 1;
  const norm = (price: number) => (max - price) / range;

  const candleHeight = viewport.height * 0.9;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundColor: "#000",
        opacity: 0.22, // можеш підкрутити
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: `${GAP}px`,
          px: 4,
        }}
      >
        {visible.map((c, index) => (
          <Candledecoration
          type="b/w"
            key={`candle-${visible.length}-${index}`}
            width={candleWidth}
            height={candleHeight}
            high={norm(c.high)}
            low={norm(c.low)}
            open={norm(c.open)}
            close={norm(c.close)}
            direction={c.close >= c.open ? "up" : "down"}
          />
        ))}
      </Box>
    </Box>
  );
};

export default RealtimeBackground;
