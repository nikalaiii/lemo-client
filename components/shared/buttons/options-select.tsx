"use client";

import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { motion } from "motion/react";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddLinkIcon from "@mui/icons-material/AddLink";

export type Option = {
  handler: () => void;
  value: string;
  sticker: "flag" | "link" | "hide";
};

const DOT_SIZE = 10;
const DOT_GAP = 4;

const OptionsSelectButton = ({ options }: { options: Option[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <motion.button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        layout
        animate={{
          rotate: open ? -45 : 0,
        }}
        whileHover={{ gap: DOT_GAP + 2 }}
        transition={{
          duration: 0.35,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          display: "flex",
          flexDirection: open ? "column" : "row",
          gap: DOT_GAP,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0.5rem",
        }}
      >
        <ButtonDot />
        <ButtonDot />
        <ButtonDot />
      </motion.button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        elevation={2}
        sx={{ background: "none" }}
      >
        {options.map((opt, index) => (
          <MenuItem
            key={opt.value}
            onClick={() => {
              opt.handler();
              setAnchorEl(null);
            }}
            sx={{
              backgroundColor: "#000",
              border: "1px solid #fff",
              borderRadius: 0,
              ml: `${index * 12}px`,
            }}
          >
            {opt.value}
            {opt.sticker === "flag" && <OutlinedFlagIcon sx={{ ml: 1 }} />}
            {opt.sticker === "hide" && <VisibilityOffIcon sx={{ ml: 1 }} />}
            {opt.sticker === "link" && <AddLinkIcon sx={{ ml: 1 }} />}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

function ButtonDot() {
  return (
    <div
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        backgroundColor: "#000",
        border: "2px solid #fff",
      }}
    />
  );
}

export default OptionsSelectButton;
