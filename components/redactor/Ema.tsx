'use client';

import { ChartViewport, priceToY } from "./candle";

interface EmaMetricProps {
  values: number[];
  viewport: ChartViewport;
  candleSlotWidth: number;
  width: number;
}

const EmaMetric: React.FC<EmaMetricProps> = ({
  values,
  viewport,
  candleSlotWidth,
  width
}) => {
  if (!viewport || values.length === 0) return null;

  const points = values
    .map((price, index) => {
      const x = index * candleSlotWidth + candleSlotWidth / 2;
      const y = priceToY(
        price,
        viewport.minPrice,
        viewport.maxPrice,
        viewport.height,
      );
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={viewport.height}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      <polyline fill="none" stroke="#3b82f6" strokeWidth={2} points={points} />
    </svg>
  );
};

export default EmaMetric;