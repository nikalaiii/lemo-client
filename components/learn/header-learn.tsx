"use client";

import { Box, Container, Typography } from "@mui/material";
import NavButton from "../shared/navigation/nav-button";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarsIcon from "@mui/icons-material/Stars";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

const HeaderLearn = () => {
  return (
    <Container
      sx={{
        width: "100%",
        p: 0,
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
        backgroundColor: "#000",
      }}
    >
      <Typography sx={{ justifySelf: "flex-start" }} variant="h1">
        Improve Your Market Knowledge
      </Typography>
      <Typography variant="h6">
        Watch video lessons, complete tests, get Certificate!
      </Typography>
      <div>
        <EmojiEventsIcon
          sx={{
            position: "absolute",
            top: "10%",
            right: "+30%",
            transform: "rotate(10deg)",
            width: "100px",
            height: "100px",
          }}
        />
        <StarsIcon
          sx={{
            position: "absolute",
            top: "10%",
            left: "+30%",
            transform: "rotate(-10deg)",
            width: "100px",
            height: "100px",
          }}
        />
        <DoneOutlineIcon
          sx={{
            position: "absolute",
            top: "+10%",
            left: "50%",
            transform: "translateX(-50%)",
            right: "+30%",
            width: "100px",
            height: "100px",
          }}
        />
      </div>
      <Box
        sx={{ width: "80%", display: "flex", justifyContent: "space-around" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            width: "33%",
          }}
        >
          <PlayLessonIcon sx={{ width: "64px", height: "64px" }} />
          <NavButton
            variant="contained"
            href="/lern#courses"
            text="Start Course"
          />
        </Box>
        <div
          style={{
            minHeight: "100%",
            minWidth: "2px",
            backgroundColor: "#fff",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            width: "33%",
          }}
        >
          <CreateIcon sx={{ width: "64px", height: "64px" }} />
          <NavButton
            variant="outlined"
            href="/lern/tests/create"
            text="Create Test"
          />
        </Box>
        <div
          style={{
            minHeight: "100%",
            minWidth: "2px",
            backgroundColor: "#fff",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            width: "33%",
          }}
        >
          <AssignmentIcon sx={{ width: "64px", height: "64px" }} />
          <NavButton
            variant="contained"
            href="/lern/tests"
            text="Start Tests"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default HeaderLearn;
