'use client'
import { motion } from "motion/react";

interface CircleProps {
  isAbsolute: boolean,
  left?: string,
  top?: string,
  size: number,
}

const DrawCircle: React.FC<CircleProps> = ({ isAbsolute, left, top, size }) => (
    <motion.svg viewBox="0 0 100 100" style={{
        position: isAbsolute ? "absolute" : "inherit",
        top: isAbsolute ? top : undefined,
        left: isAbsolute ? left : undefined,
        width: size,
        height: size,
      }}>
    <motion.circle
      cx="50"
      cy="50"
      r="40"
      stroke="#FFF"
      strokeWidth={2}
      fill="none"
      initial={{ pathLength: 0, opacity: 0.3 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.5 }}
    />
  </motion.svg>
);

export default DrawCircle;