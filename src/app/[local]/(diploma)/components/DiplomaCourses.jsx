import CourseTwoArea from "@/components/courses/CourseTwoArea";
import React from "react";

const DiplomaCourses = () => {
  return (
    <>
      <CourseTwoArea coursePerView={3} title="مرحلة ما قبل التعلم" />
      <CourseTwoArea coursePerView={3} title="مرحلة التأسيس" />
      <CourseTwoArea coursePerView={3} title="التأهيل لسوق العمل" />
    </>
  );
};

export default DiplomaCourses;
