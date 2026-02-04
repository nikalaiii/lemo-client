'use client';

import LemoWordmark from "@/components/shared/navigation/nav-logo";
import { Grid, Typography, Link, Box } from "@mui/material";
import LemoCircle from "../header/lemo-circle";
import { useRef } from "react";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StyledInput from "@/components/shared/StyledInput";

const Footer: React.FC = () => {
    const clickref = useRef<boolean>(false);
  return (
    <footer
      style={{
        minWidth: "100vw",
        minHeight: "40vh",
        backgroundColor: "#000",
        opacity: 1,
        color: "#fff",
        padding: "2rem 0",
        zIndex: 10,
        paddingInline: "10vw"
        
      }}
    >
      <Grid container style={{ padding: "0 2rem", color: "#fff" }} spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <LemoWordmark />
          <Typography variant="body2" sx={{ mt: 2 }}>
            Empowering your learning journey with innovative tools and resources.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/learn" color="inherit" underline="hover" display="block">
              Learn
            </Link>
            <Link href="/community" color="inherit" underline="hover" display="block">
              Community
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">
              Contact
            </Link>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="https://facebook.com" color="inherit" target="_blank" rel="noopener">
              <FacebookIcon />
            </Link>
            <Link href="https://twitter.com" color="inherit" target="_blank" rel="noopener">
              <TwitterIcon />
            </Link>
            <Link href="https://instagram.com" color="inherit" target="_blank" rel="noopener">
              <InstagramIcon />
            </Link>
            <Link href="https://linkedin.com" color="inherit" target="_blank" rel="noopener">
              <LinkedInIcon />
            </Link>
          </Box>
        </Grid>
        <Grid size={12}>
          <Typography variant="body2" align="center" sx={{ mt: 4, pt: 2, borderTop: '1px solid #333' }}>
            © {new Date().getFullYear()} Lemo. All rights reserved.
          </Typography>
        </Grid>
      </Grid>

       <StyledInput
        label="Email"

          value={'asdasd'}
          onChange={() => {}}
          type="email"
        />
        <StyledInput
        label="Password"

          value={'password'}
          onChange={() => {}}
          type="password"
          fullWidth={false}
        />
    </footer>
  );
};

export default Footer;
