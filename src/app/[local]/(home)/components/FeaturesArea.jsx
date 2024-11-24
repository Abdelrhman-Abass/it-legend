import { useTranslations } from "next-intl";
import React from "react";
// import { useState } from '../../../../../.next/static/chunks/main-app';

function Feature({ delay, color, icon, icon_class, title, course }) {

  const t = useTranslations("home.featuresArea");

  // const [translated , setTranslated]= useState("ar")

  // if (t("features") == "features") {
  //   setTranslated("en")
  // }


  return (
    <div
      className="col-lg-4 col-md-6"
      data-aos-delay={delay}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div
        className={`categorie-grid categorie-style-4 ${color} edublink-svg-animate`}
      >
        <div className="icon">
          <i className={`${icon} ${icon_class ? icon_class : ""}`}></i>
        </div>
        <div className="content">
          {/* <Link href="/course-style-1"> */}
          <h5 className="title">{title}</h5>
          {/* </Link> */}
          <span className="course-count">{course}</span>
        </div>
      </div>
    </div>
  );
}

const FeaturesArea = () => {
  const t = useTranslations("home.featuresArea");

  

  return (
    <div className="edu-categorie-area categorie-area-4 edu-section-gap">
      <div className="container">
        <div
          className="section-title section-center"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="title">
            {" "}
            {t("features")}{" "}
            <span
              className="color-secondary"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              ITLegend
            </span>{" "}
          </h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
          <p>
            {t("paragraphOne")} <br />
            {t("paragraphTwo")}
          </p>
        </div>

        <div className="row g-5">
          <Feature
            delay="50"
            color="color-primary-style"
            icon="icon-9"
            title={t("businessManagement")}
            course="معاك منتور بيساعدك في كل خطوة"
            
          />

          <Feature
            delay="100"
            color="color-secondary-style"
            icon="icon-9"
            icon_class="art-design"
            title={t("artsAndDesign")}
            course="بالتطبيق على مسائل ومشاريع حقيقية"
          />

          <Feature
            delay="150"
            color="color-extra01-style"
            icon="icon-11"
            icon_class="personal-development"
            title={t("personalDevelopment")}
            course="اتعلم بمتعة: نقاط، ميداليات، وتحديات يومية"
          />

          <Feature
            delay="50"
            color="color-tertiary-style"
            icon="icon-12"
            icon_class="health-fitness"
            title={t("healthAndFitness")}
            course="هتلاقي مسار التعلم اللي يناسبك"
          />

          <Feature
            delay="100"
            color="color-extra02-style"
            icon="icon-13"
            icon_class="data-science"
            title={t("dataScience")}
            course="فيديو، كتب، وملخصات"
          />

          <Feature
            delay="150"
            color="color-extra03-style"
            icon="icon-14"
            title={t("marketing")}
            course="لاب توب، موبايل، أو كمبيوتر بسهولة"
          />

          <Feature
            delay="50"
            color="color-extra04-style"
            icon="icon-15"
            title={t("businessAndFinance")}
            course="المحتوى مفتوح ترجع له أي وقت"
          />

          <Feature
            delay="100"
            color="color-extra05-style"
            icon="icon-16"
            icon_class="computer-science"
            title={t("computerScience")}
            course="عندك مشكلة؟ احنا معاك"
          />

          <Feature
            delay="150"
            color="color-extra06-style"
            icon="icon-17"
            icon_class="video-photography"
            title={t("videoAndPhotography")}
            course="شارك إنجازاتك واسأل زملائك"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturesArea;
