"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";

const accordion_items = [
  {
    id: "collapseOne",
    show: true,
    title: "ما هي الأخطاء الشائعة عند تعلم تطبيقات الويب؟",
    desc: "يتجاهل الكثير من المتعلمين الأساسيات مثل HTML وCSS، مما يؤثر على فهمهم للمفاهيم المتقدمة.",
  },
  {
    id: "collapseTwo",
    show: false,
    title: "كيف أختار لغة البرمجة المناسبة لتطبيقات الويب؟",
    desc: "يخطئ البعض في اختيار لغة بناءً على الاتجاهات دون مراعاة الأهداف الشخصية ومتطلبات السوق.",
  },
  {
    id: "collapseThree",
    show: false,
    title: "ما هي أفضل المصادر لتعلم تطبيقات الويب؟",
    desc: "يفشل العديد في الاستفادة من الموارد المجانية والمتاحة عبر الإنترنت، مثل الدورات التعليمية والفيديوهات.",
  },
];

const FaqArea = () => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [activeId, setActiveId] = React.useState('collapseOne');

  return (
    <div className="edu-faq-area faq-style-1">
      <div className="container">
        <div className="row g-5 row--45">
          <div className="col-lg-6">
            <div className="edu-faq-gallery">
              <div className="row g-5">
                <div
                  className="col-6"
                  data-aos-delay="50"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <div className="faq-thumbnail thumbnail-1">
                    <img src="/assets/images/faq/faq-01.jpg" alt="Faq Images" />
                  </div>
                </div>
                <div
                  className="col-6"
                  data-aos-delay="100"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  <div className="faq-thumbnail thumbnail-2">
                    <img src="/assets/images/faq/faq-02.jpg" alt="Faq Images" />
                  </div>
                </div>
                <div
                  className="col-6"
                  data-aos-delay="50"
                  data-aos="fade-right"
                  data-aos-duration="800"
                >
                  <div className="faq-thumbnail thumbnail-3">
                    <img src="/assets/images/faq/faq-03.jpg" alt="Faq Images" />
                  </div>
                </div>
                <div
                  className="col-6"
                  data-aos-delay="100"
                  data-aos="fade-left"
                  data-aos-duration="800"
                >
                  <div className="faq-thumbnail thumbnail-4">
                    <img
                      src="/assets/images/faq/faq-04.webp"
                      alt="Faq Images"
                    />
                  </div>
                </div>
              </div>

              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene shape-light"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img
                    src="/assets/images/faq/shape-02.png"
                    alt="Shape Images"
                  />
                </motion.li>
                <motion.li
                  className="shape-1 scene shape-dark"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img
                    src="/assets/images/faq/dark-shape-02.png"
                    alt="Shape Images"
                  />
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
                  <img
                    src="/assets/images/faq/shape-03.png"
                    alt="Shape Images"
                  />
                </motion.li>
                <motion.li
                  className="shape-3 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseDirection(30).x,
                    y: mouseDirection(30).y,
                  }}
                >
                  <img
                    src="/assets/images/faq/shape-04.png"
                    alt="Shape Images"
                  />
                </motion.li>
                <motion.li
                  className="shape-4 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(30).x,
                    y: mouseReverse(30).y,
                  }}
                >
                  <img
                    src="/assets/images/faq/shape-05.png"
                    alt="Shape Images"
                  />
                </motion.li>
              </ul>
            </div>
          </div>
          <div
            className="col-lg-6"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="edu-faq-content">
              <div className="section-title section-left">
                {/* <span className="pre-title">FAQ’s</span> */}
                <h2 className="title">
                  الأخطاء
                  <span className="color-secondary">الشائعة</span>
                </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
              </div>
              <div className="faq-accordion" id="faq-accordion">
                <div className="accordion">
                  {accordion_items.map((item, i) => {
                    const { desc, id, title } = item;
                    const isActive = activeId === id;
                    
                    return (
                      <div key={i} className="accordion-item">
                        <h5 className="accordion-header">
                          <button
                            className={`accordion-button ${isActive ? "" : "collapsed"}`}
                            type="button"
                            onClick={() => setActiveId(isActive ? '' : id)}
                          >
                            {title}
                          </button>
                        </h5>
                        <div
                          style={{
                            maxHeight: isActive ? '1000px' : '0',
                            overflow: 'hidden',
                            transition: 'max-height 0.3s ease-in-out'
                          }}
                        >
                          <div className="accordion-body">
                            <p>{desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
                  <img
                    src="/assets/images/about/shape-02.png"
                    alt="Shape Images"
                  />
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
                  <span></span>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArea;
