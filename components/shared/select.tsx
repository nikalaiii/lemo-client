"use client";

import * as React from "react";
import { Select, MenuItem, Box, FormControl, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SelectComponent({ values }: { values: string[] }) {
  const [value, setValue] = React.useState("");

  return (
    <FormControl sx={{ minWidth: 240 }}>
      <Select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        displayEmpty
        IconComponent={ExpandMoreIcon}
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: 0,

          "& .MuiSelect-select": {
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },

          "& .MuiSelect-icon": {
            color: "#fff",
            right: 12,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              backgroundColor: "#000",
              borderRadius: 0,
              border: "1px solid #222",
              overflow: "hidden",
            },
          },
          MenuListProps: {
            sx: {
              padding: 0,
            },
          },
        }}
      >
        <MenuItem disabled value="">
          <Typography sx={{ color: "#666" }}>Select difficulty</Typography>
        </MenuItem>
        {/* Placeholder */}
        {values.map((value) => (
          <MenuItem value={value} sx={menuItemSx}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const menuItemSx = {
  px: 2,
  py: 1.5,
  color: "#fff",
  border: "1px solid #fff",

  "&:hover": {
    backgroundColor: "#1f0101",
  },

  "&.Mui-selected": {
    backgroundColor: "#021f01",
    color: "#fff",
  },

  "&.Mui-selected:hover": {
    backgroundColor: "#1f0101",
  },
};
