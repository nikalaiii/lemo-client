"use client";

import { MarketConfig } from "@/app/redactor/page";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface RightBarProps {
  config: MarketConfig;
  setConfig: (cfg: MarketConfig) => void;
  scenarioLabel: string;
  remainingToCreate: number;
  canStart: boolean;
  handleEmaClick: (period: number) => void;
  handleMacdClick: (ema1: number, ema2: number, signal: number) => void;
  handleRsiClick: (period: number) => void;
  handleGenerateCandlesClick: (count: number) => void;
  rsiAvailable?: boolean;
}

const TOP_BAR_HEIGHT = process.env.NEXT_PUBLIC_TOP_BAR_HEIGHT
  ? Number(process.env.NEXT_PUBLIC_TOP_BAR_HEIGHT)
  : 64;
const RIGHT_BAR_WIDTH = process.env.NEXT_PUBLIC_RIGHT_BAR_WIDTH
  ? Number(process.env.NEXT_PUBLIC_RIGHT_BAR_WIDTH)
  : 360;

const RightBar: React.FC<RightBarProps> = ({
  config,
  setConfig,
  scenarioLabel,
  remainingToCreate,
  canStart,
  handleEmaClick,
  handleMacdClick,
  handleRsiClick,
  handleGenerateCandlesClick,
  rsiAvailable = true,
}) => {
  const handleNumberChange = (key: keyof MarketConfig, value: string): void => {
    const num = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(num)) return;
    setConfig({ ...config, [key]: num });
  };
  const [generatedCandlesCount, setGeneratedCandlesCount] = useState<number>(5);
  const [emaPeriod, setEmaPeriod] = useState<number>(20);
  const [rsiPeriod, setRsiPeriod] = useState<number>(14);
  const [macdData, setMacdData] = useState<{
    ema1: number;
    ema2: number;
    signal: number;
  }>({ ema1: 12, ema2: 26, signal: 9 });

  return (
    <Box
      sx={{
        position: "fixed",
        top: TOP_BAR_HEIGHT,
        right: 0,
        bottom: 0,
        width: RIGHT_BAR_WIDTH,
        borderLeft: "1px solid #111827",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 3,
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: "#9ca3af" }}>
          Scenario
        </Typography>
        <Typography variant="h6">{scenarioLabel}</Typography>
        {remainingToCreate > 0 && (
          <Typography variant="body2" sx={{ color: "#9ca3af", mt: 0.5 }}>
            create {remainingToCreate} more candles
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: "#9ca3af" }}>
          Market configuration
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Set market information for the current scenario.
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Number of traders"
            type="number"
            size="small"
            value={config.traders}
            onChange={(e) => handleNumberChange("traders", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              label="Number of candles"
              type="number"
              size="small"
              value={config.targetCandles}
              onChange={(e) =>
                handleNumberChange("targetCandles", e.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Current balance"
              type="number"
              size="small"
              value={config.balance}
              onChange={(e) => handleNumberChange("balance", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              label="Generated candles"
              type="number"
              size="small"
              value={generatedCandlesCount}
              onChange={(e) => setGeneratedCandlesCount(Number(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleGenerateCandlesClick(generatedCandlesCount)}
              disabled={
                generatedCandlesCount <= 0 || generatedCandlesCount > 50
              }
            >
              Generate
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              border: "1px solid #d1d5db",
              p: 1,
            }}
          >
            <TextField
              label="EMA period"
              type="number"
              size="small"
              value={emaPeriod}
              onChange={(e) => setEmaPeriod(Number(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="outlined"
              color="info"
              fullWidth
              onClick={() => {
                handleEmaClick(emaPeriod);
              }}
              disabled={emaPeriod <= 0 || emaPeriod > 100 || !canStart}
            >
              Generate EMA
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              flexWrap: "wrap",
              border: "1px solid #d1d5db",
              p: 1,
            }}
          >
            <TextField
              sx={{ width: "30%" }}
              label="EMA1"
              type="number"
              size="small"
              value={macdData?.ema1 ?? 12}
              onChange={(e) =>
                setMacdData({ ...macdData, ema1: Number(e.target.value) })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ width: "30%" }}
              label="EMA2"
              type="number"
              size="small"
              value={macdData?.ema2 ?? 26}
              onChange={(e) =>
                setMacdData({ ...macdData, ema2: Number(e.target.value) })
              }
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ width: "30%" }}
              label="Signal"
              type="number"
              size="small"
              value={macdData?.signal ?? 9}
              onChange={(e) =>
                setMacdData({ ...macdData, signal: Number(e.target.value) })
              }
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="outlined"
              color="warning"
              fullWidth
              sx={{ minWidth: "100%" }}
              onClick={() => {
                handleMacdClick(
                  macdData?.ema1 ?? 12,
                  macdData?.ema2 ?? 26,
                  macdData?.signal ?? 9,
                );
              }}
            >
              Generate MACD
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              border: "1px solid #d1d5db",
              p: 1,
            }}
          >
            <TextField
              label="Signal"
              type="number"
              size="small"
              value={rsiPeriod}
              onChange={(e) =>
               setRsiPeriod(Number(e.target.value))
              }
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                handleRsiClick(rsiPeriod);
              }}
              disabled={
                !rsiAvailable || !canStart || rsiPeriod <= 0 || rsiPeriod > 50
              }
              title={
                rsiAvailable
                  ? undefined
                  : "need at least two candles to compute RSI"
              }
            >
              Generate RSI
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ mt: "auto" }}>
        {canStart ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                // placeholder for future start logic
                // eslint-disable-next-line no-console
                console.log("Start scenario", { config });
              }}
            >
              Start
            </Button>
        ) : (
          <Typography variant="body2" sx={{ color: "#6b7280" }}>
            Create the required number of candles to start.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RightBar;
