import { Box, Container } from "@mui/material";
import Image from "next/image";
import React from "react";

const LearnLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* FULL VIEWPORT BACKGROUND */}
      <Box
        sx={{
          position: "absolute",
          top: "100vh",
          width: "40vw",
          left: "-20%",
          zIndex: 0,
          height: "200vh",
        }}
      >
        <Image
          src="/images/completed.svg"
          alt="learn background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "200vh",
          width: "40vw",
          right: 0,
          height: "200vh",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/completed.svg"
          alt="learn background"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Box>

      {/* CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default LearnLayout;
