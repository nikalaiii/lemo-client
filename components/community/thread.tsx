"use client";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import OptionsSelectButton, { Option } from "../shared/buttons/options-select";
import { motion } from "motion/react";

export interface ThreadProps {
  title: string;
  content: ThreadContent[];
  comments: number;
  likes: number;
  author: string;
  createdAt?: string;
}

export interface ThreadContent {
  id: string;
  type: "text" | "image" | "video" | "link";
  data: string;
  subData?: string;
}

const EXAMPLE_OPTIONS: Option[] = [
  {
    handler: () => console.log("Copy Link"),
    value: "Copy Link",
    sticker: "link",
  },
  { handler: () => console.log("Report"), value: "Report", sticker: "flag" },
  {
    handler: () => console.log("Hide Thread"),
    value: "Hide Thread",
    sticker: "hide",
  },
];

const Thread: React.FC<ThreadProps> = ({
  title,
  content,
  comments,
  likes,
  author,
  createdAt,
}) => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "1rem",
        border: "1px solid #fff",
        marginBottom: "1rem",
        maxWidth: "700px",
      }}
    >
      <Grid size={11}>
        <Typography variant="h3">{title}</Typography>
      </Grid>
      <Grid size={1} sx={{ textAlign: "right" }}>
        <OptionsSelectButton options={EXAMPLE_OPTIONS} />
      </Grid>
      <Grid size={12} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {content.map((item) => {
          switch (item.type) {
            case "text":
              return (
                <Typography key={item.id} variant="body2">
                  {item.data}
                </Typography>
              );
            case "image":
              return (
                <Image
                  key={item.id}
                  alt="image"
                  src={item.data}
                  width={100}
                  height={100}
                  style={{
                    minWidth: "80%",
                    margin: "auto",
                  }}
                />
              );
            case "video":
              return (
                <Typography variant="body2" key={item.id}>
                  we dont have Video content yet
                </Typography>
              );
            case "link":
              return (
                <a
                  key={item.id}
                  href={item.subData}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 12, fontWeight: 700, color: "#5c8061" }}
                >
                  {item.data}
                </a>
              );
            default:
              return null;
          }
        })}
      </Grid>
      <Grid
        size={6}
        sx={{
          display: "flex",
          gap: 2,
          borderTop: "1px solid #fff",
          paddingTop: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2, rotate: "25deg" }}
          >
            <FavoriteBorderIcon></FavoriteBorderIcon>
          </motion.button>
          <p>{likes}</p>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.2 }}
          >
            <CommentIcon></CommentIcon>
          </motion.button>
          <p>{comments}</p>
        </Box>
      </Grid>

      <Grid
        size={6}
        sx={{ textAlign: "right", borderTop: "1px solid #fff", paddingTop: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          <Typography variant="body1" sx={{ fontWeight: 800 }}>
            {author}
          </Typography>
          <Typography variant="subtitle2">traider</Typography>
        </Box>
        <Typography variant="body2">{createdAt}</Typography>
      </Grid>
    </Grid>
  );
};

export default Thread;
