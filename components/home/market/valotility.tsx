'use client'

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

function randomInRange(a: number, b: number) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MIN_HEIGHT = 50;
const MAX_HEIGHT = 250;

const Valotility = () => {
  const [bloks, setBloks] = useState<number[]>([]);
  const [viewPortWidth, setViewPortWidth] = useState(0);
  const blockWidth = 40;
  const blockGap = 10;

  const bloksCount = Math.floor(viewPortWidth / (blockWidth + blockGap));

  // Initialize viewport width on client-side only
  useEffect(() => {
    setViewPortWidth(window.innerWidth);
    
    const handleResize = () => setViewPortWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate blocks when viewport width changes
  useEffect(() => {
    if (bloksCount === 0) return;
    
    const newBloks = [];
    for (let i = 0; i < bloksCount; i++) {
      newBloks.push(randomInRange(MIN_HEIGHT, MAX_HEIGHT));
    }
    setBloks(newBloks);
  }, [bloksCount]);

  if (bloks.length === 0) return null; // Don't render until blocks are ready

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: `${blockGap}px`,
        alignItems: "flex-end",
      }}
    >
      {bloks.map((blockValue: number, index) => {
        const isBigger = bloks[index - 1] ? bloks[index - 1] > bloks[index] ? false : true : false;
        return (
          <Block height={blockValue} width={blockWidth} isBull={isBigger} key={index} delay={index * 0.07} />
        );
      })}
    </Box>
  );
};

const Block = ({
  height,
  width,
  isBull,
  delay,
}: {
  height: number;
  width: number;
  isBull: boolean;
  delay: number;
}) => {
  return (
    <Box
      component={motion.div}
      initial={{ scaleY: 1 }}
      animate={{ scaleY: [0.98, 1, 0.98, 1] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay, 
      }}
      sx={{
        height: `${height}px`,
        width: `${width}px`,
        backgroundColor: isBull ? "green" : "red",
        zIndex: 5,
        transformOrigin: "bottom", 
      }}
    />
  );
};

export default Valotility;