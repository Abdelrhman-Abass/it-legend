// "use client";
// import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
// import SwitchThemeButton from "@/components/common/SwitchThemeButton";
// import CourseTwoArea from "@/components/courses/CourseTwoArea";
// import CounterArea from "@/components/my-path/counter-area";
// import DiplomaArea from "@/components/my-path/diploma-area";
// import ListArea from "@/components/my-path/list-area";
// import { UserHeader } from "@/layout";
// import { Progress, Tooltip } from "antd";
// import React from "react";

// const page = () => {
//   return (
//     <>
//     <UserHeader/>
//       {/* <BreadcrumbTwo subtitle={"تطوير تطبيقات الويب"} /> */}
//       <div className="container">
//         <div
//           style={{
//             position: "relative",
//             padding: "20px 0 40px",
//             width: "100%",
//             margin: "32px 0",
//           }}
//         >
//           <h4 className="title">مستوي التقدم في الدبلومة</h4>
//           <Tooltip title={"Your Progress"}>
//             <Progress percent={33} strokeColor="#080264" showInfo={false} />
//           </Tooltip>
//           <div
//             className="percent-label"
//             style={{
//               position: "absolute",
//               right: `${33 - 5}%`,
//               left: "auto",
//               top: "35px",
//               transition: "all 0.1s",
//             }}
//           >
//             {33}%
//           </div>
//         </div>
//       </div>
//       <CounterArea />
//       <DiplomaArea title="مرحلة ما قبل التعلم"/>
//       <DiplomaArea title="مرحلة التأسيس"/>
//       <DiplomaArea title="مرحلةالتأهيل لسوق العمل" />
//     </>
//   );
// };

// export default page;


// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCoursesByCategory, selectDiplomaCourses, selectDiplomaStatus } from "../../../../../store/features/diploma-slice";

// import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
// import SwitchThemeButton from "@/components/common/SwitchThemeButton";
// import CounterArea from "@/components/my-path/counter-area";
// import DiplomaArea from "@/components/my-path/diploma-area";
// import ListArea from "@/components/my-path/list-area";
// import { UserHeader } from "@/layout";
// import { Progress, Tooltip } from "antd";

// const Page = () => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // Get the dynamic 'id' from the URL
//   const { id } = router.query;

//   // Extract the category ID from the URL
//   // const id = router.query?.id; // `id` is dynamic based on the folder name
//   console.log(id)
//   // Get the courses and status from Redux
//   // const courses = useSelector(selectDiplomaCourses);
//   // const status = useSelector(selectDiplomaStatus);

//   // Fetch courses whenever the ID changes
//   // useEffect(() => {
//   //   if (id) {
//   //     dispatch(fetchCoursesByCategory(id));
//   //   }
//   // }, [dispatch, id]);

//   // useEffect(() => {
//   //   console.log("Courses Status:", status);
//   //   if (status === "succeeded") {
//   //     console.log("Courses Data:", courses);
//   //   }
//   //   if (status === "failed") {
//   //     console.log("Error:", error);
//   //   }
//   // }, [status, diploma]);

//   // console.log(courses)

//   return (
//     <>
//       <UserHeader />
//       {/* Optional Breadcrumb */}
//       {/* <BreadcrumbTwo subtitle={"تطوير تطبيقات الويب"} /> */}

//       <div className="container">
//         <div
//           style={{
//             position: "relative",
//             padding: "20px 0 40px",
//             width: "100%",
//             margin: "32px 0",
//           }}
//         >
//           <h4 className="title">مستوي التقدم في الدبلومة</h4>
//           <Tooltip title={"Your Progress"}>
//             <Progress percent={33} strokeColor="#080264" showInfo={false} />
//           </Tooltip>
//           <div
//             className="percent-label"
//             style={{
//               position: "absolute",
//               right: `${33 - 5}%`,
//               left: "auto",
//               top: "35px",
//               transition: "all 0.1s",
//             }}
//           >
//             {33}%
//           </div>
//         </div>
//       </div>

//       <CounterArea />

//       {/* Render diploma sections dynamically */}
//       <DiplomaArea title="مرحلة ما قبل التعلم" />
//       <DiplomaArea title="مرحلة التأسيس" />
//       <DiplomaArea title="مرحلة التأهيل لسوق العمل" />

//       {/* Render the course list */}
//       {/* <ListArea title="الدورات المتاحة" /> */}
//     </>
//   );
// };

// export default Page;

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByCategory, selectDiplomaCourses, selectDiplomaCoursesStatus, selectDiplomaCoursesError } from "../../../../../store/features/diploma-slice";

import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import SwitchThemeButton from "@/components/common/SwitchThemeButton";
import CounterArea from "@/components/my-path/counter-area";
import DiplomaArea from "@/components/my-path/diploma-area";
import ListArea from "@/components/my-path/list-area";
import { UserHeader } from "@/layout";
import { Progress, Tooltip } from "antd";
import { usePathname, Link } from "@/navigation";

