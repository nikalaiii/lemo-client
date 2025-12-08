import { Toolbar, Box, Container } from "@mui/material";
import NavLink from "./nav-link";
import Image from "next/image";
import NavAuthLink from "./auth-link";

const NavBar = () => {
  return (
    <Toolbar sx={{ minHeight: "72px" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Логотип */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              width={45}
              height={45}
              style={{ width: "45px", height: "45px" }}
              src={"/logo.jpg"}
              alt="lemo"
            />
            <svg
              width="200"
              height="64"
              viewBox="0 0 200 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="200" height="64" fill="black" />

              <g
                fill="white"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                fontWeight="600"
                fontSize="32"
              >
                <text x="40" y="44">
                  L
                </text>

                <g transform="translate(100,0) scale(-1,1)">
                  <text x="0" y="44">
                    E
                  </text>
                </g>

                <text x="120" y="44">
                  M
                </text>

                <text x="160" y="44">
                  O
                </text>
              </g>
            </svg>
          </Box>
          {/* Навігація */}
          <Box sx={{ display: "flex", gap: 4 }}>
            <NavLink text="Learn" href="/learn"></NavLink>
            <NavLink text="Community" href="/community"></NavLink>
            <NavLink text="About Us" href="/about"></NavLink>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <NavAuthLink type="login" />
            <NavAuthLink type="register" />
        </Box>
      </Container>
    </Toolbar>
  );
};

export default NavBar;
