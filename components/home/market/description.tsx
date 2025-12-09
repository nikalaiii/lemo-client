import { Box, Typography } from "@mui/material";

const Description = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        p: "2rem",
        textAlign: "left",
        maxWidth: "30%"
      }}
    >
      <Typography variant="body1">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        atque vel ab possimus rerum molestias reprehenderit quisquam est
        perferendis perspiciatis! Sed molestias quas soluta maiores. Repellendus
        aut reiciendis a tempora ea facilis alias magni id soluta accusamus
        corporis, dignissimos quidem.
      </Typography>
    </Box>
  );
};

export default Description;
