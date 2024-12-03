"use client"
import React, { useState, useEffect } from "react";
import { course_data } from "@/data";
import { Link } from "@/navigation";
import CourseDiploma from "@/components/course/CourseDiploma";
// import CourseDiploma from "../course/CourseDiploma";
import { useDispatch, useSelector } from "react-redux";
import { UserDiploma } from "../../store/features/diploma-slice";
import {
  selectDiploma,
  selectDiplomaStatus,
  selectDiplomaError,
} from "../../store/features/diploma-slice";
import { Progress } from 'antd';


const ListArea = ({ title }) => {
  const [cour, setCour] = useState([]);

  const dispatch = useDispatch();

  const diploma = useSelector(selectDiploma) || []; // Ensure it's always an array
  const status = useSelector(selectDiplomaStatus);
  const error = useSelector(selectDiplomaError);
  
  useEffect(() => {
    dispatch(UserDiploma());
  }, [dispatch]);

  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === "succeeded") {
      console.log("Courses Data:", diploma);

    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, diploma, error]);

  return (
    <section >
      <div className="container">
        <div
          className="section-title section-center"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="title">دبلوماتي</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>
        <h4 className="title">{title}</h4>
        <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
          <div className=" px-[60px]">
            {status === "loading" && (
              <p className="loading-text">Loading...</p>
            )}
            {status === "succeeded" && diploma.map((course, idx) => (
              <div
                key={idx}
                className="edu-blog blog-style-list"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="inner">
                  <div className="thumbnail">
                    <Link href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}>
                      <img
                        src={`https://www.itlegend.net/Content/Uploads/CategoryMedia/${course.image}`}
                        // src={`/assets/images/course/course-01/course-01.jpg`}
                        alt="Blog Images"
                        className="lg:w-[280px]"
                      />
                    </Link>
                    <div className="time-top">
                      <span className="duration_1">
                      <Progress type="circle"  percent={course?.progressPercentage ? course.progressPercentage.toFixed(0) : 0}  size={45} status="exception" format={(percent) => `${percent}%`} />
                      {/* {course?.progressPercentage ? `${course.progressPercentage.toFixed(0)}%` : "0%"} */}
                      </span>
                    </div>
                  </div>
                  <div className="content">
                    <h5 className="title">
                      <Link href={`/diploma/${course.categoryId}`}>
                        {course.titleAr}...
                      </Link>
                    </h5>
                    <p>{course.shortDescriptionAr ? course.shortDescriptionAr : "No description available"}</p>
                    <div className="read-more-btn">
                      <Link
                        href={`/diploma/${course.categoryId}`}
                        className="edu-btn btn-border btn-medium"
                      >
                        ابدا الان <i className="icon-4"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {status === "failed" && (
              <p className="error-text">Failed to load courses. Please try again.</p>
            )}
          </div>
        </div>

        <div className="row g-5 mobile ">
          {status === "loading" && (
            <p className="loading-text">Loading...</p>
          )}


          {status === "succeeded" &&
            diploma.map((course, idx) => (
              <div
                className="col-md-6 col-lg-4"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
                key={idx}
              >
                <CourseDiploma
                  bg="#f5f1eb"
                  my={true}
                  data={course}
                  image_location_path="02"
                />
              </div>
            ))}

          {status === "failed" && (
            <p className="error-text">Failed to load courses. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListArea;
