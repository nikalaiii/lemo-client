'use client';

import { Avatar, Box, Typography } from "@mui/material";
import { motion } from "motion/react";

export interface ImageCoin {
  path: string;
  left: number;
  top: number;
  name: string,
  price: string,
  isRightSide?: boolean
  // можеш одразу сюди докинути name, price, change і т.д.
}

const Coin: React.FC<ImageCoin> = ({ path, top, left, name, price, isRightSide = false }) => {
  return (
    <Box
      component={motion.div}
      initial={{ y: 0, scale: 1 }}
      animate={{
        y: [-6, 6, -6],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{ scale: 1.08 }}
      sx={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        backgroundColor: "#fff",
        borderRadius: "50%",
        p: 1,
        boxShadow: "0 0 40px rgba(0, 255, 255, 0.35)",
        cursor: "pointer",
        // головна магія: керуємо дочірнім елементом .coin-tooltip
        "&:hover .coin-tooltip": {
          opacity: 1,
          transform: "translateY(-50%) translateX(0)",
        },
      }}
    >
      <Avatar
        alt="coin"
        src={path}
        sx={{ width: "90px", height: "90px" }}
      />

      {/* Tooltip */}
      <Box
        className="coin-tooltip"
        sx={{
          position: "absolute",
          left: isRightSide ? '-115%' : "115%",           // праворуч від монети
          top: "50%",
          transform: 'translateY(-50%) translateX(8px)',
          opacity: 0,             // сховано за замовчуванням
          transition: "opacity 0.2s ease, transform 0.2s ease",
          bgcolor: "#111",
          color: "#fff",
          px: 1.5,
          py: 1,
          borderRadius: 1,
          fontSize: 12,
          whiteSpace: "nowrap",
          pointerEvents: "none",  // щоб ховер не “падав” при заході на тултіп
          boxShadow: "0 0 12px rgba(0,0,0,0.6)",
          zIndex: 10,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {name}
        </Typography>
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {price}
        </Typography>
      </Box>
    </Box>
  );
};

export default Coin;
