import { Box, Grid, Typography } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import Image from "next/image";
import React from "react";
import { motion, scale } from "motion/react";

function LineDecoration() {
  return (
    <span
      style={{
        minHeight: "2px",
        minWidth: "100%",
        backgroundColor: "#fff",
      }}
    />
  );
}

interface Props {
  type: "certificate" | "test";
  bottom: string;
  left: string;
  rotate: string;
  z: number;
}

const MotionGrid = motion(Grid);

const SkillsCard: React.FC<Props> = ({ type, bottom, left, rotate, z }) => {
  return (
    <MotionGrid
      container
      spacing={1}
      sx={{
        minWidth: "40%",
        maxWidth: "40%",
        height: "70vh",
        border: "1px solid #fff",
        borderRadius: "10px",
        zIndex: z,
        p: "3rem",
        position: "absolute",
        bottom: bottom,
        left: left,
        transform: `rotate(${rotate})`,
        backgroundColor: "#141414",
      }}
      initial={{ opacity: 0, rotate: "10deg", y: 20 }}
      whileInView={{ opacity: 1, rotate: rotate, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale: 1.03,
        rotate: type === "certificate" ? "10deg" : "0",
      }}
    >
      <Grid size={12}>
        <Typography variant="h5">
          {type === "certificate"
            ? "LLU Certification"
            : "Certification Document #1"}
          <StackedLineChartIcon />
        </Typography>
      </Grid>

      <Grid size={{ xs: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <LineDecoration key={index} />
          ))}
        </Box>
      </Grid>

      <Grid
        size={{ xs: 8 }}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <Image src={"/logo.jpg"} alt="lemo.inc" width={64} height={64} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          atque praesentium laudantium. Commodi quis unde natus aliquid, veniam
          recusandae ad consectetur earum deserunt. Ducimus enim, similique quae
          harum praesentium veniam culpa a aspernatur! Ratione laborum veritatis
          asperiores molestias et architecto.
        </Typography>
      </Grid>

      <Grid size={{ xs: 3 }} sx={{ textAlign: "center" }}>
        <Typography variant="subtitle2">Lemo Learn Unit</Typography>
      </Grid>

      <Grid size={{ xs: 9 }} sx={{ textAlign: "right" }}>
        <WorkspacePremiumIcon sx={{ height: "10vh", width: "10vh" }} />
      </Grid>
    </MotionGrid>
  );
};

export default SkillsCard;
