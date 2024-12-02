// "use client";

// import React, { useEffect, useState } from "react";
// import { course_data } from "@/data";
// import CourseTypeEleven from "../course/course-type-eleven";
// import { useDispatch, useSelector } from "react-redux";
// import { UserCourses } from "../../store/features/course-slice"; // Adjust the import based on your project structure
// import { selectCourses, selectCourseStatus, selectCourseError } from "../../store/features/course-slice"; // Adjust as needed


// const CourseElevenArea = ({
//   my = false,
//   recommend = false,
//   title = null,
//   coursePerView = 6,
// }) => {
//   const [next, setNext] = useState(coursePerView);
//   // const [courses, setCourses] = useState(test_data);
//   const dispatch = useDispatch();

//   const course = useSelector(selectCourses);
//   const status = useSelector(selectCourseStatus);
//   const error = useSelector(selectCourseError);

//   // handleLoadData
//   const handleLoadData = () => {
//     setNext((value) => value + 3);
//   };

//   useEffect(() => {
//     // Dispatch UserCourses action to fetch courses
//     dispatch(UserCourses());
//     console.log("test-data " +course )
//   }, [dispatch]);

//   // Log the status and fetched data to the console for debugging
//   useEffect(() => {
//     console.log("Courses Status:", status);
//     if (status === 'succeeded') {
//       console.log("Courses Data:", course);
//     }
//     if (status === 'failed') {
//       console.log("Error:", error);
//     }
//   }, [status, course, error]);


//   return (
//     <div className="edu-course-area course-area-1 ">
//       <div className="container">
//         {title && <h3 className="title">{title}</h3>}

//         <div className="row g-5 ">
//           {course?.slice(0, next)?.map((course, idx) => (
//             <div key={course.courseId} className="col-md-6 col-lg-4">
//               <CourseTypeEleven
//                 my={my}
//                 title={title}
//                 data={course}
//                 classes="course-box-shadow"
//                 idx={idx}
//               />
//               <p>{course.titleAr}</p>
//             </div>
//           ))}
//         </div>
//         {/* {next < courses.length && (
//           <div
//             onClick={handleLoadData}
//             className="load-more-btn"
//             data-aos-delay="100"
//             data-aos="fade-up"
//             data-aos-duration="1200"
//           >
//             <a className="edu-btn" style={{ cursor: "pointer" }}>
//               المزيد <i className="icon-56"></i>
//             </a>
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default CourseElevenArea;
"use client";

import React, { useEffect, useState } from "react";
import CourseTypeEleven from "../course/course-type-eleven";
import { useDispatch, useSelector } from "react-redux";
import { UserCourses } from "../../store/features/course-slice";
import {
  selectCourses,
  selectCourseStatus,
  selectCourseError,
} from "../../store/features/course-slice";

