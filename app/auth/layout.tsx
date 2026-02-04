import { Box, Container } from "@mui/material";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backdropFilter: "blur(12px)",
          pointerEvents: "none",
          zIndex: 0,
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      />
      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          justifyContent: "center",
          boxShadow: "none",
          background: "none",
          mt: "5vh",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </Container>
    </>
  );
};
export default AuthLayout;
