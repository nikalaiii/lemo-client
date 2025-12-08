import { Box } from "@mui/material";
import Image from "next/image";
import { motion } from "motion/react";

const LemoCircle = ({ isClicked }: { isClicked: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <motion.div
        // whileHover={isClicked ? { scale: "1.1" } : { rotate: "180deg" }}
        whileHover={!isClicked ? {
          x: [0, -2, 2, -2, 2, 0],
          transition: {
            duration: 0.05,
            repeat: Infinity,
          },
        } : { rotate: "180deg" }}
      >
        {/* Лого поверх SVG */}
        <Image
          width={45}
          height={45}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: -1,
          }}
          src={"/logo.jpg"}
          alt="lemo"
        />

        {/* SVG коло */}
        <svg width="52" height="52" viewBox="0 0 45 45">
          <g id="lemoGroup">
            <circle
              cx="30"
              cy="30"
              r="25"
              stroke="white"
              strokeWidth="0"
              fill="none"
            />

            {/* рухома точка */}
            <circle cx="22.5" cy="4" r="4" fill="white">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 22.5 22.5"
                to="360 22.5 22.5"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>

            <circle cx="22.5" cy="4" r="4" fill="white">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 22.5 22.5"
                to="0 22.5 22.5"
                dur="6s"
                repeatCount="indefinite"
              />
            </circle>

            {/* легка вібрація */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 22.5 22.5; 4 22.5 22.5; 0 22.5 22.5; -4 22.5 22.5; 0 22.5 22.5"
              keyTimes="0;0.25;0.5;0.75;1"
              dur="6s"
              repeatCount="indefinite"
            />
          </g>
        </svg>
      </motion.div>
    </Box>
  );
};

export default LemoCircle;
