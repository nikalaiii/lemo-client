import { Box, Drawer, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Security, Speed, PrivacyTip, AccountBalance, MonetizationOn, VerifiedUser, Lock, SwapHoriz, Public } from "@mui/icons-material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { motion } from "motion/react";

const ProductInfo = ({ position }: { position: "left" | "right" }) => {
  return (
    <Box
    component={motion.aside}
        initial={{ opacity: 0, x: position === "left" ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={2}
      sx={{
        position: "fixed",
        left: position === "left" ? 0 : undefined,
        right: position === "right" ? 0 : undefined,
        height: "100vh",
        width: "25vw",
        maxHeight: "100vh",
        p: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#000",
        borderLeftWidth: position === "right" ? "3px" : "0px",
        borderLeftColor: position === "right" ? "#fff" : "none",
        borderRightColor: position === "left" ? "#fff" : "none",
        borderRightWidth: position === "left" ? "3px" : "0px",
      }}
    >
        <Typography variant="h4" sx={{ fontWeight: "600", mb: "1rem", color: "#fff" }}>
          Why buy Lemo Coin?
        </Typography>
        <List sx={{ color: "#fff" }}>
          <ListItem>
            <ListItemIcon>
              <PrivacyTip sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Fully Anonymous: No personal data required for transactions." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AccountBalance sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Decentralized Network: No central authority controls your funds." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <MonetizationOn sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Low Transaction Fees: Minimal costs for every transfer." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VerifiedUser sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Verified Transactions: Built-in verification for trust." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SwapHoriz sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Seamless Swaps: Easy exchange with other cryptocurrencies." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Public sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Global Accessibility: Accessible from anywhere in the world." />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <AddTaskIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="High Scalability: Handles millions of transactions efficiently." />
          </ListItem>
        </List>
    </Box>
  );
};

export default ProductInfo;
