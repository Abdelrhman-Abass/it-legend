"use client";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";

const features_list = [
  "Expert Trainers",
  "Online Remote Learning",
  "Lifetime Access",
];

const AboutArea = () => {
  const t = useTranslations("home.aboutArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="gap-bottom-equal edu-about-area about-style-2">
      <div className="container edublink-animated-shape">
        <div className="row g-5 align-items-center">
          <div className="col-lg-7">
            <div className="about-image-gallery">
              <img
                className="main-img-1"
                src="/assets/images/about/about-03.webp"
                alt="About Image"
              />
              <div className="author-box">
                <div className="inner">
                  <div className="thumb">
                    <img
                      src="/assets/images/about/shape-03.png"
                      alt="Shape Image"
                    />
                  </div>
                  <div className="content">
                    <h4 className="title">{t("eng")}</h4>
                    <p>{t("experience")}</p>
                  </div>
                </div>
              </div>
              <div className="award-status bounce-slide">
                <div className="inner">
                  <div className="icon">
                    <i className="icon-30"></i>
                  </div>
                  <div className="content">
                    <h6 className="title">30k</h6>
                    <span className="subtitle">{t("student")}</span>
                  </div>
                </div>
              </div>
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(25).x,
                    y: mouseReverse(25).y,
                  }}
                >
                  <img src="/assets/images/about/shape-38.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-2 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseDirection(25).x,
                    y: mouseDirection(25).y,
                  }}
                >
                  <img src="/assets/images/about/shape-37.png" alt="Shape" />
                </motion.li>

                <motion.li
                  className="shape-3 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(25).x,
                    y: mouseReverse(25).y,
                  }}
                >
                  <img src="/assets/images/about/shape-04.png" alt="Shape" />
                </motion.li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="about-content">
              <div
                className="section-title section-left"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                {/* <span className="pre-title">About Us</span> */}
                <h3 className="title">
                  {t("title")}
                  {/* <span className="color-secondary">Distant learning</span> for */}
                  {/* Skill Development */}
                </h3>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>{t("paragraph")}</p>
              </div>
              {/* <ul
                className="features-list"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                {" "}
                {features_list.map((l, i) => (
                  <li key={i}>{l}</li>
                ))}{" "}
              </ul> */}
            </div>
          </div>
        </div>
        <ul className="shape-group">
          <motion.li
            className="shape-1 circle scene"
            data-aos-delay="500"
            data-aos="fade"
            data-aos-duration="200"
            animate={{
              x: mouseDirection(25).x,
              y: mouseDirection(25).y,
            }}
          >
            <span></span>
          </motion.li>
        </ul>
      </div>
    </div>
  );
};

export default AboutArea;
