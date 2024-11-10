"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";


const features = [
  {
    color: "color-secondary-style",
    icon: "icon-81",
    title: "برنامج حصري",
    text: "يعكس أحدث الابتكارات والتوجهات في عالم التكنولوجيا، حيث يسلط الضوء على المنتجات الجديدة ويقدم تحليلات عميقة للاتجاهات الحالية.",
  },
  {
    color: "color-primary-style",
    icon: "icon-82",
    title: "تدريبات اونلاين",
    text: "يمكن للمتدربين الوصول إلى محتوى متنوع في أي وقت ومن أي مكان. تشمل هذه التدريبات مجموعة واسعة من المهارات.",
  },
  {
    color: "color-extra05-style",
    icon: "icon-83",
    title: "تحديث المحتوي بشكل دوري",
    text: "يساهم في تقديم معلومات جديدة ومحدثة للجمهور. هذا التحديث يعزز من مصداقية المصادر ويحفز التفاعل مع المتابعين.",
  },
];

const WhyChose = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  return (
    <div className="why-choose-area-1 section-gap-equal">
      <div className="container">
        <div className="row g-5 row--45">
          <div className="col-lg-6">
            <div className="why-choose-content">
              <div
                className="section-title section-left"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="pre-title pre-textsecondary">لي تختاره؟</span>
                <h2 className="title">مين ياخد المسار ده؟</h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
                <p>
                  لو عايز تبدأ كاريرك في البرمجه ومش عارف تختار اي او حتي تبدأ ب
                  اي الكورس دا هيحطك ع اول الطريق لحد متلاقي اول وظيفة
                </p>
              </div>
              <div
                className="features-list"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                {features.map((item, i) => {
                  const { color, icon, text, title } = item;
                  return (
                    <div key={i} className={`features-box ${color}`}>
                      <div className="icon">
                        <i className={icon}></i>
                      </div>
                      <div className="content">
                        <h5 className="title">{title}</h5>
                        <p>{text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="why-choose-gallery">
              <div className="gallery-thumbnail">
                <div className="thumbnail thumbnail-1">
                  <Image
                    src="/assets/images/others/why-choose-01.webp"
                    alt="Why Choose"
                    width={370}
                    height={470}
                    data-aos-delay="60"
                data-aos="fade-right"
                data-aos-duration="900"
                  />
                </div>
                <motion.div className="thumbnail thumbnail-2" style={{y,
                    position: 'absolute',
                    right: '-10px',  // Adjust this value to move more/less to the right
                    top: '105%',
                    }}>
                  <Image
                    src="/assets/images/others/why-choose-02.webp"
                    alt="Why Choose"
                    width={300}
                    height={370}
                    data-aos-delay="60"
                  data-aos="fade-up"
                data-aos-duration="900"
                  />
                </motion.div>
              </div>
              <ul className="shape-group">
                <li
                  className="shape-1"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                >
                  <Image
                    src="/assets/images/about/shape-14.png"
                    alt="Shape Images"
                    width={370}
                    height={470}
                    
                  />
                </li>
                <li
                  className="shape-2"
                  data-aos-delay="500"
                  data-aos="fade"
                  data-aos-duration="200"
                >
                  <Image
                    src="/assets/images/about/shape-10.png"
                    alt="Shape Images"
                    width={300}
                    height={370}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChose;
