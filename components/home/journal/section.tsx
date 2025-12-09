"use client";

import { useEffect, useState } from "react";
import {  Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";


import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Section1 from "./section1";
import Section2 from "./section2";

type SlideId = 1 | 2;
type Direction = 1 | -1; // 1 = вперед (праворуч), -1 = назад (ліворуч)

const slideVariants = {
  enter: (direction: Direction) => ({
    x: direction === 1 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: Direction) => ({
    x: direction === 1 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function Journal() {
  const [currentSection, setCurrentSection] = useState<SlideId>(1);
  const [direction, setDirection] = useState<Direction>(1);
  const [stop, setStop] = useState<boolean>(false);

  function changeMetric() {
  setCurrentSection((prevSection) => {
    const next: SlideId = prevSection === 1 ? 2 : 1;
    setDirection(prevSection === 1 ? 1 : -1);
    return next;
  });
}

useEffect(() => {
  // call changeMetric every 10 seconds
  const intervalId = setInterval(() => {
    changeMetric();
  }, 10_000);

  if (stop) {
    clearInterval(intervalId)
  }

  // optionally run once after mount but not synchronously:
  // setTimeout(() => changeMetric(), 0);

  return () => clearInterval(intervalId);
}, [stop]);

  return (
    <Container
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1200px",
        maxHeight: "90vh",
        margin: 'auto',
        backgroundColor: "#000",
      }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSection} // важливо для re-mount анімації
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          style={{ width: "100%" }}
        >
          {currentSection === 1 ? <Section1 /> : <Section2 />}
        </motion.div>
      </AnimatePresence>
      {currentSection === 2 ? (
        <button onClick={() => {changeMetric(); setStop(true)}}>
          <KeyboardArrowLeftIcon
            sx={{ position: "absolute", top: "50%", left: "0" }}
          />
        </button>
      ) : (
        <button onClick={() => {changeMetric(); setStop(true)}}>
          <KeyboardArrowRightIcon
            sx={{ position: "absolute", top: "50%", right: "0" }}
          />
        </button>
      )}
    </Container>
  );
}
