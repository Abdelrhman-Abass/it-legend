"use client"

import React, { useEffect, useState } from "react";
import { course_data } from "@/data";

import { Link } from "@/navigation";
import CourseDiploma from "@/components/course/CourseDiploma";

const DiplomaArea = ({ title }) => {
  return (
    <section >
      <div className="container">
        <h4 className="title">{title}</h4>
        <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
          <div className=" px-[60px]">
            {course_data.slice(0, 1).map((blog) => {
              const { id, img, title, date, course_desc, comment } = blog;
              return (
                <div
                  key={id}
                  className="edu-blog blog-style-list"
                  data-aos-delay="150"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <Link
                        href={`/diploma/10`}
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
                          href={`/diploma/10`}
                        >
                          {title}...
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
                      <p>{course_desc}</p>
                      <div className="read-more-btn">
                        <Link
                          href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}
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
            {course_data.slice(0, 1).map((course) => {
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
