"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import GlitchOverlay from "./glitch";

export default function TriggerGlitchEffect() {
  const [trigger, setTrigger] = useState(false);

  const startGlitch = () => {
    setTrigger(false); // reset
    requestAnimationFrame(() => setTrigger(true));
  };

  return (
    <>
      <GlitchOverlay active={trigger} />

      <Button
        variant="contained"
        onClick={startGlitch}
        style={{
          position: "fixed",
          top: 30,
          left: 30,
        }}
      >
        BREAK LIGHT ⚡
      </Button>
    </>
  );
}
