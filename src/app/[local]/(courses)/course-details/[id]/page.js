import CourseBreadcrumb from "@/components/breadcrumb/breadcrumb-5";
import CourseDetailsArea from "@/components/course-details/course-details-area";
import Testimonial from "@/components/diploma/Testimonial";
import { course_data } from "@/data";
import React from "react";
const course = course_data[0];
const page = () => {
  return (
    <>
      <CourseBreadcrumb
        course={course}
        subtitle="دورة احتراف تصميم التطبيقات"
        style={{paddingTop: 120}}
      />
      <CourseDetailsArea course={course} />
      <Testimonial about_p_2={true} />
    </>
  );
};

export default page;
