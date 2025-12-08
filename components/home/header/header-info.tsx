import { Box, Typography } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import PeopleIcon from "@mui/icons-material/People";
import HeaderChat, {
  MessageInterface,
} from "@/components/shared/chat/header-chat";
import { FadeContainer } from "@/components/shared/fade-container";

const exampleMessage: MessageInterface = {
  id: "123123123123",
  author: "Lemo AI",
  createdAt: "2025/01/01",
  content: "hello, how can i help you?",
  itsMy: false,
};

const HeaderInfo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        backgroundColor: "#000",
        minHeight: "150vh",
      }}
    >
      <FadeContainer>
        <Box
          sx={{
            backgroundColor: "#000",
            padding: "20px",
            minWidth: "40vw",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}
          >
            <Box
              sx={{
                maxWidth: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Trade Journal</Typography>
              <BookIcon sx={{ width: "32px", height: "32px" }} />
            </Box>
            <div
              style={{
                width: "1px",
                height: "100px",
                backgroundColor: "#FFF",
                marginInline: "1vw",
              }}
            ></div>
            <Box
              sx={{
                maxWidth: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Market Insights</Typography>
              <QueryStatsIcon sx={{ width: "32px", height: "32px" }} />
            </Box>
            <div
              style={{
                width: "1px",
                height: "100px",
                backgroundColor: "#FFF",
                marginInline: "1vw",
              }}
            ></div>
            <Box
              sx={{
                display: "flex",
                maxWidth: "25%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Skill Growth</Typography>
              <KeyboardDoubleArrowUpIcon
                sx={{ width: "32px", height: "32px" }}
              />
            </Box>
            <div
              style={{
                width: "1px",
                height: "100px",
                backgroundColor: "#FFF",
                marginInline: "1vw",
              }}
            ></div>
            <Box
              sx={{
                display: "flex",
                maxWidth: "25%",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="h5">Community</Typography>
              <PeopleIcon sx={{ width: "32px", height: "32px" }} />
            </Box>
          </Box>
        </Box>
      </FadeContainer>

      <FadeContainer>
        <HeaderChat messages={[exampleMessage]} />
      </FadeContainer>
    </Box>
  );
};

export default HeaderInfo;
