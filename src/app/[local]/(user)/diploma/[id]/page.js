"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesByCategory,
  selectDiplomaCourses,
  selectDiplomaCoursesStatus,
  selectDiplomaCoursesError,
} from "../../../../../store/features/diploma-slice";

import { Progress, Tooltip } from "antd";
import CounterArea from "@/components/my-path/counter-area";
import Error from "@/components/event-grid/error";
import { UserHeader } from "@/layout";
import CourseDiploma from "@/components/course/CourseDiploma";

import { usePathname, Link } from "@/navigation";
import MyCourseDiploma from "@/components/course/MyCourseDiploma";
import { LoadingSpinner } from "video-react";
import Loading from "@/app/[local]/loading";


const Page = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const extractDiplomaId = (url) => {
    const match = url.match(/\/diploma\/([a-z0-9\-]+)/);
    return match ? match[1] : null;
  };
  const id = extractDiplomaId(pathname);

  const course = useSelector(selectDiplomaCourses) || {};
  const status = useSelector(selectDiplomaCoursesStatus);
  const error = useSelector(selectDiplomaCoursesError);

  useEffect(() => {
    if (id) {
      dispatch(fetchCoursesByCategory(id));
    }
  }, [id]);

  useEffect(() => {
    if (status === "succeeded") {
      console.log("Courses Data from diploma:", course);
    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, course, error]);

  return (
    <>
      <UserHeader />

      {status === "loading" && (
        // <div className="relative flex w-auto mt-[20%] mr-[20%] animate-pulse gap-2 p-4">
        //   <div className="h-12 w-12 rounded-full bg-slate-400"></div>
        //   <div className="flex-1">
        //     <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
        //     <div className="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
        //   </div>
        //   <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        // </div>
        <Loading/>
        
      )}

      {status === "succeeded" && (
        <>
          <div className="container">
            <div
              style={{
                position: "relative",
                padding: "20px 0 40px",
                width: "100%",
                margin: "32px 0",
              }}
            >
              <h4 className="title">مستوي التقدم في الدبلومة</h4>
              <Tooltip title={"Your Progress"}>
                <Progress
                  percent={course.categoryProgress.toFixed(2) || 0}
                  strokeColor="#080264"
                  showInfo={false}
                />
              </Tooltip>
              <div
                className="percent-label"
                style={{
                  position: "absolute",
                  right: `${50}%`,
                  left: "auto",
                  top: "35px",
                  transition: "all 0.1s",
                }}
              >
                {course.categoryProgress.toFixed(0) || 0}%
              </div>
            </div>
          </div>

          <CounterArea  my={true}  codeChallenges={course.codeChallenges} level={course.level} score={course.score} />
          <div className="container">
            {Array.isArray(course.courses) &&
              course.courses.map((cour, idx) => (
                <section key={idx} className="pr-[20px] pl-[20px] row row--30 desktop" style={{ justifyContent: "center" }}>
                  <div
                    key={idx}
                    className="edu-blog blog-style-list"
                    data-aos-delay="150"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    <div className="inner">
                      <div className="thumbnail">
                        <Link href={`/course-player/${cour.courseId}`}>
                          <img
                            src={`https://www.itlegend.net/Content/Uploads/CoursesMedia/${cour.image}`}
                            // src={`/assets/images/course/course-01/course-01.jpg`}
                            alt="Blog Images"
                            className="lg:w-[280px]"
                          />
                        </Link>
                        <div className="time-top">
                          <span className="duration_1">
                            <Progress type="circle" percent={cour?.progressPercentage ? cour.progressPercentage.toFixed(0) : 0} size={45} status="exception" format={(percent) => `${percent}%`} />
                            {/* {course?.progressPercentage ? `${course.progressPercentage.toFixed(0)}%` : "0%"} */}
                          </span>
                        </div>
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <Link href={`/course-player/${cour.courseId}`}>
                            {cour.titleAr}
                          </Link>
                        </h5>
                        <p>{cour.shortDescriptionAr ? cour.shortDescriptionAr : "No description available"}</p>
                        <div className="read-more-btn">
                          <Link
                            href={`/course-player/${cour.courseId}`}
                            className="edu-btn btn-border btn-medium"
                          >
                            ابدا الان <i className="icon-4"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              ))}

            {Array.isArray(course.courses) &&
              course.courses.map((cour, idx) => (
                <section className="row pt-[50px] mobile">
                  <div
                    className="col-md-6 col-lg-4 "
                    data-aos-delay="150"
                    data-aos="fade-up"
                    data-aos-duration="800"
                    key={idx}
                  >
                    <MyCourseDiploma
                      bg="#f5f1eb"
                      my={true}
                      data={cour}
                      image_location_path="02"
                    />
                  </div>
                </section>
              ))}


          </div>

        </>
      )}
      {status === "failed" && <Error my={true}/>}
    </>


  );
};

export default Page;
