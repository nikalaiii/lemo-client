import React from "react";

export type CandleDirection = "up" | "down";

export interface CandleProps {
  width?: number;
  height?: number;
  high: number;
  low: number;
  open: number;
  close: number;
  direction: CandleDirection;
  type: "b/w" | "g/r";
}

export const Candle: React.FC<CandleProps> = ({
  width = 24,
  height = 64,
  high,
  low,
  open,
  close,
  direction,
  type = "g/r",
}) => {
  const h = height;

  const pxHigh = high * h;
  const pxLow = low * h;
  const pxOpen = open * h;
  const pxClose = close * h;

  const bodyTop = Math.min(pxOpen, pxClose);
  const bodyBottom = Math.max(pxOpen, pxClose);
  const bodyHeight = bodyBottom - bodyTop || 2;

  const centerX = width / 2;
  const bodyWidth = width * 0.6;
  const bodyX = centerX - bodyWidth / 2;

  // ===================
  // 🎨 DEFINE COLORS
  // ===================
  const isBull = direction === "up";

  let wickColor = "";
  let fillColor = "";
  let strokeColor = "none";

  if (type === "g/r") {
    wickColor = isBull ? "#16a34a" : "#dc2626";
    fillColor = wickColor;
  }

  if (type === "b/w") {
    wickColor = "white";
    fillColor = isBull ? "white" : "black";

    if (!isBull) {
      strokeColor = "white"; // робимо рамку тільки для bearish
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wick */}
      <line
        x1={centerX}
        y1={pxHigh}
        x2={centerX}
        y2={pxLow}
        stroke={wickColor}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Body */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeColor !== "none" ? 2 : 0}
        rx={1}
      />
    </svg>
  );
};
