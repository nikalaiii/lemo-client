import { Toolbar, Box, Container } from "@mui/material";
import NavLink from "./nav-link";
import NavAuthLink from "./auth-link";
import LemoCircle from "./lemo-circle";
import { useState } from "react";
import GlitchOverlay from "@/components/shared/effects/glitch";
import { useRouter } from "next/navigation";
import LemoWordmark from "./nav-logo";

const NavBar = () => {
  const [trigger, setTrigger] = useState(false);
  const [clicked, setClicked] = useState(false);
  const router = useRouter()

  const startGlitch = () => {
    setTrigger(false); // reset
    requestAnimationFrame(() => setTrigger(true));
  };

  const handleClick = () => {
      if (!clicked) {
        startGlitch();
        return setClicked(true);
      } else { 
        router.refresh();
      }
  }

  return (
    <Toolbar sx={{ minHeight: "72px" }}>
      <GlitchOverlay active={trigger} />
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Логотип */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Box onClick={() => handleClick()} sx={{ display: "flex", alignItems: "center" }}>
            <LemoCircle isClicked={clicked} />
           <LemoWordmark />
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
