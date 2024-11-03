import CourseTypeOne from "@/components/course/course-type-one";
import React from "react";

const DiplomaCard = () => {
  return (
    <div
      className="col-md-6 col-lg-4"
      data-aos-delay="150"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <CourseTypeOne data={course} image_location_path="02" />
    </div>
  );
};

export default DiplomaCard;
