"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { FloatingNumbersLayer } from "./float-layer";

type GeometricChartProps = {
  a0?: number;          // перший член
  r?: number;           // коефіцієнт прогресії
  n?: number;           // кількість точок
  width?: number;
  height?: number;
};

export const GeometricProgressionChart: React.FC<GeometricChartProps> = ({
  a0 = 1,
  r = 1.4,
  n = 12,
  width = 700,
  height = 600,
}) => {
  // Генеруємо точки прогресії
  const points = useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      const value = a0 * Math.pow(r, i);
      arr.push({ x: i, y: value });
    }
    return arr;
  }, [a0, r, n]);

  // Знаходимо min/max для нормалізації в SVG
  const { minY, maxY } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const p of points) {
      if (p.y < min) min = p.y;
      if (p.y > max) max = p.y;
    }
    return { minY: min, maxY: max };
  }, [points]);

  // Конвертація в path d=""
  const pathD = useMemo(() => {
    if (!points.length) return "";

    const xStep = width / (n - 1 || 1);
    const yRange = maxY - minY || 1;

    return points
      .map((p, idx) => {
        const x = idx * xStep;
        // інвертуємо вісь Y, щоб більші значення були вище
        const normY = (p.y - minY) / yRange;
        const y = height - normY * (height * 0.9) - height * 0.05; // невеликий відступ
        return `${idx === 0 ? "M" : "L"} ${x},${y}`;
      })
      .join(" ");
  }, [points, width, height, minY, maxY, n]);

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.4 },
      },
    },
  };

  return (
    <div
      style={{
        width,
        height,
        maxWidth: "660px",
        maxHeight: "600px",
        background: "#050505",
        border: "1px solid #444",
        borderRadius: 8,
        padding: 16,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(207, 207, 207, 1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(207, 207, 207, 1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        <FloatingNumbersLayer />

      <motion.svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="100%"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        style={{ overflow: "visible" }}
      >
        {/* ось X */}
        <line
          x1={0}
          y1={height - 20}
          x2={width}
          y2={height - 20}
          stroke="#444"
          strokeWidth={1}
        />

        {/* ось Y */}
        <line
          x1={40}
          y1={0}
          x2={40}
          y2={height}
          stroke="#444"
          strokeWidth={1}
        />

        {/* сама лінія прогресії */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#4caf50"
          strokeWidth={3}
          variants={variants}
          strokeLinecap="round"
        />

        {/* точки */}
        {points.map((p, idx) => {
          const xStep = width / (n - 1 || 1);
          const yRange = maxY - minY || 1;
          const normY = (p.y - minY) / yRange;
          const y =
            height - normY * (height * 0.9) - height * 0.05;

          return (
            <motion.circle
              key={idx}
              cx={idx * xStep}
              cy={y}
              r={4}
              fill="#fff"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.05 * idx, duration: 0.3 },
              }}
              viewport={{ once: true, amount: 0.4 }}
            />
          );
        })}
      </motion.svg>
    </div>
  );
};
