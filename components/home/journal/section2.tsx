import { Box, Typography } from "@mui/material";
import { GeometricProgressionChart } from "./geometricProgress";
import PointMetric from "./pointMetric";

const points = [
  { title: "BTC/USD 1234", subtitle: "Open 42000 / Close 43000 / Profit +1000" },
  { title: "ETH/USD 5678", subtitle: "Open 3200 / Close 3100 / Profit -100" },
  { title: "XRP/USD 9012", subtitle: "Open 0.60 / Close 0.75 / Profit +0.15" },
  { title: "LTC/USD 3456", subtitle: "Open 150 / Close 145 / Profit -5" },
  { title: "ADA/USD 7890", subtitle: "Open 1.20 / Close 1.35 / Profit +0.15" }
]

const Section2 = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        position: "relative",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "32px", md: "48px" },
          mb: 4,
          alignSelf: "flex-start"
        }}
      >
        Take a Profit
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap"}}>
        <Typography
          sx={{ position: "absolute", zIndex: 2, left: "+10%", top: "+70%" }}
          variant="h5"
        >
          +30%
        </Typography>
        <Typography
          sx={{ position: "absolute", zIndex: 2, left: "+30%", top: "+60%" }}
          variant="h5"
        >
          +90%
        </Typography>
        <Typography
          sx={{ position: "absolute", zIndex: 2, left: "+50%", top: "+30%" }}
          variant="h5"
        >
          +150%
        </Typography>

        <GeometricProgressionChart />
        <PointMetric variant="icon" points={points}/>
      </Box>
    </Box>
  );
};

export default Section2;
