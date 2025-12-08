"use client";

import { motion } from "motion/react";

const DrawArrow = ({
  left,
  top,
  rotate,
}: {
  left: string;
  top: string;
  rotate: string;
}) => {
  return (
    <motion.svg
      viewBox="0 0 200 50"
      style={{
        position: "absolute",
        left: left,
        top: top,
        width: 200,
        height: 50,

        transform: `rotate(${rotate})`,
      }}
    >
      <motion.path
        d="M10 25 H150 L140 15 M150 25 L140 35"
        stroke="#FFF"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        // магія:
        initial={{ pathLength: 0, opacity: 0.3 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: "easeInOut",
        }}
        viewport={{ once: true, amount: 0.5 }} // анімація тільки 1 раз, коли 50% елемента у в’юпорті
      />
    </motion.svg>
  );
};

export default DrawArrow;
