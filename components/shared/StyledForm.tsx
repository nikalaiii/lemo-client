import { Box } from "@mui/material";
import React from "react";
import { motion } from "motion/react";

const StyledForm = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      component={motion.form}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      sx={{
        position: "relative",
        zIndex: 10000,
        minWidth: "30vw",
        minHeight: "50vh",
        p: "2.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        backgroundColor: "#000",
        border: "3px solid #fff",
        borderRadius: 0,
        overflow: "visible",

        /* 🔹 верхня скошена тінь */
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-10px",
          left: "-2px",
          right: "-6px",
          height: "10px",
          backgroundColor: "rgba(0, 255, 150, 0.45)",
          transform: "skewX(-18deg)",
          pointerEvents: "none",
        },

        /* 🔻 права скошена тінь */
        "&::after": {
          content: '""',
          position: "absolute",
          top: "-10px",
          bottom: "-3px",
          right: "-10px",
          width: "6px",
          backgroundColor: "rgba(255, 60, 60, 0.45)",
          transform: "skewY(-18deg)",
          pointerEvents: "none",
        },
      }}
    >
      {children}
    </Box>
  );
};

export default StyledForm;