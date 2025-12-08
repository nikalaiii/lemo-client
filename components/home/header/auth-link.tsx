import { Box } from "@mui/material";
import Link from "next/link";

const NavAuthLink = ({ type }: { type: "login" | "register" }) => {
  return (
    <Box
      component={Link}
      href={`/auth/${type}`}
      sx={{
        fontSize: "16px",
        backgroundColor: () => (type === "login" ? "none" : "#FFF"),
        border: () => (type === "login" ? "1px solid white" : "none"),
        paddingInline: "2rem",
        textDecoration: "none",
        color: () => type === 'login' ? "#FFF" : '#000',
        fontWeight: 500,
        opacity: "0.85",
        transition: {
          "&:hover": {
            opacity: 1,
          },
        },
      }}
    >
      {type === "login" ? "Log In" : "Join Us"}
    </Box>
  );
};

export default NavAuthLink;
