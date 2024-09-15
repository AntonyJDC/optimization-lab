import Image from "next/image";
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import TitleSection from "./components/TitleSection";
import Optimization from "./components/Optimization";

export default function Home() {
  return (
    <div>
      <div className="scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl py-16 md:py-36">
        <Hero/>
      </div>
      <div className="scroll-m-20 w-full mx-auto container">
        <Cards/>
      </div>
      <div className="scroll-m-20 w-full mx-auto container max-w-screen py-24 md:py-24">
        <TitleSection id="optimization">Optimization Problem</TitleSection>
        <Optimization/>
      </div>
    </div>
  );
}
