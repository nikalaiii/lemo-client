import HeaderHome from "@/components/home/header/header-home";
import "./globals.css";
import Journal from "@/components/home/journal/section";
import Market from "@/components/home/market/market";

export default function Home() {
  return (
    <>
      <HeaderHome />
      <Journal />
      <Market />
      <div className="" style={{ minHeight: "100vh " }}></div>
    </>
  );
}
