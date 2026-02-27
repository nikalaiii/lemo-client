import { Candle } from "@/components/redactor/candle";
import { calculateEMA } from "./useEMA";

interface MACDArgs {
  candles: Candle[];
  period1: number;
  period2: number;
  periodSignal: number;
}

export interface MACDResult {
  macdLine: number[];
  signalLine: number[] | undefined;
}

/**
 * Pure helper that calculates MACD lines from candles. It does **not** call
 * any React hooks so it may be used inside other hooks safely or memoised
 * by callers.
 */
export function calculateMACD(
  args: MACDArgs,
): MACDResult | undefined {
  const { candles, period1, period2, periodSignal } = args;
  if (candles.length === 0) return;

  const ema1 = calculateEMA(candles, period1);
  const ema2 = calculateEMA(candles, period2);

  if (!ema1 || !ema2) {
    console.error("EMA calculation failed");
    return;
  }

  const macdLine = ema1.map((value, index) => value - (ema2[index] || 0));
  const signalLine = calculateEMA(
    macdLine.map((value) => ({ close: value } as Candle)),
    periodSignal,
  );

  return {
    macdLine,
    signalLine,
  };
}

export default calculateMACD;