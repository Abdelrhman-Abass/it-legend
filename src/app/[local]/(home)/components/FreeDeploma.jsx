"use client";
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const lists = ["featureOne", "featureTwo", "featureThree"];

const FreeDeploma = () => {
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    const htmlElement = document.documentElement; // or document.querySelector('html')
    const currentDirection = htmlElement.dir
    setDirection(currentDirection);
  }, [direction]);

  const t = useTranslations("home.freeDeplomaArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div
      id="freeDeploma"
      className="edu-section-gap edu-about-area about-style-4"
    >
      
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div className="about-image-gallery">
              <div
                className="main-img-1"
                data-aos-delay="50"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <Image
                  src="/assets/images/about/about-06.webp"
                  alt="About Image"
                  width={350}
                  height={350}
                  loading="lazy"
                />
              </div>
              <Image
                className="main-img-2"
                src="/assets/images/about/about-07.webp"
                alt="About Image"
                data-aos-delay="60"
                data-aos="fade-up"
                data-aos-duration="900"
                width={230}
                height={230}
                loading="lazy"
              />
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-2 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-39.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-3 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-07.png" alt="Shape" />
                </motion.li>
                <li
                  className="shape-4"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                >
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos-delay="50"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="about-content">
              <div className="section-title section-left">
                <span className="pre-title">{t("FreeDeploma")}</span>
                <h3 className="title">{t("title")} </h3>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>{t("paragraph")}</p>
              </div>
              <ul className="features-list">
                {" "}
                {lists.map((l, i) => (
                  <li key={i}>{t(l)}</li>
                ))}{" "}
              </ul>
              <Link href="/diploma-details/1" className="edu-btn">
              {direction == "rtl" ? (
                    <ArrowLeft className="d-inline h-[20px]" />
                  ) : (
                    <i className="icon-4"></i>
                  )}
                {t("getIt")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeDeploma;
