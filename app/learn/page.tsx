import BasicTabs from "@/components/learn/courses";
import HeaderLearn from "@/components/learn/header-learn";
import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const LearnPage = () => {
  return (
    <Container
      sx={{
        width: "100vw",
        position: "relative",
        maxWidth: "1200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "500vh",
        border: "1px solid #fff",
        p: 0,
        boxSizing: "border-box",
      }}
    >
      <HeaderLearn />
      <BasicTabs />
      <div
        style={{
          minHeight: "500vh",
          backgroundColor: "#000",
          zIndex: 999,
          border: "1px solid #fff",
        }}
      ></div>
    </Container>
  );
};

export default LearnPage;
