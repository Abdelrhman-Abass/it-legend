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
    <div className={`${isMobile && "container"} mt-[80px]`}>

    <div 
      style={{
        background: "#D8E4FF",
        height: !isMobile ? 120 : 300,
        // width: isMobile && 100 ,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
      }}
    >
      Ads Area
    </div>
    </div>
  );
};

export default AdsBanner;
