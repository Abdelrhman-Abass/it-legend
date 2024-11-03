"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useTranslations } from "next-intl";

const AppArea = () => {
  const t = useTranslations("home.ctaArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div
      style={{ paddingTop: "90px", paddingBottom: "30px" }}
      className="cta-area-1"
    >
      <h4
        className="title"
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        {t("titleOne")} <br />
        {t("titleTwo")}{" "}
      </h4>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8">
            <div className="home-four-cta edu-cta-box cta-style-3 bg-image bg-image--16">
              <div className="inner">
                <div className="content text-end">
                  <span
                    className="subtitle"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      display: "block",
                      textAlign: "end",
                    }}
                  >
                    Play Store
                  </span>
                  <h3 className="title">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.itlegend.itlegendapp"
                      target="_blank"
                    >
                      <img
                        style={{ margin: "6px 0" }}
                        src="https://itlegend.net/Website/assets/images/google-play.png"
                      />
                    </a>
                  </h3>
                </div>
                <div className="sparator">
                  <span>or</span>
                </div>
                <div className="content">
                  <span
                    className="subtitle"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      display: "block",
                      textAlign: "end",
                    }}
                  >
                    App store
                  </span>
                  <h3 className="title">
                    <a
                      href="https://apps.apple.com/us/app/it-legend/id6446231104"
                      target="_blank"
                    >
                      <img
                        style={{ marginTop: 6 }}
                        src="https://itlegend.net/Website/assets/images/ios.png"
                      />
                    </a>
                  </h3>
                </div>
              </div>
              <ul className="shape-group">
                <motion.li
                  className="shape-01 scene"
                  animate={{
                    x: mouseReverse(25).x,
                    y: mouseReverse(25).y,
                  }}
                >
                  <img src="/assets/images/cta/shape-06.png" alt="shape" />
                </motion.li>
                <motion.li
                  className="shape-02 scene"
                  animate={{
                    x: mouseDirection(25).x,
                    y: mouseDirection(25).y,
                  }}
                >
                  <img src="/assets/images/cta/shape-12.png" alt="shape" />
                </motion.li>
                <motion.li
                  className="shape-03 scene"
                  animate={{
                    x: mouseDirection(25).x,
                    y: mouseDirection(25).y,
                  }}
                >
                  <img src="/assets/images/cta/shape-04.png" alt="shape" />
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppArea;
