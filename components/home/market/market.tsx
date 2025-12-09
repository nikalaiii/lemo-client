import { Container, Typography } from "@mui/material";
import Valotility from "./valotility";
import Coin, { ImageCoin } from "./coin";
import Description from "./description";

const images: ImageCoin[] = [
  {
    path: "/images/bitcoin.webp",
    left: 10,
    top: 10,
    name: "[BTC]Bitcoin",
    price: "97 542$ · +2.4%",
  },
  {
    path: "/images/ethereum.png",
    left: 32,
    top: 50,
    name: "[ETH]Ethereum",
    price: "28 724$ · +0.35%",
  },
  {
    path: "/images/tether.png",
    left: 58,
    top: 25,
    name: "[USDT]Tether",
    price: "3.63 · -0.24%",
  },
];

const Market = () => {
  return (
    <Container
      sx={{
        mt: '10vh',
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        minHeight: "90vh",
        maxWidth: "1200px",
        backgroundColor: "#000",
        position: "relative",
      }}
    >
      <Description />
      <Typography
        variant="h2"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "32px", md: "48px" },
          mb: 4,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        Be Up-To-Date with Market
      </Typography>

      {images.map((image, index) => (
        <Coin
          key={image.path}
          name={image.name}
          price={image.price}
          path={image.path}
          left={image.left}
          top={image.top}
          isRightSide={index === 2} // we expecting that in array will be only 3 elements. in this situation last element should be replased
        />
      ))}
      <Valotility />
    </Container>
  );
};

export default Market;
