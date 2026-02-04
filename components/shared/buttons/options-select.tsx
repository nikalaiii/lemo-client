"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import OutlinedFlagIcon from "@mui/icons-material/OutlinedFlag";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useRef, useEffect } from "react";

const STEP = 8;

export type Option = {
  handler: () => void;
  value: string;
  sticker: "flag" | "link" | "hide";
};

interface SelectButtonProps {
  options: Option[];
}

const OptionsMenu: React.FC<SelectButtonProps> = ({ options }) => {
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {/* Trigger */}
      <motion.div
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        style={{
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer",
          borderRadius: 8,
          overflow: "hidden", // ← обмежує вміст
          boxSizing: "border-box",
          background: "black",
          padding: "15px",
        }}
        whileHover={{ gap: 8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: open ? i * STEP : 0, // зсув вниз
            }}
            whileHover={{
              y: 6,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            style={{
              minWidth: 10,
              height: 10,
              border: "2px solid white",
              background: "black",
            }}
          />
        ))}
      </motion.div>

      {/* Menu */}
      <AnimatePresence>
        {open && <StairMenu options={options} onSelect={() => setOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

const StairMenu: React.FC<SelectButtonProps & { onSelect?: () => void }> = ({
  options,
  onSelect,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "absolute",
        top: 20,
        left: 0,
        display: "flex",
        gap: 16,
      }}
    >
      {/* Options stairs */}
      <div>
        {options.map((option: Option, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: i * STEP,
            }}
            transition={{ delay: 0.15 + i * 0.05 }}
            style={{
              border: "1px solid white",
              padding: "6px 12px",
              marginBottom: 6,
              width: 120 + i * 30,
              background: "black",
              color: "white",
              textAlign: "center",
            }}
            onClick={() => {
              option.handler();
              onSelect?.();
            }}
          >
            {option.sticker === "flag" && <OutlinedFlagIcon sx={{ mr: 1 }} />}
            {option.sticker === "hide" && <VisibilityOffIcon sx={{ mr: 1 }} />}
            {option.sticker === "link" && <AddLinkIcon sx={{ mr: 1 }} />}
            {option.value}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default OptionsMenu;
