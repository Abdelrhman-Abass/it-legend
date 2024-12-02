import SwitchThemeButton from "@/components/common/SwitchThemeButton";
import CourseTypeOne from "@/components/course/course-type-one";
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import CategoryArea from "@/components/my-path/CategoryArea";
import CounterUpArea from "@/components/my-path/CounterUpArea";
import HeroArea from "@/components/my-path/HeroArea";
import { course_data } from "@/data";
import { UserHeader } from "@/layout";

import React from "react";
import AdsBanner from "../../(home)/components/AdsBanner";
import ListArea from "@/components/my-path/list-area";
import CourseElevenArea from "@/components/courses/CourseElvenArea";
import RecommendedCourses from "@/components/my-path/RecomendedCourses";

const page = () => {
  return (
    <div style={{ paddingBottom: 92 }}>

      <UserHeader />
      <HeroArea />
      <CategoryArea />
      <CounterUpArea />
      <AdsBanner />
      {/* Diploma */}
      <div
      id="myDeploma" 
        className="edu-course-area course-area-2 gap-tb-text"
      >
        <div className="container">
          {/* <div
            className="section-title section-center"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <h2 className="title">دبلوماتي</h2>
            <span className="shape-line">
              <i className="icon-19"></i>
            </span>
          </div> */}

          <ListArea id="myDeploma" />

        </div>
      </div>
      {/* Course */}
      <div
      id="myCourses"
        style={{ marginBottom: 30 }}
        className="section-title section-center"
        data-aos-delay="150"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <span className="pre-title"></span>
        <h2 className="title">كورساتي</h2>
        <span className="shape-line">
          <i className="icon-19"></i>
        </span>
      </div>
      {/* Recommend Course */}
      <CourseElevenArea my={true} />
      {/* <CourseTwoArea my={true} coursePerView={3}  />
      <CourseTwoArea my={true} coursePerView={3}  />
      <CourseTwoArea my={true} coursePerView={3} /> */}

      <div
        style={{ marginBottom: 30 }}
        className="section-title section-center"
        data-aos-delay="150"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <span className="pre-title"></span>
        <h2 className="title">مرشح لك</h2>
        <span className="shape-line">
          <i className="icon-19"></i>
        </span>
      </div>
      <RecommendedCourses my={true}/>
    </div>
  );
};

export default page;
