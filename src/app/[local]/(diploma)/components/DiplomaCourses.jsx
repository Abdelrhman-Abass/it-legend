import CourseElevenArea from "@/components/courses/CourseElvenArea";
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import DiplomaSales from "@/components/diploma/DiplomaSales";
import RecommendedCourses from "@/components/my-path/RecomendedCourses";
import React from "react";

const DiplomaCourses = () => {
  return (
    <>
      <DiplomaSales coursePerView={3} title="مرحلة ما قبل التعلم" />
      <DiplomaSales coursePerView={3} title="مرحلة التأسيس" />
      <DiplomaSales coursePerView={3} title="التأهيل لسوق العمل" />
    </>
  );
};

export default DiplomaCourses;
