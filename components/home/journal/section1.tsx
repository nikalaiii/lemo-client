import { Box, Container, Typography } from "@mui/material";
import MarketSlicePreview from "./metric";
import PointMetric from "./pointMetric";

const points = [
  { title: "Trend Reversal", subtitle: "Market shifts opposite direction" },
  { title: "Kangaroo Tail", subtitle: "Sharp rejection candle pattern" },
  { title: "Breakout", subtitle: "Price escapes key support or resistance" },
  { title: "False Signal", subtitle: "Indicator misleads trader decision" },
  { title: "Consolidation", subtitle: "Price moves sideways, low volatility" }
]

const Section1 = () => {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "32px", md: "48px" },
            mb: 4,
          }}
        >
          Anazyle Your Decisions
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "nowrap",
          }}
        >
          <MarketSlicePreview />
          <PointMetric variant="circle" points={points}/>
        </Box>
      </Container>
    </Box>
  );
};

export default Section1;
