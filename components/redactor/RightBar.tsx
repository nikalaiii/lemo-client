import { MarketConfig } from "@/app/redactor/page";
import { Box, Button, TextField, Typography } from "@mui/material";

interface RightBarProps {
  config: MarketConfig;
  setConfig: (cfg: MarketConfig) => void;
  scenarioLabel: string;
  remainingToCreate: number;
  canStart: boolean;
  handleEmaClick: () => void;
  hanldeMacdClick: () => void;
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
  hanldeMacdClick,
}) => {
  const handleNumberChange = (key: keyof MarketConfig, value: string): void => {
    const num = Number(value.replace(/[^\d.-]/g, ""));
    if (Number.isNaN(num)) return;
    setConfig({ ...config, [key]: num });
  };

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
      </Box>

      <Box sx={{ mt: "auto" }}>
        {canStart ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => {
                handleEmaClick();
              }}
            >
              Generate EMA
            </Button>

            <Button
              variant="contained"
              color="warning"
              fullWidth
              onClick={() => {
                hanldeMacdClick();
              }}
            >
              Generate MACD
            </Button>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => {
                // placeholder for future start logic
                // eslint-disable-next-line no-console
                console.log("Start scenario", { config });
              }}
            >
              Start
            </Button>
          </Box>
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
