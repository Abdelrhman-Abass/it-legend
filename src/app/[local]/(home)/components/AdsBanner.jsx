"use client";
import React, { useEffect, useState } from "react";

const AdsBanner = () => {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`mx-[15px] lg:mx-[0] mt-[80px] `}>

    <div 
      className={`bg-[#D8E4FF] lg:h-[120px] h-[300px] flex items-center justify-center font-semibold`}
    >
      Ads Area
    </div>
    </div>
  );
};

export default AdsBanner;
