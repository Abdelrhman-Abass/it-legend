"use client";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";

const Banner = () => {
  const t = useTranslations("home.videoArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="edu-cta-banner-area home-one-cta-wrapper bg-image">
      <div className="container">
        <div className="edu-cta-banner">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div
                className="section-title section-center"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <h2 className="title">
                  <span className="color-secondary">{t("success")}</span>{" "}
                  {t("title")}
                  <br /> {t("paragraph")}
                </h2>
                <a className="edu-btn">
                  <i className="icon-41"></i>
                  {t("watch")}
                </a>
              </div>
            </div>
          </div>
          <ul className="shape-group">
            <motion.li
              className="shape-01 scene"
              animate={{
                x: mouseReverse(30).x,
                y: mouseReverse(30).y,
              }}
            >
              <img src="/assets/images/cta/shape-10.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-02 scene"
              animate={{
                x: mouseDirection(30).x,
                y: mouseDirection(30).y,
              }}
            >
              <img src="/assets/images/cta/shape-09.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-03 scene"
              animate={{
                x: mouseDirection(30).x,
                y: mouseDirection(30).y,
              }}
            >
              <img src="/assets/images/cta/shape-08.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-04 scene"
              animate={{
                x: mouseReverse(30).x,
                y: mouseReverse(30).y,
              }}
            >
              <img src="/assets/images/about/shape-13.png" alt="shape" />
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
