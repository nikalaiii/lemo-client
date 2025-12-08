import { TypingText } from "@/components/shared/TypeTextEffect";
import { Box, Typography } from "@mui/material";

const LemoCircle = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <svg width="220" height="220" viewBox="0 0 200 200">
        <g id="lemoGroup">
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="white"
            stroke-width="6"
            fill="none"
          />

          <circle cx="100" cy="20" r="8" fill="white">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="-360 100 100"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          <circle cx="100" cy="20" r="8" fill="white">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 100 100"
              to="360 100 100"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>

          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 100 100; 6 100 100; 0 100 100; -6 100 100; 0 100 100"
            keyTimes="0;0.25;0.5;0.75;1"
            dur="6s"
            repeatCount="indefinite"
          />
        </g>
      </svg>

      <Typography
          variant="h1"
          sx={{ fontWeight: "800", fontSize: "50px", whiteSpace: "nowrap" }}
        >
          Check | Trade | Check
        </Typography>
    </Box>
  );
};

export default LemoCircle;