const CourseElevenArea = ({
  my = false,
  recommend = false,
  title = null,
  coursePerView = 6,
}) => {
  const [next, setNext] = useState(coursePerView);
  const [cour, setCour] = useState([]);
  const dispatch = useDispatch();

  const courses = useSelector(selectCourses) || []; // Ensure it's always an array
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);
  const courseTest =
    [
      {
        "courseId": "602d090f-ef57-464a-b724-0bf57ae9cdc3",
        "titleAr": "HTML | Two Projects",
        "titleEn": "HTML | Two Projects",
        "shortDescriptionAr": "1. تعلم اساسات تصميم المواقع وانشاء مشروعين متكاملين\n تصميم موقعين متكاملين \n     - موقع افلام كرتون \n     -  تصميم موقع مطعم الكترونى",
        "shortDescriptionEn": "Learn website design with HTML CSS and build two websites\nfirst website is Animy Website\nSecond website is Restaurant website",
        "image": "d647c8e5-c0f1-4992-9c55-a1e64a539e4b.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.465909,
        "lectures": 44,
        "exams": 0,
        "progressPercentage": 0
      },
      {
        "courseId": "c7f5bfef-8117-4021-b83e-448051bced9a",
        "titleAr": "C# Basics",
        "titleEn": "C# Basics",
        "shortDescriptionAr": "كورس أساسيات لغة السي شارب المستوى الأول هو نقطة الانطلاق المثالية لمسيرتك في عالم البرمجة. \nتعلم اللغة لأكثر شيوعا على مستوى العالم ومفتاحك لدخول كافة مجالات البرمجة الرائدة عالميا.\n",
        "shortDescriptionEn": "The C# Basics Course, Level 1, is the ideal starting point for your career in the world of programming.\nLearn the most common language in the world and your key to entering all the world's leading pro",
        "image": "24d47750-5cb9-4170-be34-99075536853c.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.462992,
        "lectures": 372,
        "exams": 24,
        "progressPercentage": 12.257685927577327
      },
      {
        "courseId": "3447ff38-1809-4495-bfbd-6a3da119ca0a",
        "titleAr": "Web Development with Asp.Net Core",
        "titleEn": "Web Development with Asp.Net Core",
        "shortDescriptionAr": "هذه الدورة هي بوابتك  المثالية لاكتساب مهارات تطوير مواقع الويب الحديثة باستخدام إطار العمل الأشهر .asp.net\n\nدليلك العملي الشامل نحو كيفية تركيب التصاميم بدقة والتعامل مع قواعد البيانات بكفاءة واستخدام أساليب حماية التطبيقات بفاعلية\n\n",
        "shortDescriptionEn": "This course is your ideal gateway to acquiring modern website development skills using the most famous .asp.net framework\nYour comprehensive practical guide to how to install designs accurately, deal with databases efficiently, and use application protection methods effectively\n",
        "image": "dc86041b-119a-4013-8cae-b3dc18249684.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.344919,
        "lectures": 196,
        "exams": 10,
        "progressPercentage": 6.706455641982992
      },
      {
        "courseId": "6c719fa0-70ea-41cc-bfb1-972482285d23",
        "titleAr": "Web Development with Asp.Net Core Training",
        "titleEn": "Web Development with Asp.Net Core Training",
        "shortDescriptionAr": "هذه الدورة هي بوابتك  المثالية لاكتساب مهارات تطوير مواقع الويب الحديثة باستخدام إطار العمل الأشهر .asp.net\n\nدليلك العملي الشامل نحو كيفية تركيب التصاميم بدقة والتعامل مع قواعد البيانات بكفاءة واستخدام أساليب حماية التطبيقات بفاعلية\n\n",
        "shortDescriptionEn": "This course is your ideal gateway to acquiring modern website development skills using the most famous .asp.net framework\nYour comprehensive practical guide to how to install designs accurately, deal with databases efficiently, and use application protection methods effectively\n",
        "image": "b45b6cff-f943-443a-80bf-3a6878a4a676.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.713903,
        "lectures": 48,
        "exams": 0,
        "progressPercentage": 0.9205917692990128
      },
      {
        "courseId": "0d693845-141c-4ced-93d8-b30a37844ad9",
        "titleAr": "C# OOP Old 2021",
        "titleEn": "C# OOP Old 2021",
        "shortDescriptionAr": "كورس السي شارب المستوى الثاني هو فرصتك المثالية لتجاوز الأساسيات والتعمق في فهم وإتقان لغة C# اعتمادا على مفاهيم البرمجة الكائنية التوجه كالكائنات والفئات والوراثة والتغليف والتجريد",
        "shortDescriptionEn": "The C# Level 2 course is your ideal opportunity to go beyond the basics and delve deeper into understanding and mastering the C# language based on object-oriented programming concepts such as objects",
        "image": "2bfd53cb-dab8-4ce0-b171-a2ecdc79ffbd.jpg",
        "levelId": "37966ce2-a3c6-408c-a827-fd6f30130a55",
        "levelOrder": 0,
        "levelTitleAr": "متوسط",
        "levelTitleEn": "متوسط",
        "averageRating": 3.374579,
        "lectures": 123,
        "exams": 0,
        "progressPercentage": 0
      }
    ]
  // Handle loading more data
  const handleLoadData = () => {
    setNext((value) => value + 3);
  };

  useEffect(() => {
    dispatch(UserCourses());
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("Courses Status:", status);
  //   if (status === "succeeded") {
  //     console.log("Courses Data:", courses);
  //     const {data} = courses
  //     setCour(JSON.stringify(data))
  //     console.log("data "+JSON.stringify(data));
  //   }
  //   if (status === "failed") {
  //     console.log("Error:", error);
  //   }
  // }, [status, courses, error]);

  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === "succeeded") {
      console.log("Courses Data:", courses);
      const { data } = courses;  // Assuming `courses` has a `data` property that holds the array
      setCour(data);  // Set cour as the array, not a string
      // console.log("Data array:", data);  // Log the actual array
    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, courses, error]);


  return (
    <div className="edu-course-area course-area-1">
      <div className="container">
        {/* {title && <h3 className="title">{title}</h3>} */}
        <div className="row g-5">
               
          {status === "loading" && (
            <p className="loading-text">Loading...</p>
          )}
          {status === "succeeded" &&
            // cour.map((course, idx) => (
            cour.map((course, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <CourseTypeEleven
                  my={my}
                  title={title}
                  data={course}
                  classes="course-box-shadow"
                  idx={idx}
                />
                {/* <p>{course.titleAr}</p> */}
              </div>
            ))}
          {status === "failed"  && (
            <p className="error-text">Failed to load courses. Please try again.</p>
          )}
        </div>
        {/* {next < courses.length && status === "succeeded" && (
          <div
            onClick={handleLoadData}
            className="load-more-btn"
            data-aos-delay="100"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <a className="edu-btn" style={{ cursor: "pointer" }}>
              المزيد <i className="icon-56"></i>
            </a>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CourseElevenArea;
