"use client";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Moon, Sun } from "lucide-react";

import Image from "next/image";

const HeroArea = () => {
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    const htmlElement = document.documentElement; // or document.querySelector('html')
    const currentDirection = htmlElement.dir
    setDirection(currentDirection);
  }, [direction]);


  const t = useTranslations("home.heroArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="hero-banner hero-style-2 bg-image">

      <div className="container">
        <div className="row row--45 align-items-center">
          <div className="col-lg-6">
            <div className="banner-content">
              <h1
                className="title"
                data-aos-delay="100"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {t("platform")}{" "}
                <span
                  className="color-secondary"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  ITLegend
                </span>{" "}
                {t("educational")}
              </h1>
              <p
                data-aos-delay="200"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                {t("paragraph")}
                <br />
                <strong> {t("supervision")}</strong>
              </p>
              <div
                className="banner-btn"
                data-aos-delay="400"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <a href="#paths" className="edu-btn">
                  {direction == "rtl" ? (
                    <ArrowLeft className="d-inline h-[20px]" />
                  ) : (
                    <i className="icon-4"></i>
                  )}
                  {t("paths")}
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="banner-gallery">
              <div
                className="thumbnail thumbnail-1"
                data-aos-delay="500"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <Image src="/assets/images/banner/girl-2.webp" loading="lazy" alt="Girl Image" width={270} height={300} />
              </div>
              <div
                className="thumbnail thumbnail-2"
                data-aos-delay="500"
                data-aos="fade-down"
                data-aos-duration="1000"
              >
                <Image src="/assets/images/banner/man-1.webp" alt="Man Image" loading="lazy" width={240} height={370} />
              </div>
              <div
                className="online-support"
                data-aos-delay="600"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="inner">
                  <div className="icon">
                    <i className="icon-29"></i>
                  </div>
                  <div className="content">
                    <span className="subtitle">{t("communicate")}</span>
                    <h4 className="title">
                      <a href="tel:+0123456789" dir="ltr">
                        +012 (345) 6789
                      </a>
                    </h4>
                  </div>
                </div>
              </div>
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene shape-light"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/faq/shape-13.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-1 scene shape-dark"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/faq/dark-shape-13.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-2 scene"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseDirection(50).x,
                    y: mouseDirection(50).y,
                  }}
                >
                  <img src="/assets/images/faq/shape-12.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-3 scene shape-light"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/faq/shape-09.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-3 scene shape-dark"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/faq/dark-shape-09.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-4 scene"
                  data-aos-delay="1000"
                  data-aos="fade"
                  data-aos-duration="1000"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img src="/assets/images/cta/shape-04.png" alt="Shape" />
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroArea;
