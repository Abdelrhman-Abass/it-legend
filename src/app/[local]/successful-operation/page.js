"use client";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { Link } from "@/navigation";

const Page = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // Only run this code in the browser
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {width > 0 && height > 0 && <Confetti width={width} height={height} />}
      <section className="section-gap-equal error-page-area">
        <div className="container">
          <div className="edu-error">
            <div className="thumbnail">
              <img
                src="/assets/successful.png"
                alt="successful"
                style={{ maxHeight: "35vh" }}
              />
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-25.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-2 scene"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-15.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-3 scene"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img src="/assets/images/about/shape-13.png" alt="Shape" />
                </motion.li>
                <motion.li
                  className="shape-4 scene"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img
                    src="/assets/images/counterup/shape-02.png"
                    alt="Shape"
                  />
                </motion.li>
              </ul>
            </div>
            <div className="content">
              <h2 className="title">مبارك</h2>
              <h4 className="subtitle">لقد حصلت علي الدورة بنجاح</h4>
              <Link href="/learning-path" className="edu-btn">
                <i className="icon-west"></i>هيا بنا لنبدأ العمل يا صديقي
              </Link>
            </div>
          </div>
        </div>
        <ul className="shape-group">
          <li className="shape-1">
            <img src="/assets/images/others/map-shape-2.png" alt="Shape" />
          </li>
        </ul>
      </section>
    </>
  );
};

export default Page;
