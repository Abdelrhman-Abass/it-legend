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
      "ازاي ابدأ في مجال البرمجة",
    desc: "أفضل بداية ليك هي الدبلومة المجانية هتمهدلك الطريق وهتساعدك تفهم الأساسيات، بعد كدا تقدر تختار التخصص المناسب وتبدأ التراك الخاص بيه.",
  },
  {
    id: "collapseTwo",
    show: false,
    title: "ازاي اختار التخصص المناسب ليا",
    desc: "لو محتار في اختيار التخصص، اطمن  بنجهزلك أداة هتساعدك تحدد تخصصك بسهولة ومش هتخرج من هنا غير وانت عارف هتعمل ايه",
  },
  {
    id: "collapseThree",
    show: false,
    title: "هل لازم أكون خريج كلية حاسبات عشان اتعلم برمجة",
    desc: "لو انت مهتم بالمجال وحابب تتعلمه فالشهادة الجامعية مش عائق، أيا كانت كليتك تقدر تتعلم برمجة وتتفوق فيها زي طلاب كتير في IT LEGEND",
  },
  {
    id: "collapseFour",
    show: false,
    title: "هل في شهادة معتمدة",
    desc: "مجرد ما تنتهي من الكورس بيكون معاك شهادة من IT LEGEND، وكمان تقدر تحصل على شهادة معتمدة من أكاديمية لندن برسوم بسيطة",
  },
];

const FaqsArea = () => {
  const t = useTranslations("home.faqArea");
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [activeId, setActiveId] = React.useState('collapseOne');

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
