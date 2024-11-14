"use client";
import React from "react";
import { useState } from "react";
import { course_data } from "@/data";
import CourseTypeSix from "../course/course-type-six";
import SortingArea from "../course-filter/sorting-area";

const CourseTwoArea = ({
  my = false,
  recommend = false,
  title = null,
  coursePerView = 6,
}) => {
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);

  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 3);
  };

  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
      <div className="container">
        {title && <h3 className="title">{title}</h3>}
        {/* <SortingArea
          course_items={course_data}
          num={courses?.slice(0, next)?.length}
          setCourses={setCourses}
          courses={courses}
        /> */}
        <div className="row g-5 ">
          {courses?.slice(0, next)?.map((course, idx) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <CourseTypeSix
                my={my}
                title={title}
                data={course}
                classes="course-box-shadow"
                idx={idx}
              />
            </div>
          ))}
        </div>
        {/* {next < courses.length && (
          <div
            onClick={handleLoadData}
            className="load-more-btn"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <a className="edu-btn" style={{ cursor: "pointer" }}>
              المزيد <i className="icon-56"></i>
            </a>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CourseTwoArea;
