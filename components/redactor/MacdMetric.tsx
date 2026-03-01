import React from "react";

interface MACDMetricProps {
  macdLine: number[];
  signalLine: number[];
  candleSlotWidth: number;
  height?: number;
  bottomOffset?: number;
  onResizeStart?: (e: React.MouseEvent) => void;
}

const MacdMetric: React.FC<MACDMetricProps> = ({
  macdLine,
  signalLine,
  candleSlotWidth,
  height = 200,
  bottomOffset = 0,
  onResizeStart,
}) => {
  if (!macdLine || macdLine.length === 0) return null;

  const all = [...macdLine, ...(signalLine || [])];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;

  const priceToY = (value: number) => {
    const percent = (value - min) / range;
    return height - percent * height;
  };

  const points = macdLine
    .map((v, i) => `${i * candleSlotWidth + candleSlotWidth / 2},${priceToY(v)}`)
    .join(" ");

  const signalPoints = (signalLine || [])
    .map((v, i) => `${i * candleSlotWidth + candleSlotWidth / 2},${priceToY(v)}`)
    .join(" ");

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: "360px",
        bottom: bottomOffset,
        height,
        background: "#0b0b0b",
        borderTop: "1px solid #333",
        zIndex: 9,
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

      <svg width="100%" height={height} style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
        <polyline fill="none" stroke="#3bf66d" strokeWidth={2} points={points} />
        <polyline fill="none" stroke="#ef4444" strokeWidth={2} points={signalPoints} />
      </svg>
    </div>
  );
};

export default MacdMetric;
