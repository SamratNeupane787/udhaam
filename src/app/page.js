import Image from "next/image";
import { TypewriterEffectDemo } from "./components/Herosection";
import Featured from "./components/Featured";
import Footer from "./components/Footer";
import TrendingStartups from "./components/Trending";

export default function Home() {
  return <><TypewriterEffectDemo/><Featured/><TrendingStartups/><Footer/></>;
}
