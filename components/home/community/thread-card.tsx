import Thread, { ThreadInterface } from "@/components/community/thread";
import { Box } from "@mui/material";
import React from "react";
import { motion } from "motion/react";

interface Props {
  thread: ThreadInterface;
  position: "left" | "center" | "right";
}

const ThreadCard: React.FC<Props> = ({ thread }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Thread
        title={thread.title}
        comments={thread.comments}
        likes={thread.likes}
        content={thread.content}
        author={thread.author}
        createdAt={thread.createdAt}
      />
    </Box>
  );
};

export default ThreadCard;
