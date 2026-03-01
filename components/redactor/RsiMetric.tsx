import React from "react";
import { Box } from "@mui/material";

interface RsiMetricProps {
  values: number[];
  candleSlotWidth: number;
  width: number;
  height?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
}

const RsiMetric = ({
  values,
  candleSlotWidth,
  width,
  height = 200,
  onResizeStart,
}: RsiMetricProps) => {
  if (!values || values.length === 0) return null;

  const min = 0;
  const max = 100;

  const priceToY = (value: number) => {
    const range = max - min || 1;
    return height - ((value - min) / range) * height;
  };

  const points = values
    .map((rsi, index) => {
      const x = index * candleSlotWidth + candleSlotWidth / 2;
      const y = priceToY(rsi);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: "360px",
        bottom: 0,
        height,
        background: "#111",
        borderTop: "1px solid #333",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <div
        onMouseDown={onResizeStart}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          cursor: "row-resize",
          zIndex: 12,
        }}
      />

      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <line
          x1={0}
          x2={width}
          y1={priceToY(70)}
          y2={priceToY(70)}
          stroke="#444"
          strokeDasharray="4 4"
        />

        <line
          x1={0}
          x2={width}
          y1={priceToY(30)}
          y2={priceToY(30)}
          stroke="#444"
          strokeDasharray="4 4"
        />

        <polyline fill="none" stroke="#3b82f6" strokeWidth={2} points={points} />
      </svg>
    </Box>
  );
};

export default RsiMetric;
