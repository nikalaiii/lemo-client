import HeaderHome from "@/components/home/header/header-home";
import "./globals.css";
import Journal from "@/components/home/journal/section";
import Market from "@/components/home/market/market";
import Skills from "@/components/home/skills/skills-section";
import Community from "@/components/home/community/section";
import Footer from "@/components/home/footer/footer";

export default function Home() {
  return (
    <>
      <HeaderHome />
      <Journal />
      <Market />
      <Skills />
      <Community />
      <Footer />
    </>
  );
}
