"use client";

import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import NavBar from "./nav-bar";
import Terminal from "./terminal";
import HeaderInfo from "./header-info";

const HeaderHome = () => {
  return (
    <>
      {/* Фіксований навбар зверху */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(3px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <NavBar />
      </AppBar>

      {/* Спейсер під AppBar, щоб контент не залазив під нього */}
      <Toolbar />

      {/* Хедер-секція з терміналом як фоном */}
      <Box
        component="header"
        sx={{
          maxWidth: "1920px",
          width: "100%",
          position: "relative",
          height: "80vh", // висота хедера (можеш змінити)
          overflow: "hidden",
        }}
      >
        {/* Термінал як бекграунд */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none", // щоб не перекривав кліки
          }}
        >
          <Terminal />
        </Box>

        {/* Основний контент поверх терміналу */}
        <Container
          sx={{
            position: "relative",
            margin: "auto",
            maxWidth: "1920px",
            width: "100%",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // центруємо блок по вертикалі в хедері

          }}
        >
          <Typography
            variant="h1"
            sx={{ fontWeight: "800", fontSize: "50px", whiteSpace: "nowrap" }}
          >
            Check | Trade | Check
          </Typography>
          <HeaderInfo />
        </Container>
      </Box>
    </>
  );
};

export default HeaderHome;
