import HeaderHome from "@/components/home/header/header-home";
import "./globals.css";
import Journal from "@/components/home/journal/section";
import Market from "@/components/home/market/market";
import Skills from "@/components/home/skills/skills-section";
import Community from "@/components/home/community/section";

export default function Home() {
  return (
    <>
      <HeaderHome />
      <Journal />
      <Market />
      <Skills />
      <Community />
      <div className="" style={{ minHeight: "100vh " }}></div>
    </>
  );
}
