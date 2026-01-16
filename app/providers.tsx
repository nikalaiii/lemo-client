"use client";
import { ApolloProvider } from "@apollo/client/react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import React from "react";
import apoloClient from "@/apolo/client";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={apoloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
