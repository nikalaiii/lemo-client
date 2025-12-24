"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Market Basics" {...a11yProps(0)} />
          <Tab label="Crypto Analyze" {...a11yProps(1)} />
          <Tab label="Traiding Strategy" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/WmbaTcXon7A?si=BLUFb1eYg_TgmFZd"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/XIv_EW_hZ1o?si=tqE0-ahGPAdFB6nK"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/MvO0oJcqBmA?si=7T_USYtmOBqcrjeh"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </CustomTabPanel>
    </Box>
  );
};

const Courses = () => {
  return (
    <Container
      sx={{
        minWidth: "100%",
        minHeight: "10vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
      }}
    >
      <Typography variant="h2">
        Watch any lessons{" "}
        <span style={{ color: "rgba(46, 204, 113, 0.75)" }}>FOR</span>{" "}
        <span style={{ color: "rgba(192, 57, 43, 0.8)" }}>FREE</span>
      </Typography>
      <BasicTabs />
    </Container>
  );
};

export default Courses;
