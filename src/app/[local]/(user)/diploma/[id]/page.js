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
import { fetchCoursesByCategory, selectDiplomaCourses ,selectDiplomaCoursesStatus, selectDiplomaCoursesError } from "../../../../../store/features/diploma-slice";

import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import SwitchThemeButton from "@/components/common/SwitchThemeButton";
import CounterArea from "@/components/my-path/counter-area";
import DiplomaArea from "@/components/my-path/diploma-area";
import ListArea from "@/components/my-path/list-area";
import { UserHeader } from "@/layout";
import { Progress, Tooltip } from "antd";

const Page =  () => {
  const dispatch = useDispatch();

  const url = "http://localhost:3000/en/diploma/60b97d2e-63af-412e-8b4a-c262f6eb77b2";

  const extractId = (url) => {
    const parts = new URL(url).pathname.split('/');
    return parts[parts.length - 1];
  };
  
  const id = extractId(url);
  console.log("Extracted ID:", id);

  // console.log(window.SharedArrayBuffer.pathna)
  // Extract the dynamic 'id' from the URL
  // const { id } = await params; // Extract the `id` from params

  // useEffect(() => {
  //   console.log("Dynamic ID:", id);
  // }, [id]);
  const course = useSelector(selectDiplomaCourses) || []; // Ensure it's always an array
  const status = useSelector(selectDiplomaCoursesStatus);
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
            course.courses.map((cour, idx) => (
              <div
                className="col-md-6 col-lg-4"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
                key={idx}
              >
                <p>{cour.titleAr}</p>
              </div>
            ))}

      {/* Render diploma sections dynamically */}
      <DiplomaArea title="مرحلة ما قبل التعلم" />
      <DiplomaArea title="مرحلة التأسيس" />
      <DiplomaArea title="مرحلة التأهيل لسوق العمل" />

      {/* Render the course list */}
      {/* <ListArea title="الدورات المتاحة" /> */}
    </>
  );
};

export default Page;
