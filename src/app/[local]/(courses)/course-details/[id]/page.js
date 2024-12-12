import CourseBreadcrumb from "@/components/breadcrumb/breadcrumb-5";
import CourseDetailsArea from "@/components/course-details/course-details-area";
import Testimonial from "@/components/diploma/Testimonial";
import { course_data } from "@/data";
import { CoursePlayerNode } from "@/hooks/PlayerHandler";

import React from "react";
const course = course_data[0];
const page = async ({params}) => {
  const courseNode = await CoursePlayerNode(params.id)
console.log("course from CourseDetails : " + courseNode.data)
  return (
    <>
      <CourseBreadcrumb
        course={course}
        subtitle="دورة احتراف تصميم التطبيقات"
        style={{paddingTop: 120}}
      />
      <CourseDetailsArea course={course} courseNodes={courseNode.data} />
      <Testimonial about_p_2={true} />
    </>
  );
};

export default page;
