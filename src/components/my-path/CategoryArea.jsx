"use client";
import React from "react";
import {
  CertificateTwo,
  HybridDistanceProgramsTwo,
  SkilledLecturersTwo,
  UserTwo,
} from "@/svg";

const CategoryArea = () => {
  return (
    <div className="features-area-1">
      <div className="container">
        <FeatureBox
          delay={"50"}
          color={"color-primary-style"}
          icon={<SkilledLecturersTwo />}
          title={<span>مجموع درجاتي </span>}
          text={"914"}
        />

        <FeatureBox
          delay={"100"}
          color={"color-secondary-style"}
          icon={<HybridDistanceProgramsTwo />}
          title={<span>لقبي</span>}
          text={"تحت التدريب"}
        />

        <FeatureBox
          delay={"150"}
          color={"color-extra08-style"}
          icon={<CertificateTwo />}
          title={<span>الرتبة الحالية</span>}
          text="ممارس"
        />

        <FeatureBox
          delay={"150"}
          color={"color-extra05-style"}
          icon={<UserTwo />}
          title={<span>الرتبة السابقة</span>}
          text="مقاتل"
        />
      </div>
    </div>
  );
};

export default CategoryArea;

const FeatureBox = ({ delay, icon, color, title, text }) => {
  return (
    <div
      className="features-box"
      data-aos-delay={delay}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className={`icon ${color}`}>{icon}</div>
      <div className="content">
        <h5 className="title">{title}</h5>
        <p>{text}</p>
      </div>
    </div>
  );
};
