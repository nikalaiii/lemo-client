"use client";

import React from "react";

export interface Candle {
  open: number; // price
  high: number; // price
  low: number; // price
  close: number; // price
  timestamp: number;
}

export interface ChartViewport {
  minPrice: number;
  maxPrice: number;
  height: number; // px
}

export interface CandleRenderProps {
  candle: Candle;
  centerX: number;
  bodyWidth: number;
  viewport: ChartViewport;
  isEditing?: boolean;

  onChangeOpen?: (price: number) => void;
  onChangeClose?: (price: number) => void;
  onChangeHigh?: (price: number) => void;
  onChangeLow?: (price: number) => void;
}

const priceToY = (
  price: number,
  minPrice: number,
  maxPrice: number,
  chartHeight: number,
) => {
  const percent = (price - minPrice) / (maxPrice - minPrice || 1);
  return chartHeight - percent * chartHeight;
};

const yToPrice = (
  y: number,
  minPrice: number,
  maxPrice: number,
  chartHeight: number,
) => {
  const percent = 1 - y / (chartHeight || 1);
  return minPrice + percent * (maxPrice - minPrice);
};

export const Candle: React.FC<CandleRenderProps> = ({
  candle,
  centerX,
  bodyWidth,
  viewport,
  isEditing = false,
  onChangeOpen,
  onChangeClose,
  onChangeHigh,
  onChangeLow,
}) => {
  const { minPrice, maxPrice, height } = viewport;
  const openY = priceToY(candle.open, minPrice, maxPrice, height);
  const closeY = priceToY(candle.close, minPrice, maxPrice, height);
  const highY = priceToY(candle.high, minPrice, maxPrice, height);
  const lowY = priceToY(candle.low, minPrice, maxPrice, height);

  const bodyTop = Math.min(openY, closeY);
  const bodyBottom = Math.max(openY, closeY);
  const bodyHeight = Math.max(0, bodyBottom - bodyTop);
  const bodyX = centerX - bodyWidth / 2;

  const isBull = candle.close > candle.open;
  const color = isBull ? "#16a34a" : "#dc2626";
  const HANDLE_SIZE = 8;

  const startDrag = (
    e: React.MouseEvent,
    cb: ((price: number) => void) | undefined,
    key: "open" | "close" | "high" | "low",
  ) => {
    e.stopPropagation();
    if (!cb) return;

    const move = (ev: MouseEvent) => {
      const svg = (e.target as SVGElement).ownerSVGElement;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const newY = ev.clientY - rect.top;
      const price = yToPrice(newY, minPrice, maxPrice, height);
      cb(price);
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <svg width={bodyWidth * 2} height={height} viewBox={`0 0 ${bodyWidth * 2} ${height}`}>
      {/* Wick */}
      <line
        x1={centerX}
        y1={highY}
        x2={centerX}
        y2={lowY}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Body */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight || 1}
        fill={color}
        rx={1}
      />

      {isEditing && (
        <>
          {/* High handle */}
          <circle
            cx={centerX}
            cy={highY}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeHigh, "high")}
            style={{ cursor: "ns-resize" }}
          />

          {/* Low handle */}
          <circle
            cx={centerX}
            cy={lowY}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeLow, "low")}
            style={{ cursor: "ns-resize" }}
          />

          {/* Open handle */}
          <circle
            cx={centerX}
            cy={openY}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeOpen, "open")}
            style={{ cursor: "ns-resize" }}
          />

          {/* Close handle */}
          <circle
            cx={centerX}
            cy={closeY}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeClose, "close")}
            style={{ cursor: "ns-resize" }}
          />
        </>
      )}
    </svg>
  );
};

export { priceToY, yToPrice };
