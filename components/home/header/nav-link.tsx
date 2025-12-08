import { Box } from "@mui/material";
import Link from "next/link";

const NavLink = ({ href, text }: { text: string; href: string }) => {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        fontSize: "16px",
        textDecoration: "none",
        color: "#fff",
        fontWeight: 500,
        opacity: "0.85",
        transition: {
          "&:hover": {
            opacity: 1,
          },
        },
      }}
    >
      {text}
    </Box>
  );
};

export default NavLink;
