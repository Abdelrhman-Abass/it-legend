import React from "react";
import { Wrapper } from "@/layout";
import HeroArea from "./components/HeroArea";
import CounterArea from "./components/CounterArea";
import AboutArea from "./components/AboutArea";
import FeaturesArea from "./components/FeaturesArea";
import Banner from "./components/Banner";
import VideoArea from "./components/VideoArea";
import FreeDeploma from "./components/FreeDeploma";
import AdsBanner from "./components/AdsBanner";
import DiplomasArea from "./components/DiplomasArea";
import AppArea from "./components/AppArea";
import FaqsArea from "./components/FaqsArea";

export const metadata = {
  title: "IT Legend",
  description: "IT Legend",
};

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
