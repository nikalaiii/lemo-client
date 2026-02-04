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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: "#000",
          color: "#fff",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },

        input: {
          padding: "12px 14px",

          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #000 inset",
            WebkitTextFillColor: "#fff",
            caretColor: "#fff",
            transition: "background-color 9999s ease-out",
          },
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          pointerEvents: "none",
          color: "#fff",
        },
      },
    },


    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0,0,0,0.35)", // прозорий
          backdropFilter: "blur(12px)", // блюр
          boxShadow: "none",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          width: "100%", // явно
          maxWidth: "1280px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "90vh",
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "#000",
          mt: "10vh",
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

    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          position: "relative",
          overflow: "visible", // даємо тіням вийти за межі
          borderRadius: 0,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "16px",
          paddingInline: "2rem",
          paddingBlock: "0.55rem",
          opacity: 0.85,
          "&:hover": {
            opacity: 1,
          },

          // базові параметри обох “тіней”
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            left: 0, // трохи ширші за кнопку
            right: 0,
            height: "10px",
            opacity: 0,
            transform: "skewX(-18deg) translateY(0)",
            transformOrigin: "center",
            transition: "opacity .22s ease-out, transform .22s ease-out",
            pointerEvents: "none",
          },

          // верхня зелена
          "&::before": {
            top: 0,
            backgroundColor: "rgba(46, 204, 113, 0.75)", // зелена, напівпрозора
          },

          // нижня червона
          "&::after": {
            bottom: 0,
            backgroundColor: "rgba(192, 57, 43, 0.8)", // червона, напівпрозора
          },

          // при hover “тіні” виїжджають за межі кнопки
          "&:hover::before": {
            opacity: 1,
            transform: "skewX(-18deg) translateY(-120%)", // вверх, як верхня тінь
          },
          "&:hover::after": {
            opacity: 1,
            transform: "skewX(-18deg) translateY(120%)", // вниз, як нижня тінь
          },
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "1px solid transparent",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: "transparent",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "1px solid #ffffff",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.08)",
              borderColor: "#ffffff",
            },
          },
        },
      ],
    },
  },
});
