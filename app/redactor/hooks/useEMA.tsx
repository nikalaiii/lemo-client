import { Candle } from "@/components/redactor/candle";

/**
 * Simple non‑hook helper that computes an exponential moving average array
 * from a list of candles. Returning `undefined` when the input array is empty
 * matches the previous behaviour of the hook.
 */
export function calculateEMA(
  candles: Candle[],
  period: number,
): number[] | undefined {
  if (candles.length === 0) return;

  const closes = candles.map((c) => c.close);
  const k = 2 / (period + 1);

  const ema: number[] = [];
  ema[0] = closes[0];

  for (let i = 1; i < closes.length; i++) {
    ema[i] = closes[i] * k + ema[i - 1] * (1 - k);
  }

  return ema;
}
