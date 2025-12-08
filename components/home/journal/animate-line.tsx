'use client'

import React from "react";
import { motion } from "framer-motion";
interface UnderlineProps {
  length: number; // довжина лінії в px
  strokeWidth?: number; // товщина лінії
  color?: string; // колір лінії
  duration?: number; // тривалість анімації
  top: string;
  left: string;
}

export const MotionUnderline: React.FC<UnderlineProps> = ({
  top,
  left,
  length,
  strokeWidth = 3,
  color = "#FFF",
  duration = 1,
}) => {
  return (
    <motion.svg
      width={length}
      height={strokeWidth * 4}
      viewBox={`0 0 ${length} ${strokeWidth * 4}`}
      style={{
        position: "absolute",
        top: top,
        left: left,
        overflow: "visible",
        display: "block",
      }}
    >
      <motion.line
        x1={0}
        y1={strokeWidth * 2}
        x2={length}
        y2={strokeWidth * 2}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.4 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, ease: "easeInOut" }}
        viewport={{ once: true, amount: 0.5 }}
      />
    </motion.svg>
  );
};

export default MotionUnderline;