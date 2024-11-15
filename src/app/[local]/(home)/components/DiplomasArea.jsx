"use client";
import { course_data } from "@/data";
import CourseTypeOne from "@/components/course/course-type-one";
import { useTranslations } from "next-intl";

const DiplomasArea = () => {
  const t = useTranslations("home.learningPathsArea");
  return (
    <div
      id="paths"
      className="edu-course-area course-area-2 gap-tb-text bg-lighten03"
    >
      <div className="container ">
        <div
          className="section-title section-center"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <span className="pre-title">{t("learningPaths")}</span>
          <h2 className="title">{t("title")}</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>
        <div className="row g-5 pb-[50px]">
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
        {/* <div
          className="course-view-all"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <Link href="/course-style-1" className="edu-btn">
            <i className="icon-4"></i>
            <span> {t("more")}</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DiplomasArea;
