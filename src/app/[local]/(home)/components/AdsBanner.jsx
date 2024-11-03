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
    <div
      style={{
        background: "#D8E4FF",
        height: !isMobile ? 370 : 320,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
      }}
    >
      Ads Area
    </div>
  );
};

export default AdsBanner;
