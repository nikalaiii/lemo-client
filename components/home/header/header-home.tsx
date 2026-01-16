"use client";

import { Box, Container, Toolbar, Typography } from "@mui/material";
import Terminal from "./terminal";
import HeaderInfo from "./header-info";

const HeaderHome = () => {
  return (
    <>
      {/* Фіксований навбар зверху */}

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
            Check | Trade | Profit
          </Typography>
          <HeaderInfo />
        </Container>
      </Box>
    </>
  );
};

export default HeaderHome;
