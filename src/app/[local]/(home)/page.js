import React from "react";
import dynamic from 'next/dynamic';
import { Wrapper } from "@/layout";
import HeroArea from "./components/HeroArea";
import CounterArea from "./components/CounterArea";

// Dynamic imports for components that are below the fold or not immediately needed
const AboutArea = dynamic(() => import("./components/AboutArea"));
const FeaturesArea = dynamic(() => import("./components/FeaturesArea"));
const Banner = dynamic(() => import("./components/Banner"));
const VideoArea = dynamic(() => import("./components/VideoArea"));
const FreeDeploma = dynamic(() => import("./components/FreeDeploma"));
const AdsBanner = dynamic(() => import("./components/AdsBanner"));
const DiplomasArea = dynamic(() => import("./components/DiplomasArea"));
const AppArea = dynamic(() => import("./components/AppArea"));
const FaqsArea = dynamic(() => import("./components/FaqsArea"));


export default function Home() {
  return (
    <Wrapper>
      <HeroArea />
      <CounterArea />
      <AboutArea />
      <FeaturesArea />
      <Banner />
      <VideoArea />
      <FreeDeploma />
      <AdsBanner />
      <DiplomasArea />
      <AppArea />
      <FaqsArea />
    </Wrapper>
  );
}
