const CandleSlot = ({
  width,
  children,
  handleClick,
  isSpawning = false,
}: {
  width: number;
  children: React.ReactNode | null;
  handleClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  isSpawning?: boolean;
}) => (
  <div
    className="candleSlot"
    onClick={handleClick}
    style={{
      minWidth: width,
      height: "100%",
      position: "relative",
      backgroundColor: isSpawning ? "rgba(169, 169, 169, 0.18)" : "inherit",
    }}
  >
    {children}
  </div>
);

export default CandleSlot;