import Error from "@/components/event-grid/error";
import CourseDiploma from "@/components/course/CourseDiploma";

const Page = () => {
  const dispatch = useDispatch();
  // const router = useRouter()
  const pathname = usePathname();
  // const { id } = router; //

  const url = "http://localhost:3000/en/diploma/60b97d2e-63af-412e-8b4a-c262f6eb77b2";
  // const url = window.location.href;

  const extractId = (url) => {
    const parts = new URL(url).pathname.split('/');
    return parts[parts.length - 1];
  };

  function extractDiplomaId(url) {
    const match = url.match(/\/diploma\/([a-z0-9\-]+)/);
    return match ? match[1] : null;
  }
  const id = extractDiplomaId(pathname);
  // console.log("Extracted ID:", id);
  console.log("Extracted router:", id);

  const levelsOrder = ["مبتدئ", "متوسط", 'متقدم'];

  

  // console.log(window.SharedArrayBuffer.pathna)
  // Extract the dynamic 'id' from the URL
  // const { id } = await params; // Extract the `id` from params

  // useEffect(() => {
  //   console.log("Dynamic ID:", id);
  // }, [id]);
  const course = useSelector(selectDiplomaCourses) || []; // Ensure it's always an array
  // const status = useSelector(selectDiplomaCoursesStatus);
  const status = "succeeded";
  const error = useSelector(selectDiplomaCoursesError);

  // Optionally, fetch courses by category when 'id' changes
  useEffect(() => {
    dispatch(fetchCoursesByCategory(id));
    // console.log("Courses Data:", course);
  }, [id]);


  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === "succeeded") {
      console.log("Courses Data from diploma :", course);
    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, course, error]);

  // Handle the case where `categoryId` is not yet available
  // if (!categoryId) return <div>Loading...</div>;

  return (
    <>
      <UserHeader />
      {/* Optional Breadcrumb */}
      {/* <BreadcrumbTwo subtitle={"تطوير تطبيقات الويب"} /> */}
      {status === "loading" &&
        <div class="relative flex w-auto mt-[20%] mr-[20%] animate-pulse gap-2 p-4">
          <div class="h-12 w-12 rounded-full bg-slate-400"></div>
          <div class="flex-1">
            <div class="mb-1 h-5 w-3/5 rounded-lg bg-slate-400 text-lg"></div>
            <div class="h-5 w-[90%] rounded-lg bg-slate-400 text-sm"></div>
          </div>
          <div class="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
        </div>
      }

      {status === "succeeded" &&
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
                <Progress percent={course.categoryProgress} strokeColor="#080264" showInfo={false} />
              </Tooltip>
              <div
                className="percent-label"
                style={{
                  position: "absolute",
                  right: `${33 - 5}%`,
                  left: "auto",
                  top: "35px",
                  transition: "all 0.1s",
                }}
              >
                {course.categoryProgress}%
              </div>
            </div>
          </div>

          <CounterArea />
          {status === "succeeded" &&
          // {
          //   groupedCourses.map(({ level, courses }) => (
          //     <div key={level}>
          //       <h2>{level}</h2>
          //       <ul>
          //         {courses.map(course => (
          //           <li key={course.id}>{course.title}</li>
          //         ))}
          //       </ul>
          //     </div>

          //   ))
          // }
            course.courses.map((cour, idx) => (
            // courseTest.map((cour, idx) => (
          <section >
            <div className="container">
              {/* <h4 className="title">{cour.title}</h4> */}
              <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
                <div className=" px-[60px]">
                  <div
                    key={idx}
                    className="edu-blog blog-style-list"
                    data-aos-delay="150"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    {/* <div>{cour.titleAr}</div> */}
                    <div className="inner">
                      <div className="thumbnail">
                        <Link
                          href={`/course-player/${cour.courseId}`}
                        >
                          <img
                            src={"/assets/images/blog/blog-25.jpg"}
                            alt="Blog Images"
                          />
                        </Link>
                        <div className="time-top">
                          <span className="duration_1">
                            45%
                          </span>
                        </div>
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <Link
                            href={`/course-player/${cour.courseId}`}
                          >
                            {cour.titleAr}...
                          </Link>
                        </h5>

                        <p>{cour.shortDescriptionAr}</p>
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
                </div>
              </div>

              <div className="row g-5 mobile ">
                {courseTest.map((course) => {
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
            ))}
        </>
      }
      {status === "failed" && <Error />}

      {/* Render diploma sections dynamically */}
      {/* <DiplomaArea data={course.courses} title="مرحلة ما قبل التعلم" /> */}
      {/* <DiplomaArea title="مرحلة التأسيس" />
      <DiplomaArea title="مرحلة التأهيل لسوق العمل" /> */}

      {/* Render the course list */}
      {/* <ListArea title="الدورات المتاحة" /> */}
    </>
  );
};

export default Page;
