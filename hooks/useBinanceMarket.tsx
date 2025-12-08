'use client';

import React from "react";

type KlineMessage = {
  k: {
    t: number; // open time
    o: string;
    c: string;
    h: string;
    l: string;
    x: boolean;
  };
};

export type CandleType = {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
};

const MAX_HISTORY = 300; // скільки свічок тримаємо в state

function useBinanceKlines(symbol = "btcusdt", interval = "1m") {
  const [candles, setCandles] = React.useState<CandleType[]>([]);

  React.useEffect(() => {
    let cancelled = false;
    let ws: WebSocket | null = null;

    const upperSymbol = symbol.toUpperCase();

    async function init() {
      // 1) тягнемо історію через REST
      try {
        const res = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${upperSymbol}&interval=${interval}&limit=${MAX_HISTORY}`
        );
        const data: any[] = await res.json();

        if (!cancelled && Array.isArray(data)) {
          const history: CandleType[] = data.map((row) => {
            const [openTime, open, high, low, close] = row;
            return {
              time: openTime,
              open: parseFloat(open),
              high: parseFloat(high),
              low: parseFloat(low),
              close: parseFloat(close),
            };
          });

          setCandles(history);
        }
      } catch (e) {
        console.error("Failed to load Binance history", e);
      }

      // 2) підключаємось до WebSocket для лайву
      ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${upperSymbol.toLowerCase()}@kline_${interval}`
      );

      ws.onopen = () => {
        console.log("Binance WS connected");
      };

      ws.onerror = (e) => {
        console.error("Binance WS error", e);
      };

      ws.onmessage = (event) => {
        const data: KlineMessage = JSON.parse(event.data);
        const k = data.k;

        const candle: CandleType = {
          time: k.t,
          open: parseFloat(k.o),
          close: parseFloat(k.c),
          high: parseFloat(k.h),
          low: parseFloat(k.l),
        };

        setCandles((prev) => {
          const withoutSameTime = prev.filter((c) => c.time !== candle.time);
          const next = [...withoutSameTime, candle].sort(
            (a, b) => a.time - b.time
          );
          return next.slice(-MAX_HISTORY);
        });
      };
    }

    init();

    return () => {
      cancelled = true;
      if (ws) ws.close();
    };
  }, [symbol, interval]);

  return candles;
}

export default useBinanceKlines;