"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { Link } from "@/navigation";
import Image from "next/image";
import SwitchThemeButton from "../common/SwitchThemeButton";

// import SwitchThemeButton from "../common/SwitchThemeButton";

const HeroArea = ({latest}) => {
  const [latestImages , setLatestImages] = useState()
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 1000]);

  useEffect(() => {
    console.log("latest from hero area:", latest);

    // Assuming `latest` is an object with a `latest` key containing the desired data as JSON.
    if (latest?.latest) {
      try {
        const parsedData = typeof latest.latest === "string" 
          ? JSON.parse(latest.latest) // Parse if it's a JSON string
          : latest.latest; // Use directly if it's already an object

        setLatestImages(parsedData);
        console.log("latest from hero area 2:", parsedData.courseId);
      } catch (error) {
        console.error("Failed to parse latest data:", error);
      }
    }
  }, [latest]);

  return (
    latest && (
    <section className="why-choose-area-3 edu-section-gap">
      <div className="container">
        <div className="row row--45 ">
          <div
            className=" section-title-flex flex section-title justify-content-center"
            data-aos-delay="150"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="lg:w-[450px]"
            >
              <div className="left-content flex flex-column items-center ">
                <h2 className=" title flex flex-column flex-wrap ">
                هيا بنا يا صديقي

                  <br />
                  <span className="color-secondary">
                استكمل اخر كورس 
                  </span>
                </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
              </div>
            </div>
            <div className="right-content w-full  lg:max-w-[330px] ">
              <div className="edu-team-grid team-style-3 ">
                <div className="inner ">
                  <div className="thumbnail-wrap ">
                    <div className="thumbnail lg:px-[50px]">
                      <Link
                        href={`/course-player/${latest.courseId}`}
                        className="flex justify-center items-center"
                      >
                        <img
                          // src='/assets/images/keep-going.jpg'
                          src={`https://www.itlegend.net/Content/Uploads/CoursesMedia/${latest.image}`}
                          alt="team images"
                          className="h-[100px] object-cover"
                          width={160}
                          height={100}
                        />
                      </Link>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul className="shape-group">
        <motion.li
          className="shape-1 scene"
          animate={{
            x: mouseReverse(40).x,
            y: mouseReverse(40).y,
          }}
        >
          <span></span>
        </motion.li>
        <motion.li
          className="shape-2 scene"
          animate={{
            x: mouseDirection(30).x,
            y: mouseDirection(30).y,
          }}
        >
          <img src="/assets/images/about/shape-13.png" alt="shape" />
        </motion.li>
        <li className="shape-3">
          <motion.img
            style={{ y }}
            src="/assets/images/faq/shape-12.png"
            alt="shape"
          />
        </li>
      </ul>
    </section>
    )
  );
};

export default HeroArea;
