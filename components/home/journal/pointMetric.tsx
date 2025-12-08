import { Box, List, Typography } from "@mui/material";
import DrawCircle from "./circle-animate";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import React from "react";
import { motion } from "framer-motion";

interface Point {
  title: string;
  subtitle: string;
}

interface Props {
  variant: "circle" | "icon";
  points: Point[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1, // кожен наступний пізніше
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const PointMetric: React.FC<Props> = ({ variant, points }) => {
  return (
    <Box
      sx={{
        padding: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "10vh",
        borderLeft: "1px solid #fff",
      }}
    >
      <Typography variant="h4">
        <TrendingUpIcon />
        Root Analyze
      </Typography>
      <List sx={{ p: 0 }}>
        {points.map((point, index) => {
          return (
            <motion.div
              key={point.title}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderTop: "1px solid #fff",
                padding: "0.8rem 1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {variant === "circle" ? (
                  <DrawCircle isAbsolute={false} size={20} />
                ) : index % 2 === 0 ? (
                  <CheckCircleIcon />
                ) : (
                  <CheckCircleOutlineIcon />
                )}
              </Box>

              {/* ТЕКСТОВИЙ БОКС */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ fontSize: "20px" }}>
                  {point.title}
                </Typography>

                <Typography variant="body2" sx={{ fontSize: "14px" }}>
                  {point.subtitle}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
      </List>
    </Box>
  );
};

export default PointMetric;
