"use client";

import React from "react";

/** Y increases downward. open/close are body ends; wickTop/wickBottom are wick ends. */
export type CandleDirection = "up" | "down";

type CandleCallback = (
  y: number,
  key: "open" | "close" | "wickTop" | "wickBottom",
) => void;

export interface CandleProps {
  width: number;
  height: number;
  centerX: number;

  /** Body: Y of opening price (one end of body). */
  open: number;
  /** Body: Y of closing price (other end of body). */
  close: number;
  /** Upper wick end (top of candle). */
  wickTop: number;
  /** Lower wick end (bottom of candle). */
  wickBottom: number;

  bodyWidth: number;
  isEditing: boolean;
  type?: "b/w" | "g/r";

  onChangeOpen?: CandleCallback;
  onChangeClose?: CandleCallback;
  onChangeWickTop?: CandleCallback;
  onChangeWickBottom?: CandleCallback;
}

/** Derive body bounds and direction from open/close. */
function useCandleGeometry(open: number, close: number) {
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.max(0, bodyBottom - bodyTop);
  const direction: CandleDirection = close < open ? "up" : "down";
  return { bodyTop, bodyBottom, bodyHeight, direction };
}

export const Candle: React.FC<CandleProps> = ({
  width,
  height,
  centerX,
  open,
  close,
  wickTop,
  wickBottom,
  bodyWidth,
  isEditing = false,
  onChangeOpen,
  onChangeClose,
  onChangeWickTop,
  onChangeWickBottom,
}) => {
  const { bodyTop, bodyBottom, bodyHeight, direction } = useCandleGeometry(
    open,
    close,
  );
  const bodyX = centerX - bodyWidth / 2;
  const isBull = direction === "up";
  const color = isBull ? "#16a34a" : "#dc2626";
  const HANDLE_SIZE = 8;

  const startDrag = (
    e: React.MouseEvent,
    callback: CandleCallback | undefined,
    key: "open" | "close" | "wickTop" | "wickBottom",
  ) => {
    e.stopPropagation();
    if (!callback) return;

    const move = (ev: MouseEvent) => {
      const svg = (e.target as SVGElement).ownerSVGElement;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const newY = ev.clientY - rect.top;
      callback(newY, key);
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Wick: from wickTop to wickBottom */}
      <line
        x1={centerX}
        y1={wickTop}
        x2={centerX}
        y2={wickBottom}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Body: from bodyTop to bodyBottom */}
      <rect
        x={bodyX}
        y={bodyTop}
        width={bodyWidth}
        height={bodyHeight}
        fill={color}
        rx={1}
      />

      {isEditing && (
        <>
          <circle
            cx={centerX}
            cy={wickTop}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeWickTop, "wickTop")}
            style={{ cursor: "ns-resize" }}
          />
          <circle
            cx={centerX}
            cy={wickBottom}
            r={HANDLE_SIZE}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeWickBottom, "wickBottom")}
            style={{ cursor: "ns-resize" }}
          />
          {/* Body open handle (one end of body) */}
          <rect
            x={centerX - HANDLE_SIZE}
            y={open - HANDLE_SIZE}
            width={bodyWidth}
            height={HANDLE_SIZE * 2}
            fill="#fff"
            stroke="#000"
            onMouseDown={(e) => startDrag(e, onChangeOpen, "open")}
            style={{ cursor: "ns-resize" }}
          />
          <rect
            x={centerX - HANDLE_SIZE}
            y={close - HANDLE_SIZE}
            width={bodyWidth}
            height={HANDLE_SIZE * 2}
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
