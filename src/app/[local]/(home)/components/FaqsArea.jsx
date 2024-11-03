"use client";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const accordion_items = [
  {
    id: "collapseOne",
    show: true,
    title:
      "تجربة اذا كان السوال اطول من الازم يجب ان يوجد محازة وانا كل الكلام يظهر بشكل واضح بعيد عن الارو.",
    desc: "مدام وصلت للنقطة دي متكملش. بجد متكملش",
  },
  {
    id: "collapseTwo",
    show: false,
    title: "سياسه استرجاع الفلوس؟",
    desc: "هي دي الأسالة ولا بلاش, بص يعم لما اعرف بجد هبقي اقولك.",
  },
  {
    id: "collapseThree",
    show: false,
    title: "ابتدي باي دبلومه؟",
    desc: "في فديو علي قناة باشمهندس علي شارح النقطة دي بالتفصيل روح بص عليها  الاول وتعالي.",
  },
  {
    id: "collapseFour",
    show: false,
    title: "اي الفرق بين الدبلومات وبعض؟",
    desc: "الفرق في مسار التعلم نفسه, الي هو انت عايز تخصص في اي ف بالتالي تختار الدبلومة.",
  },
];

const FaqsArea = () => {
  const t = useTranslations("home.faqArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  return (
    <div className="edu-faq-area faq-style-5 section-gap-equal">
      <div className="container">
        <div className="row g-5 row--45">
          <div className="col-lg-6">
            <div className="edu-faq-gallery">
              <div
                className="faq-thumbnail thumbnail-1"
                data-aos-delay="50"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <img src="/assets/images/others/faq-5.webp" alt="Faq Images" />
              </div>
              <ul className="shape-group">
                <motion.li
                  className="shape-1 scene"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                  animate={{
                    x: mouseReverse(40).x,
                    y: mouseReverse(40).y,
                  }}
                >
                  <img
                    src="/assets/images/faq/shape-35.png"
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
                    src="/assets/images/faq/shape-36.png"
                    alt="Shape Images"
                  />
                </motion.li>
                <li className="shape-3">
                  <img
                    src="/assets/images/faq/shape-34.png"
                    alt="Shape Images"
                  />
                </li>
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
                <span className="pre-title">{t("faq")}</span>
                <h2 className="title">
                  {t("title")}{" "}
                  <span className="color-secondary">{t("faqs")}</span> <br />
                  {t("inMind")}
                </h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
              </div>
              <div className="faq-accordion" id="faq-accordion">
                <div className="accordion">
                  {accordion_items.map((item, i) => {
                    const { desc, id, show, title } = item;
                    return (
                      <div key={i} className="accordion-item">
                        <h5 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              show ? "" : "collapsed"
                            }`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${id}`}
                            aria-expanded={show ? "true" : "false"}
                          >
                            {title}
                          </button>
                        </h5>
                        <div
                          id={id}
                          className={`accordion-collapse collapse ${
                            show ? "show" : ""
                          }`}
                          data-bs-parent="#faq-accordion"
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
                    x: mouseReverse(40).x,
                    y: mouseReverse(40).y,
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
        {/* <div
          className="course-view-all"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <Link href="/" className="edu-btn">
            <i className="icon-4"></i> <span> {t("more")}</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default FaqsArea;
