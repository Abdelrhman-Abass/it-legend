"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";

const HeroArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="hero-banner hero-style-4 bg-image">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="banner-content">
              <h1
                className="title"
                data-aos-delay="100"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                دورة احتراف تصميم التطبيقات
              </h1>
              <p
                data-aos-delay="200"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                تتكون الدورة من ثلاث مستويات. يأخذك من الصفر ثم يضعك علي اول .
                طريق احتراف تصميم التطبيقات
                <br />
                تعالى أقولك ايه المسار ده بيتكون من إيه، فايدته ايه ايه الوظايف
                اللي بيأهلك ليها
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-gallery">
        <Thumbnail num="1" slide="slide-up" img="girl-4.jpg" />
        <Thumbnail num="2" slide="slide-down" img="girl-5.jpg" />
        <Thumbnail num="3" slide="slide-right" img="girl-6.jpg" />
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
              <span className="subtitle">لأي استفسار</span>
              <h4 className="title" dir="ltr">
                <a href="tel:+0123456789">+20 106 736 238</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-down-btn">
        <a className="scroll-btn" href="#about">
          <i className="icon-41"></i>
        </a>
      </div>
      <ul className="shape-group">
        <motion.li
          className="shape-1 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseReverse(25).x,
            y: mouseReverse(25).y,
          }}
        >
          <img src="/assets/images/others/shape-17.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-2 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseDirection(25).x,
            y: mouseDirection(25).y,
          }}
        >
          <img src="/assets/images/banner/shape-03.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-3 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseReverse(25).x,
            y: mouseReverse(25).y,
          }}
        >
          <img src="/assets/images/faq/shape-09.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-4 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseDirection(25).x,
            y: mouseDirection(25).y,
          }}
        >
          <img src="/assets/images/others/shape-15.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-5 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseDirection(25).x,
            y: mouseDirection(25).y,
          }}
        >
          <img src="/assets/images/others/shape-16.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-6 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseReverse(25).x,
            y: mouseReverse(25).y,
          }}
        >
          <img src="/assets/images/faq/shape-12.png" alt="Shape" />
        </motion.li>

        <motion.li
          className="shape-7 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
          animate={{
            x: mouseDirection(25).x,
            y: mouseDirection(25).y,
          }}
        >
          <img src="/assets/images/others/shape-17.png" alt="Shape" />
        </motion.li>

        <li
          className="shape-8 scene"
          data-aos-delay="1000"
          data-aos="fade"
          data-aos-duration="1000"
        >
          <span></span>
        </li>
      </ul>
    </div>
  );
};

export default HeroArea;

// Thumbnail
const Thumbnail = ({ num, slide, img }) => {
  return (
    <div
      className={`thumbnail thumbnail-${num}`}
      data-aos-delay="50"
      data-aos={slide}
      data-aos-duration="1000"
    >
      <img src={`/assets/images/banner/${img}`} alt="Girl Image" />
    </div>
  );
};
