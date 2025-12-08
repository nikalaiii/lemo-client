// FloatingNumbersLayer.tsx
'use client'
import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import FloatingNumber from "./random-float";

interface FloatingNumberItem {
  id: number;
  leftPercent: number;
}

export const FloatingNumbersLayer: React.FC = () => {
  const [items, setItems] = useState<FloatingNumberItem[]>([]);
  const idRef = useRef(0);

  // спавнимо нове число кожні ~3 секунди
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [
        ...prev,
        {
          id: idRef.current++,
          leftPercent: 10 + Math.random() * 80, // між 10% та 90% ширини
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDone = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0, // позаду свічок
      }}
    >
      {items.map((item) => (
        <FloatingNumber
          key={item.id}
          leftPercent={item.leftPercent}
          onDone={() => handleDone(item.id)}
        />
      ))}
    </Box>
  );
};
