"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { Link } from "@/navigation";

const AdBanner2 = ({ home_4 }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div
      className={`${
        home_4 ? "online-academy-cta-wrapper" : "university-cta-wrapper"
      } edu-cta-banner-area bg-image`}
    >
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
                <h4 className="title">
                  الأخطاء دي هي اللي بتخلي الناس تخسر وقت وفلوس في تعلم حاجات
                  غلط، مثل:
                </h4>
                <ul style={{ listStyle: "none" }}>
                  <li>عدم تحديد الهدف</li>
                  <li>تجاهل الأساسيات</li>
                  <li>عدم ممارسة ما تعلمته</li>
                  <li>اختيار مصادر غير موثوقة</li>
                </ul>
                <p className="title">
                  ده هو السبب الرئيسي اللي خلى فريقنا يصمم المسار بالأسلوب اللي
                  هتشوفه. احرص على اختيار الطريق الصحيح وتجنب العثرات الشائعة!
                </p>
                <Link href="/diploma-sales/1" className="edu-btn btn-secondary">
                  ابدأ الان <i className="icon-4"></i>
                </Link>
              </div>
            </div>
          </div>
          <ul className="shape-group">
            <motion.li
              className="shape-01 scene"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-10.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-02 scene"
              animate={{
                x: mouseReverse(25).x,
                y: mouseReverse(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-09.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-03 scene"
              animate={{
                x: mouseReverse(25).x,
                y: mouseReverse(25).y,
              }}
            >
              <img src="/assets/images/cta/shape-08.png" alt="shape" />
            </motion.li>
            <motion.li
              className="shape-04 scene"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
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

export default AdBanner2;
