import { CandleWithMeta } from "../page";

export default function generateCandles(
  count: number,
  lastClose: number | null = null,
): CandleWithMeta[] {
  const candles: CandleWithMeta[] = [];

  for (let i = 0; i < count; i++) {
    const open =
      i === 0
        ? lastClose
          ? lastClose
          : Math.random() * 100
        : candles[i - 1].close;

    const close = open + (Math.random() - 0.5) * 100;

    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);

    const wickHighExtension = Math.random() * 20;
    const wickLowExtension = Math.random() * 20;

    const high = bodyHigh + wickHighExtension;
    const low = bodyLow - wickLowExtension;

    candles.push({
      id: Date.now() + i,
      open,
      high,
      low,
      close,
      timestamp: Date.now(),
      isEditing: false,
    });
  }
  return candles;
}
