"use client";

import StyledInput from "@/components/shared/StyledInput";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import ProductInfo from "@/components/shared/ProductInfo";
import StyledForm from "@/components/shared/StyledForm";

const EXAMPLE_AVATARS = [
  "/images/judy.webp",
  "/images/kerry.jpg",
  "/images/SoMi.webp",
  "/images/johny.webp",
];

const RegistrationPage = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedAvatar, setSelectedAvatar] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = e.target as HTMLElement;

      console.log("CLICK TARGET:", el);
      console.log("TAG:", el.tagName);
      console.log("CLASS:", el.className);
      console.log("ID:", el.id);
      console.log("POINTER EVENTS:", getComputedStyle(el).pointerEvents);
      console.log("Z-INDEX:", getComputedStyle(el).zIndex);
      console.log("POSITION:", getComputedStyle(el).position);
      console.log("-----");
    };

    document.addEventListener("mousedown", handler, true); 
    return () => document.removeEventListener("mousedown", handler, true);
  }, []);
  return (
    <Container
      sx={{
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        background: "none",
      }}
    >
      <ProductInfo position="right" />
      <Image
        style={{
          position: "absolute",
          left: "-20%",
          top: "-5%",
          pointerEvents: "none",
        }}
        width={700}
        height={700}
        src={"/images/ahiles-concept2.svg"}
        alt=""
      />

      <StyledForm>
        <Typography variant="h3" sx={{ fontWeight: "600" }}>
          Registration
        </Typography>

        <StyledInput label="Name" value={name} onChange={setName} type="text" />

        <Accordion
          sx={{
            background: "none",
            borderBottom: "1px solid #fff",
            borderLeft: "1px solid #fff",
            color: "#fff",
            maxWidth: "100%",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Select Avatar (optional)</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            {EXAMPLE_AVATARS.map((src, i) => {
              return (
                <Box
                  onClick={() => setSelectedAvatar(src)}
                  key={i}
                  sx={{
                    border:
                      selectedAvatar === src
                        ? "2px solid #fff"
                        : "2px solid transparent",
                    borderRadius: "50%",
                  }}
                >
                  <Avatar
                    key={i}
                    src={src}
                    sx={{ width: 56, height: 56, cursor: "pointer" }}
                  />
                </Box>
              );
            })}
            <Avatar sx={{ width: 56, height: 56, cursor: "pointer" }}>+</Avatar>
          </AccordionDetails>
        </Accordion>

        <StyledInput
          label="Email"
          value={email}
          onChange={setEmail}
          type="email"
        />

        <StyledInput
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          fullWidth={false}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ minWidth: "50%", marginInline: "auto" }}
        >
          Registrate
        </Button>

        <Link href={"/auth/login"}>Already have Account?</Link>
      </StyledForm>
    </Container>
  );
};

export default RegistrationPage;
