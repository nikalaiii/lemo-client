import { ChartViewport, priceToY } from "./candle";

interface MACDMetricProps {
    macdLine: number[];
    signalLine: number[];
    viewport: ChartViewport;
    candleSlotWidth: number;
    width: number;
}

const MacdMetric: React.FC<MACDMetricProps> = ({ macdLine, signalLine, viewport, candleSlotWidth, width }) => {
    const macdMoints = macdLine.map((value, index) => {
        const x = index * candleSlotWidth + candleSlotWidth / 2;
        const y = priceToY(
            value,
            viewport.minPrice,
            viewport.maxPrice,
            viewport.height,
        );
        return `${x},${y}`;
    })

    const signalPoints = signalLine.map((value, index) => {
        const x = index * candleSlotWidth + candleSlotWidth / 2;
        const y = priceToY(
            value,
            viewport.minPrice,
            viewport.maxPrice,
            viewport.height,
        );
        return `${x},${y}`;
    })
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
      <polyline fill="none" stroke="#3bf66d" strokeWidth={2} points={macdMoints.join(" ")} />
      <polyline fill="none" stroke="#ef4444" strokeWidth={2} points={signalPoints.join(" ")} />
    </svg>
    )
}

export default MacdMetric;