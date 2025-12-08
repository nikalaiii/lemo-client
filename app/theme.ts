import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000", // фон сайту
      paper: "#0a0a0a", // фон панелей
    },
    primary: {
      main: "#ffffff",
      contrastText: "#000",
    },
    secondary: {
      main: "#ffdd00",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1920, 
      xl: 2560,
    },
  },

  typography: {
    fontFamily: "'JetBrains Mono', 'Inter', sans-serif",
    h1: {
      fontSize: "3.4rem",
      fontWeight: 700,
      letterSpacing: "-0.05rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.35)", // прозорий
          backdropFilter: "blur(12px)", // блюр
          boxShadow: "none",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
    },
  },
});
