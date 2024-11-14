"use client";
import React, { useEffect, useState } from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

import { useTheme } from "next-themes";
const CountDown = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="timer">
      <div className="container">
        <div
          className="flip"
          data-aos-delay="150"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          {isMounted && (
            <FlipClockCountdown
              dir="ltr"
              to={new Date().getTime() + 32 * 3600 * 1000 + 5000}
            />
          )}
        </div>
        <div className="edu-cta-banner mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="section-title section-center"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <h2 className="title">
                  <span className="color-secondary">تعالى</span> أقولك ملخص
                  الدبلومة
                  <br /> دي
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
