import React from "react";
import AboutArea from "@/components/diploma/AboutArea";
import AdBanner from "@/components/diploma/AdBanner";
import AdBanner2 from "@/components/diploma/AdBanner2";
import BlogMasonryArea from "@/components/diploma/BlogMasonryArea";
import BrandArea from "@/components/diploma/BrandArea";
import CategoryArea from "@/components/diploma/CategoryArea";
import HeroArea from "@/components/diploma/HeroArea";
import WhyChose from "@/components/diploma/WhyChose";
import VideoArea from "@/layout/Video";
import FaqArea from "@/components/diploma/FaqArea";

const data = {
  pre_title: "التكنولوجي",
  title: "التكنولوجي  المتستخدمه",
  text: "عندما تبدأ في تعلم مهارة جديدة، قد تشعر بالتوتر أو القلق. لكن لا تقلق بشأنها، فسوف تحترفها بكل سهولة مع الوقت والممارسة. كل خطوة صغيرة تقربك من هدفك، وستكتشف أنك تكتسب الثقة والمهارة تدريجياً. استمتع بالتعلم ولا تتردد في الغوص في التفاصيل",
  brands: [
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",    
  ],
};

const ErrorBoundaryWrapper = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error('Error in component:', error);
    return <div>Something went wrong in this component.</div>;
  }
};

const Page = () => {
  return (
    <>
      <ErrorBoundaryWrapper><HeroArea /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><VideoArea /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><WhyChose /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><AboutArea /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><BrandArea data={data} /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><CategoryArea /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><AdBanner /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><BlogMasonryArea showMore={true} /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><FaqArea /></ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper><AdBanner2 /></ErrorBoundaryWrapper>
    </>
  );
};

export default Page;
