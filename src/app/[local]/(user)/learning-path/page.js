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
        style={{ paddingBottom: 20 }}
        className="edu-course-area course-area-2 gap-tb-text"
      >
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

          <ListArea title="مرحلة ما قبل التعلم"/>

          <div className="row g-5">
            {course_data.slice(0, 6).map((course) => {
              return (
                <div
                  className="col-md-6 col-lg-4"
                  data-aos-delay="150"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  key={course.id}
                >
                  <CourseTypeOne
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
      </div>
      {/* Course */}
      <div
        style={{ marginTop: 36 ,marginBottom:-35}}
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
      <CourseTwoArea title="مرشح لك" my={true} />
      {/* <CourseTwoArea my={true} coursePerView={3}  />
      <CourseTwoArea my={true} coursePerView={3}  />
      <CourseTwoArea my={true} coursePerView={3} /> */}
    </div>
  );
};

export default page;
