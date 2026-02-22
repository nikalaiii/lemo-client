'use client'

import { Toolbar, Box, Container, Button } from "@mui/material";
import NavLink from "./nav-link";
import { useState } from "react";
import GlitchOverlay from "@/components/shared/effects/glitch";
import { useRouter } from "next/navigation";
import LemoWordmark from "./nav-logo";
import Link from "next/link";
import NavButton from "./nav-button";
import LemoCircle from "@/components/home/header/lemo-circle";

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
        router.push('/');
        return setClicked(true);
      } else { 
        router.push('/');
      }
  }

  return (
    <Box sx={{ minHeight: 72, display: "flex", alignItems: "center" }}>
      <GlitchOverlay active={trigger} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          background: 'none',
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
          <Box onClick={() => handleClick()} sx={{ display: "flex", alignItems: "center", background: "none" }}>
            <LemoCircle isClicked={clicked} />
           <LemoWordmark />
          </Box>
          {/* Навігація */}
          <Box sx={{ display: "flex", gap: 4 }}>
            <NavLink text="Learn" href="/learn"></NavLink>
            <NavLink text="redactor" href="/redactor"></NavLink>
            <NavLink text="About Us" href="/about"></NavLink>
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <NavButton variant="contained" text="Register" href='/auth/register'/>
          <NavButton variant="outlined" text="Login" href='/auth/login'/>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
