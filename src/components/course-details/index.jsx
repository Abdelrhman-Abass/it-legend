"use client";
import React from "react";
import CourseBreadcrumb from "../breadcrumb/breadcrumb-5";
import CourseDetailsArea from "./course-details-area";

const index = ({ course }) => {
  return (
    <div className="sticky-header">
      <div id="main-wrapper" className="main-wrapper">
        <CourseBreadcrumb course={course} subtitle="Course Details" />
        <CourseDetailsArea course={course} />
      </div>
    </div>
  );
};

export default index;
