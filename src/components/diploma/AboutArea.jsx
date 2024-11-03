"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";

const lists = ["مطور مواقع", "مصمم تجربة المستخدم", "مطور تطبيقات موبايل"];
const instructorLists = ["مطور مواقع", "درب اكثر من 5000 متدرب", "خبرة 15 سنه"];

const AboutArea = ({ isInstructor = false }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="edu-section-gap edu-about-area about-style-4">
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
                <img
                  src="/assets/images/about/about-06.webp"
                  alt="About Image"
                />
              </div>
              <img
                className="main-img-2"
                src="/assets/images/about/about-07.webp"
                alt="About Image"
                data-aos-delay="60"
                data-aos="fade-up"
                data-aos-duration="900"
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
                <span className="pre-title">
                  {isInstructor ? "مين بيقدمها" : "بعد التعلم"}
                </span>
                <h2 className="title">
                  {isInstructor
                    ? "المهندس علي شاهين"
                    : " ايه الوظائف اللي تقدر تشتغلها بالمسار ده؟"}
                </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>
                  {isInstructor
                    ? "خبرة 15 سنة في مجال البرمجة وحاصل علي شهادات في مجال البرمجة والتدريب وحاصل علي ماجستير في علوم الحاسب."
                    : " يمكنك الالتحاق بوظائف كثيرة وتحت العديد من المسميات ولاكن اليك ابرزها"}
                </p>
              </div>
              <ul className="features-list">
                {isInstructor
                  ? instructorLists.map((l, i) => <li key={i}>{l}</li>)
                  : lists.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
              {/* <Link href="/about-1" className="edu-btn">
                Get Start Today <i className="icon-4"></i>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutArea;
