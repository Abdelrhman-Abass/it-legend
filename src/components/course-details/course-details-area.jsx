"use client";
import React, { useState } from "react";
import CourseDetailsSidebar from "../common/sidebar/course-details-sidebar";
import CommentFormCourse from "../forms/comment-form-course";
import SingleComment from "./single-comment";
import SingleProgressbar from "./single-progressbar";
import SingleAccordion from "./single-accordion";
import Test from "./test";

const CourseDetailsArea = ({ courseNodes ,course, isplayer = false }) => {
  console.log("from cours details area : " + courseNodes)
  return (
    <section
      style={{
        paddingTop: isplayer ? 0 : 80,
        marginBottom: -20,
        paddingBottom: 0,
      }}
      className="edu-section-gap course-details-area"
    >
      <div className="container">
        <div className="row row--30 reverse">
          <div className="col-lg-8">
            <Test course={course} />
          </div>
          {!isplayer && (
            <div className="col-lg-4">
              <CourseDetailsSidebar course={course} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDetailsArea;
