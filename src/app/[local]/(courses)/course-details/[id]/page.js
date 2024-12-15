import CourseBreadcrumb from "@/components/breadcrumb/breadcrumb-5";
import CourseDetailsArea from "@/components/course-details/course-details-area";
import Testimonial from "@/components/diploma/Testimonial";
import Error from "@/components/event-grid/error";
import { course_data } from "@/data";
import { CoursePlayerNode ,CourseFeatureDetails } from "@/hooks/PlayerHandler";

import React from "react";
const course = course_data[0];

const page = async ({params}) => {
  
  const courseNode = await CoursePlayerNode(params.id)
  const features = await CourseFeatureDetails(params.id)
  return (
    <>
    {courseNode ? (
      <>
      <CourseBreadcrumb
        course={course}
        subtitle="دورة احتراف تصميم التطبيقات"
        style={{paddingTop: 120}}
      />
      <CourseDetailsArea course={course} courseFeature={features.data} courseNodes={courseNode.data} />
      </>
    ):(
      <Error my={false}/>
    )}
      <Testimonial about_p_2={true} />
    </>
  );
};

export default page;
