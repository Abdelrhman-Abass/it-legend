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

  const groupedCourses = levelsOrder.map(level => {
    return {
      level,
      courses: data.filter(course => course.level === level),
    };
  });

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
  const courseTest = [
    {
      "courseId": "bc7efa63-3607-47f9-a5a4-db83c6a7cd79",
      "titleAr": "C# Advanced",
      "titleEn": "C# Advanced",
      "shortDescriptionAr": "كورس مصمم خصيصا ليرشدك خطوة بخطوة نحو إتقان المهارات المتقدمة  لتصبح مبرمجًا متميزًا في C#. دليلك الشامل للارتقاء إلى مستويات احترافية في عالم لغة  لغة السي شارب الأكثر استخداما على مستوى العالم",
      "shortDescriptionEn": "A course designed specifically to guide you step by step towards mastering advanced skills and becoming an outstanding C# programmer.\n Your comprehensive guide to rising to professional levels in the ",
      "displayOrder": 8,
      "categoryId": "4ec540e9-8165-4b85-f4a5-08dc01837709",
      "levelId": "37966ce2-a3c6-408c-a827-fd6f30130a55",
      "levelOrder": 0,
      "levelTitleAr": "متوسط",
      "levelTitleEn": "متوسط",
      "averageRating": 3.530564,
      "lectures": 63800,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 2,
      "categoryId": "4ec540e9-8165-4b85-f4a5-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "c7f5bfef-8117-4021-b83e-448051bced9a",
      "titleAr": "C# Basics",
      "titleEn": "C# Basics",
      "shortDescriptionAr": "كورس أساسيات لغة السي شارب المستوى الأول هو نقطة الانطلاق المثالية لمسيرتك في عالم البرمجة. \nتعلم اللغة لأكثر شيوعا على مستوى العالم ومفتاحك لدخول كافة مجالات البرمجة الرائدة عالميا.\n",
      "shortDescriptionEn": "The C# Basics Course, Level 1, is the ideal starting point for your career in the world of programming.\nLearn the most common language in the world and your key to entering all the world's leading pro",
      "displayOrder": 4,
      "categoryId": "4ec540e9-8165-4b85-f4a5-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.462992,
      "lectures": 462396,
      "exams": 29832,
      "progressPercentage": 0
    },
    {
      "courseId": "bc7efa63-3607-47f9-a5a4-db83c6a7cd79",
      "titleAr": "C# Advanced",
      "titleEn": "C# Advanced",
      "shortDescriptionAr": "كورس مصمم خصيصا ليرشدك خطوة بخطوة نحو إتقان المهارات المتقدمة  لتصبح مبرمجًا متميزًا في C#. دليلك الشامل للارتقاء إلى مستويات احترافية في عالم لغة  لغة السي شارب الأكثر استخداما على مستوى العالم",
      "shortDescriptionEn": "A course designed specifically to guide you step by step towards mastering advanced skills and becoming an outstanding C# programmer.\n Your comprehensive guide to rising to professional levels in the ",
      "displayOrder": 6,
      "categoryId": "b7ae232d-2c10-45d5-f4a4-08dc01837709",
      "levelId": "37966ce2-a3c6-408c-a827-fd6f30130a55",
      "levelOrder": 0,
      "levelTitleAr": "متوسط",
      "levelTitleEn": "متوسط",
      "averageRating": 3.530564,
      "lectures": 63800,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 3,
      "categoryId": "4ec540e9-8165-4b85-f4a5-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "78a34224-b9b3-424b-bd5a-137e891326ca",
      "titleAr": "Data structures and Algorithms ",
      "titleEn": "Data structures and Algorithms ",
      "shortDescriptionAr": "كورس هيكلة البيانات والخوارزميات هو مساق دراسي يهدف إلى تعريف الطلاب بأساسيات تصميم وتنفيذ البيانات والخوارزميات في علم الحاسوب. ",
      "shortDescriptionEn": "The Data Structure and Algorithms course is a course aimed at introducing students to the basics of designing and implementing data and algorithms in computer science.\n",
      "displayOrder": 5,
      "categoryId": "ecf6af2f-a461-48a2-b298-26eb485b0887",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.167155,
      "lectures": 60698,
      "exams": 6138,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 1,
      "categoryId": "44438416-eec6-4232-b94e-10d587d7f08e",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "78a34224-b9b3-424b-bd5a-137e891326ca",
      "titleAr": "Data structures and Algorithms ",
      "titleEn": "Data structures and Algorithms ",
      "shortDescriptionAr": "كورس هيكلة البيانات والخوارزميات هو مساق دراسي يهدف إلى تعريف الطلاب بأساسيات تصميم وتنفيذ البيانات والخوارزميات في علم الحاسوب. ",
      "shortDescriptionEn": "The Data Structure and Algorithms course is a course aimed at introducing students to the basics of designing and implementing data and algorithms in computer science.\n",
      "displayOrder": 7,
      "categoryId": "c1dcd2f4-65ca-4d7c-f4a6-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.167155,
      "lectures": 60698,
      "exams": 6138,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 2,
      "categoryId": "c1dcd2f4-65ca-4d7c-f4a6-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 2,
      "categoryId": "ecf6af2f-a461-48a2-b298-26eb485b0887",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "bc7efa63-3607-47f9-a5a4-db83c6a7cd79",
      "titleAr": "C# Advanced",
      "titleEn": "C# Advanced",
      "shortDescriptionAr": "كورس مصمم خصيصا ليرشدك خطوة بخطوة نحو إتقان المهارات المتقدمة  لتصبح مبرمجًا متميزًا في C#. دليلك الشامل للارتقاء إلى مستويات احترافية في عالم لغة  لغة السي شارب الأكثر استخداما على مستوى العالم",
      "shortDescriptionEn": "A course designed specifically to guide you step by step towards mastering advanced skills and becoming an outstanding C# programmer.\n Your comprehensive guide to rising to professional levels in the ",
      "displayOrder": 7,
      "categoryId": "60b97d2e-63af-412e-8b4a-c262f6eb77b2",
      "levelId": "37966ce2-a3c6-408c-a827-fd6f30130a55",
      "levelOrder": 0,
      "levelTitleAr": "متوسط",
      "levelTitleEn": "متوسط",
      "averageRating": 3.530564,
      "lectures": 63800,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "78a34224-b9b3-424b-bd5a-137e891326ca",
      "titleAr": "Data structures and Algorithms ",
      "titleEn": "Data structures and Algorithms ",
      "shortDescriptionAr": "كورس هيكلة البيانات والخوارزميات هو مساق دراسي يهدف إلى تعريف الطلاب بأساسيات تصميم وتنفيذ البيانات والخوارزميات في علم الحاسوب. ",
      "shortDescriptionEn": "The Data Structure and Algorithms course is a course aimed at introducing students to the basics of designing and implementing data and algorithms in computer science.\n",
      "displayOrder": 7,
      "categoryId": "b7ae232d-2c10-45d5-f4a4-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.167155,
      "lectures": 60698,
      "exams": 6138,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 1,
      "categoryId": "60b97d2e-63af-412e-8b4a-c262f6eb77b2",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "78a34224-b9b3-424b-bd5a-137e891326ca",
      "titleAr": "Data structures and Algorithms ",
      "titleEn": "Data structures and Algorithms ",
      "shortDescriptionAr": "كورس هيكلة البيانات والخوارزميات هو مساق دراسي يهدف إلى تعريف الطلاب بأساسيات تصميم وتنفيذ البيانات والخوارزميات في علم الحاسوب. ",
      "shortDescriptionEn": "The Data Structure and Algorithms course is a course aimed at introducing students to the basics of designing and implementing data and algorithms in computer science.\n",
      "displayOrder": 8,
      "categoryId": "60b97d2e-63af-412e-8b4a-c262f6eb77b2",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.167155,
      "lectures": 60698,
      "exams": 6138,
      "progressPercentage": 0
    },
    {
      "courseId": "c7f5bfef-8117-4021-b83e-448051bced9a",
      "titleAr": "C# Basics",
      "titleEn": "C# Basics",
      "shortDescriptionAr": "كورس أساسيات لغة السي شارب المستوى الأول هو نقطة الانطلاق المثالية لمسيرتك في عالم البرمجة. \nتعلم اللغة لأكثر شيوعا على مستوى العالم ومفتاحك لدخول كافة مجالات البرمجة الرائدة عالميا.\n",
      "shortDescriptionEn": "The C# Basics Course, Level 1, is the ideal starting point for your career in the world of programming.\nLearn the most common language in the world and your key to entering all the world's leading pro",
      "displayOrder": 3,
      "categoryId": "b7ae232d-2c10-45d5-f4a4-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.462992,
      "lectures": 462396,
      "exams": 29832,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 1,
      "categoryId": "b7ae232d-2c10-45d5-f4a4-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "aca11198-d0ed-43f4-97d0-16061fcc8b3f",
      "titleAr": "Dart",
      "titleEn": "Dart",
      "shortDescriptionAr": "استكشف قوة لغة دارت (Dart)واستوعب أساسيات البرمجة الكائنية التوجه (OOP)من خلال دورتنا الشاملة المصممة خصيصا للمبتدئين والمطورين المتوسطين.\nسواء كنت تطمح في بناء تطبيقات الهواتف المحمولة أو تعزيز مهارا",
      "shortDescriptionEn": "Explore the power of the Dart language and understand the basics of Object-Oriented Programming (OOP) with our comprehensive course designed specifically for beginners and intermediate developers.\nWhether you aspire to build mobile applications or enhance your programming skills, this course provides a foundation in the Dart language and the principles of object-oriented programming.Whe",
      "displayOrder": 6,
      "categoryId": "ecf6af2f-a461-48a2-b298-26eb485b0887",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.655844,
      "lectures": 30030,
      "exams": 2772,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 2,
      "categoryId": "b7ae232d-2c10-45d5-f4a4-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 1,
      "categoryId": "ecf6af2f-a461-48a2-b298-26eb485b0887",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "11199e3b-932d-43a1-bac6-fb5eebdb0c0e",
      "titleAr": "English For Programmers",
      "titleEn": "English For Programmers",
      "shortDescriptionAr": "الكورس الاول لتطوير اللغة الانجليزية لكل من يرغب ان يستمر في مجال تكنلوجيا المعلومات الكورس مصمم بعناية ليساعدك ان تتطور في مجالك بشكل سهل و بسيط جدا",
      "shortDescriptionEn": "الكورس الاول لتطوير اللغة الانجليزية لكل من يرغب ان يستمر في مجال تكنلوجيا المعلومات الكورس مصمم بعناية ليساعدك ان تتطور في مجالك بشكل سهل و بسيط جدا",
      "displayOrder": 2,
      "categoryId": "f6f30bcb-269c-45e3-f4a8-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.445454,
      "lectures": 4400,
      "exams": 330,
      "progressPercentage": 0
    },
    {
      "courseId": "78a34224-b9b3-424b-bd5a-137e891326ca",
      "titleAr": "Data structures and Algorithms ",
      "titleEn": "Data structures and Algorithms ",
      "shortDescriptionAr": "كورس هيكلة البيانات والخوارزميات هو مساق دراسي يهدف إلى تعريف الطلاب بأساسيات تصميم وتنفيذ البيانات والخوارزميات في علم الحاسوب. ",
      "shortDescriptionEn": "The Data Structure and Algorithms course is a course aimed at introducing students to the basics of designing and implementing data and algorithms in computer science.\n",
      "displayOrder": 3,
      "categoryId": "4ec540e9-8165-4b85-f4a5-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.167155,
      "lectures": 60698,
      "exams": 6138,
      "progressPercentage": 0
    },
    {
      "courseId": "c84e7902-1205-426f-a857-922bedd84bdf",
      "titleAr": "Introduction to computer science",
      "titleEn": "Introduction to computer science",
      "shortDescriptionAr": "رحلتك الأولى في مجال البرمجة لاستكشاف عالم الحوسبة والفهم العميق لكافة مكونات الحاسوب.\nهذا الكورس يقدم لك المعرفة الشاملة بالأساسيات لتبدأ مسيرتك \nفي عالم البرمجة بثقة وإتقان\n",
      "shortDescriptionEn": "Your first journey in the field of programming to explore the world of computing and a deep understanding of all computer components.\nThis course provides you with comprehensive knowledge of the basics to start your career\nIn the world of programming with confidence and mastery",
      "displayOrder": 1,
      "categoryId": "c1dcd2f4-65ca-4d7c-f4a6-08dc01837709",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.625368,
      "lectures": 59664,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "c7f5bfef-8117-4021-b83e-448051bced9a",
      "titleAr": "C# Basics",
      "titleEn": "C# Basics",
      "shortDescriptionAr": "كورس أساسيات لغة السي شارب المستوى الأول هو نقطة الانطلاق المثالية لمسيرتك في عالم البرمجة. \nتعلم اللغة لأكثر شيوعا على مستوى العالم ومفتاحك لدخول كافة مجالات البرمجة الرائدة عالميا.\n",
      "shortDescriptionEn": "The C# Basics Course, Level 1, is the ideal starting point for your career in the world of programming.\nLearn the most common language in the world and your key to entering all the world's leading pro",
      "displayOrder": 3,
      "categoryId": "60b97d2e-63af-412e-8b4a-c262f6eb77b2",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.462992,
      "lectures": 462396,
      "exams": 29832,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 2,
      "categoryId": "44438416-eec6-4232-b94e-10d587d7f08e",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    },
    {
      "courseId": "afe300d0-927a-4e46-a91b-6667fce77941",
      "titleAr": "Algorithm and problem solving level 1",
      "titleEn": "Algorithm and problem solving level 1",
      "shortDescriptionAr": "اغتنم فرصتك المثالية لتطوير قدراتك البرمجية من خلال تعلم مهارة حل المشكلات وكيفية بناء حلول فعّالة عبر تدريبات عملية وحالات واقعية لتكون جزءًا من مبدعي عالم البرمجة!",
      "shortDescriptionEn": "Seize your ideal opportunity to develop your programming capabilities by learning the skill of solving problems and how to build effective solutions through practical exercises and real-life cases to ",
      "displayOrder": 2,
      "categoryId": "60b97d2e-63af-412e-8b4a-c262f6eb77b2",
      "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
      "levelOrder": 0,
      "levelTitleAr": "مبتدئ",
      "levelTitleEn": "مبتدئ",
      "averageRating": 3.576816,
      "lectures": 151998,
      "exams": 0,
      "progressPercentage": 0
    }
  ]

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
            // course.courses.map((cour, idx) => (
            courseTest.map((cour, idx) => (
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
