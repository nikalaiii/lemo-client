"use client";

import { Box, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion } from "framer-motion";
import Thread, { ThreadInterface } from "@/components/community/thread";
import React from "react";

const ThreadsCarousel = ({ threads }: { threads: ThreadInterface[] }) => {
  const [centerIndex, setCenterIndex] = React.useState(0);

  const prev = () => {
    setCenterIndex((prev) => (prev - 1 + threads.length) % threads.length);
  };

  const next = () => {
    setCenterIndex((prev) => (prev + 1) % threads.length);
  };

  const getPosition = (index: number) => {
    const offset = index - centerIndex;
    if (offset === 0) return { scale: 1, zIndex: 3, x: 0 };
    if (Math.abs(offset) === 1)
      return { scale: 0.8, zIndex: 2, x: offset * 150 };
    if (Math.abs(offset) === 2)
      return { scale: 0.6, zIndex: 1, x: offset * 150 };
    return { scale: 0.5, zIndex: 0, x: offset * 150 };
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "90vh",
        overflow: "vissible",
      }}
    >
      <IconButton
        onClick={prev}
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        onClick={next}
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
        }}
      >
        <ArrowForward />
      </IconButton>

      <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
        {threads.map((thread, index) => {
          const { scale, x, zIndex } = getPosition(index);
          return (
            <motion.div
              key={thread.id}
              animate={{ x, scale }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <Thread
                author={thread.author}
                comments={thread.comments}
                content={thread.content}
                likes={thread.likes}
                title={thread.title}
              />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default ThreadsCarousel;
