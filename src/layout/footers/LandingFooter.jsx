"use client";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";

const LandingFooter = () => {
  const t = useTranslations("footer");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    const htmlElement = document.documentElement; // or document.querySelector('html')
    const currentDirection = htmlElement.dir
    setDirection(currentDirection);
  }, [direction]);

  return (
    <div className="pv-cta-area bg-image">
      <div className="container">
        <div className="cta-content">
          <span
            className="subtitle"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {t("title")}
          </span>
          <h2
            className="title"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            {t("paragraphOne")}
            <br />
            {t("paragraphTwo")}
          </h2>
          <div className="button-group">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              className="edu-btn"
            // data-aos-delay="400"
            // data-aos="fade-left"
            // data-aos-duration="1000"
            >
              {direction == "rtl" ? (
                <ArrowLeft className="d-inline h-[20px]" />
              ) : (
                <i className="icon-4"></i>
              )}
              {t("whatsapp")}
            </a>
            <a
              href="tel:+1234567890"
              target="_blank"
              className="edu-btn btn-bg-white"
            // data-aos-delay="400"
            // data-aos="fade-right"
            // data-aos-duration="1000"
            >
              {direction == "rtl" ? (
                <ArrowLeft className="d-inline h-[20px]" />
              ) : (
                <i className="icon-4"></i>
              )}
              {t("call")}
            </a>
          </div>
        </div>
      </div>

      <ul className="shape-group">
        <motion.li
          className="shape-1 scene"
          data-aos-delay="500"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseReverse(30).x,
            y: mouseReverse(30).y,
          }}
        >
          <img src="/assets/images/counterup/shape-02.png" alt="shape" />
        </motion.li>

        <li
          className="shape-2"
          data-aos-delay="500"
          data-aos="fade"
          data-aos-duration="1000"
        >
          <img
            className="rotateit"
            src="/assets/images/about/shape-35.png"
            alt="shape"
          />
        </li>

        <motion.li
          className="shape-3 scene"
          data-aos-delay="500"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseDirection(30).x,
            y: mouseDirection(30).y,
          }}
        >
          <img src="/assets/images/about/shape-07.png" alt="shape" />
        </motion.li>

        <motion.li
          className="shape-4 scene"
          data-aos-delay="500"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseReverse(30).x,
            y: mouseReverse(30).y,
          }}
        >
          <span className="d-block"></span>
        </motion.li>
      </ul>
    </div>
  );
};

export default LandingFooter;
