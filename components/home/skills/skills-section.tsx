"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import SkillsCard from "./skills.card";
import NavButton from "@/components/shared/navigation/nav-button";
import BarChartIcon from "@mui/icons-material/BarChart";
import SsidChartIcon from "@mui/icons-material/SsidChart";

const Skills = () => {
  return (
    <Container
      sx={{
        maxWidth: "1200px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 10,
        backgroundColor: "#000",
        zIndex: 5,
        position: "relative",
        mt: "10vh",
      }}
    >
      <Typography variant="h2" sx={{ ml: "auto", textAlign: "right" }}>
        Improve your skills, get Certification!
      </Typography>

      <SkillsCard
        type="certificate"
        bottom="10%"
        left="12%"
        rotate="3deg"
        z={3}
      />
      <SkillsCard type="test" bottom="10%" left="10%" rotate="-3deg" z={2} />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          maxWidth: "45%",
          mt: "auto",
          mb: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <BarChartIcon sx={{ width: "120px", height: "120px" }} />
          <DoneOutlineOutlinedIcon sx={{ width: "120px", height: "120px" }} />

          <SsidChartIcon sx={{ width: "120px", height: "120px" }} />
        </Box>

        <Typography variant="body1">
          --Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Repellendus, earum non? Quae quod at odit hic, optio corrupti
          temporibus fugit.
        </Typography>

        <Typography variant="body1">
          --Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Repellendus, earum non? Quae quod at odit hic, optio corrupti
          temporibus fugit.
        </Typography>

        <NavButton href="/learn" text="Start Learn" variant="contained" />
      </Box>
    </Container>
  );
};

export default Skills;
