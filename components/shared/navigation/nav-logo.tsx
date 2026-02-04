"use client";

import { motion } from "motion/react";

const LemoWordmark = () => {
  // L: нормальна → дзеркальна
  const lVariants = {
    rest: { scaleX: 1 },
    hover: { scaleX: -1 },
  };

  // E: дзеркальна → нормальна
  const eVariants = {
    rest: { scaleX: -1 },
    hover: { scaleX: 1 },
  };

  return (
    <motion.svg
      width="200"
      height="64"
      viewBox="0 0 200 64"
      xmlns="http://www.w3.org/2000/svg"
      initial="rest"
      whileHover="hover"
      style={{ cursor: "pointer" }}
    >
      <rect width="200" height="64" fill="none" />

      {/* L */}
      <motion.g
        variants={lVariants}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          transformBox: "fill-box",    // важливо для SVG
          transformOrigin: "50% 50%",  // центр букви
        }}
      >
        <text
          x="60"
          y="44"
          fill="white"
          fontSize="32"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="600"
        >
          L
        </text>
      </motion.g>

      {/* E (дефолт дзеркальна) */}
      <motion.g
        variants={eVariants}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          transformBox: "fill-box",
          transformOrigin: "50% 50%",
        }}
      >
        <text
          x="100"
          y="44"
          fill="white"
          fontSize="32"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          fontWeight="600"
        >
          E
        </text>
      </motion.g>

      {/* M */}
      <text
        x="132"
        y="44"
        fill="white"
        fontSize="32"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontWeight="600"
      >
        M
      </text>

      {/* O */}
      <text
        x="168"
        y="44"
        fill="white"
        fontSize="32"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontWeight="600"
      >
        O
      </text>
    </motion.svg>
  );
};

export default LemoWordmark;
