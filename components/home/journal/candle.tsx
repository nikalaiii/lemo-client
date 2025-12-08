import React from "react";

export type CandleDirection = "up" | "down";

export interface CandleProps {
  width?: number;           // ширина SVG у px
  height?: number;          // висота SVG у px
  high: number;             // 0..1 (0 = верх, 1 = низ) — максимум
  low: number;              // 0..1 — мінімум
  open: number;             // 0..1 — ціна відкриття
  close: number;            // 0..1 — ціна закриття
  direction: CandleDirection;
}

export const Candle: React.FC<CandleProps> = ({
  width = 24,
  height = 64,
  high,
  low,
  open,
  close,
  direction,
}) => {
  const color = direction === "up" ? "#16a34a" : "#dc2626"; // зелена / червона
  

  // Перетворення нормалізованих значень у px
  const h = height;
  const pxHigh = high * h;
  const pxLow = low * h;
  const pxOpen = open * h;
  const pxClose = close * h;

  const bodyTop = Math.min(pxOpen, pxClose);
  const bodyBottom = Math.max(pxOpen, pxClose);
  const bodyHeight = bodyBottom - bodyTop;

  const centerX = width / 2;
  const bodyWidth = width * 0.5;
  const bodyX = centerX - bodyWidth / 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* хвіст */}
      <line
        x1={centerX}
        y1={pxHigh}
        x2={centerX}
        y2={pxLow}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* тіло */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight || 2} // якщо open === close, хоч маленька тілашка
        fill={color}
        rx={2}
      />
    </svg>
  );
};
