import React from "react";
import { Box, TextField, Typography } from "@mui/material";

export interface MessageInterface {
  id: string;
  itsMy: boolean;
  createdAt: string;
  content: string;
  author?: string | undefined;
}

const HeaderChat = ({ messages }: { messages: MessageInterface[] }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "70vw",
        minWidth: "40vw",
        background: "#000", // чистий чорний фон
        border: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          padding: 2,
          overflowY: "auto",

          // темний скролбар
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(200,200,200,0.22)",
          },
        }}
      >
        {messages.map((msg) => (
          <Message
            key={msg.id}
            id={msg.id}
            itsMy={msg.itsMy}
            createdAt={msg.createdAt}
            content={msg.content}
            author={msg.author}
          />
        ))}
      </Box>

      {/* Input */}
      <Box
        sx={{
          padding: 1.25,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(20,20,20,0.9)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            paddingX: 1.5,
            paddingY: 1,
            backgroundColor: "#111",
            border: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <TextField
            variant="standard"
            fullWidth
            placeholder="Write a message..."
            InputProps={{
              disableUnderline: true,
              sx: {
                color: "rgba(255,255,255,0.9)",
                fontSize: 14,
              },
            }}
            inputProps={{
              style: { padding: 0 },
            }}
          />

          <Box
            sx={{
              width: 24,
              height: 24,
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.25)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            ↵
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Message: React.FC<MessageInterface> = ({
  id,
  itsMy,
  createdAt,
  content,
  author,
}) => {
  const isMine = itsMy;

  return (
    <Box
      id={id}
      sx={{
        display: "flex",
        justifyContent: isMine ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "68%",
          paddingX: 1.5,
          paddingY: 1,
          borderRadius: isMine
            ? "14px 14px 4px 14px"
            : "14px 14px 14px 4px",

          // тільки відтінки сірого
          background: isMine
            ? "rgba(255,255,255,0.08)" // світліший графіт
            : "rgba(255,255,255,0.04)", // темніший

          border: isMine
            ? "1px solid rgba(255,255,255,0.22)"
            : "1px solid rgba(255,255,255,0.1)",

          color: "rgba(255,255,255,0.92)",
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
        }}
      >
        {author && (
          <Typography
            variant="caption"
            sx={{
              fontSize: 10,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {author}
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: 14,
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {content}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            alignSelf: "flex-end",
            fontSize: 10,
            marginTop: 0.25,
            color: "rgba(255,255,255,0.28)",
          }}
        >
          {createdAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeaderChat;
