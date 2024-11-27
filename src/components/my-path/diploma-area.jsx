"use client"

import React, { useEffect, useState } from "react";
import { course_data } from "@/data";

import { Link } from "@/navigation";
import CourseDiploma from "@/components/course/CourseDiploma";

const DiplomaArea = ({ title ,data }) => {
  return (
    <section >
      <div className="container">
        <h4 className="title">{title}</h4>
        <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
          <div className=" px-[60px]">
            {data.slice(0, 1).map((cour, idx) => {
              return (
                <div
                  key={idx}
                  className="edu-blog blog-style-list"
                  data-aos-delay="150"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <Link
                        href={`/course-player/${data.courseId}`}
                      >
                        <img
                          src={"/assets/images/blog/blog-25.jpg"}
                          alt="Blog Images"
                        />
                      </Link>
                        <div className="time-top">
                          <span className="duration_1">
                            45%
                            {/* <i className="icon-61"></i> */}
                          </span>
                        </div>
                    </div>
                    <div className="content">
                      <h5 className="title">
                        <Link
                          href={`/course-player/${data.courseId}`}
                        >
                          {data.titleAr}...
                        </Link>
                      </h5>
                      {/* <ul className="blog-meta">
                        <li>
                          <i className="icon-27"></i>
                          {date}
                        </li>
                        <li>
                          <i className="icon-28"></i>Com {comment}
                        </li>
                      </ul> */}
                      <p>{data.shortDescriptionAr}</p>
                      <div className="read-more-btn">
                        <Link
                          href={`/course-player/${data.courseId}`}
                          className="edu-btn btn-border btn-medium"
                        >
                          ابدا الان <i className="icon-4"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="row g-5 mobile ">
            {data.map((course) => {
              return (
                <div
                  className="col-md-6 col-lg-4"
                  data-aos-delay="150"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  key={course.id}
                >
                  <CourseDiploma
                    bg="#f5f1eb"
                    my={true}
                    data={course}
                    image_location_path="02"
                  />
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
};

export default DiplomaArea;
