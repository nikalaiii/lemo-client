"use client";

import ProductInfo from "@/components/shared/ProductInfo";
import StyledForm from "@/components/shared/StyledForm";
import StyledInput from "@/components/shared/StyledInput";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Container
      sx={{
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        background: "none",
      }}
    >
      <ProductInfo position="left" />
      <Image
        style={{
          position: "absolute",
          right: "-10%",
          top: 0,
          pointerEvents: "none",
        }}
        width={1300}
        height={1300}
        src={"/images/prometheus-reversed-fixed.svg"}
        alt="p"
      />
      <StyledForm>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            flexWrap: "nowrap",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "600" }}>
            Log In
          </Typography>

          <Link href={"/auth/reset"}>Forgot Password</Link>
        </div>

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
          sx={{ minWidth: "50%", marginInline: "auto" }}
        >
          Log In
        </Button>
      </StyledForm>
    </Container>
  );
};

export default LoginPage;
