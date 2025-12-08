'use client';

import * as React from "react";

export type CandleType = {
  time: number;
  open: number;
  close: number;
  high: number;
  low: number;
};

type Options = {
  intervalMs?: number;      // як часто з’являється нова свічка
  historySize?: number;     // скільки свічок тримаємо
  startPrice?: number;      // стартова ціна
  volatility?: number;      // базова волатильність
  trendChangeProb?: number; // ймовірність зміни тренду
};

function createNextCandle(
  prev: CandleType,
  trend: number,
  opts: Required<Omit<Options, "historySize">>
): CandleType {
  const { volatility, startPrice } = opts;

  const base = prev?.close ?? startPrice;
  const noise = (Math.random() - 0.5) * volatility * 2; // випадковий шум
  const drift = trend * volatility * 0.4;               // невеликий тренд

  let close = base * (1 + noise + drift);

  // інколи робимо "спайки" для драматизму
  if (Math.random() < 0.05) {
    const spike = (Math.random() - 0.5) * volatility * 10;
    close = base * (1 + spike);
  }

  const open = base;
  const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
  const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);

  return {
    time: Date.now(),
    open,
    close,
    high,
    low,
  };
}

function createInitialHistory(
  count: number,
  opts: Required<Options>
): CandleType[] {
  const first: CandleType = {
    time: Date.now() - count * opts.intervalMs,
    open: opts.startPrice,
    close: opts.startPrice,
    high: opts.startPrice,
    low: opts.startPrice,
  };

  let trend = Math.random() > 0.5 ? 1 : -1;
  const result: CandleType[] = [first];

  for (let i = 1; i < count; i++) {
    if (Math.random() < opts.trendChangeProb) {
      trend *= -1;
    }
    const next = createNextCandle(result[result.length - 1], trend, opts);
    result.push(next);
  }

  return result;
}

export function useSyntheticMarket(options: Options = {}): CandleType[] {
  const {
    intervalMs = 500,       // 🔥 нова свічка кожні 0.5с (можеш 200–1000 мс)
    historySize = 240,
    startPrice = 100,
    volatility = 0.01,      // 1% базової волатильності
    trendChangeProb = 0.08,
  } = options;

  const opts = React.useMemo(
    () => ({
      intervalMs,
      historySize,
      startPrice,
      volatility,
      trendChangeProb,
    }),
    [intervalMs, historySize, startPrice, volatility, trendChangeProb]
  );

  const trendRef = React.useRef(Math.random() > 0.5 ? 1 : -1);

  const [candles, setCandles] = React.useState<CandleType[]>(() =>
    createInitialHistory(historySize, opts)
  );

  React.useEffect(() => {
    // якщо залежності зміняться (інша волатильність/історія) — перебудуємо серію
    setCandles(createInitialHistory(historySize, opts));
  }, [opts, historySize]);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCandles((prev) => {
        const last = prev[prev.length - 1];

        // інколи міняємо тренд
        if (Math.random() < trendChangeProb) {
          trendRef.current *= -1;
        }

        const next = createNextCandle(last, trendRef.current, opts);
        const merged = [...prev, next];
        return merged.slice(-historySize);
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [opts, trendChangeProb, intervalMs, historySize]);

  return candles;
}
