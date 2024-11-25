// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { UserCourses } from "../../../store/features/course-slice"; // Adjust the import based on your project structure
// import { selectCourses, selectCourseStatus, selectCourseError } from "../../../store/features/course-slice"; // Adjust as needed


// const CourseElevenArea = ({
//   my = false,
//   recommend = false,
//   title = null,
//   coursePerView = 6,
// }) => {
//   const dispatch = useDispatch();
//   const [next, setNext] = useState(coursePerView);

//   // Accessing courses from Redux state
//   const courses = useSelector(selectCourses);
//   const status = useSelector(selectCourseStatus);
//   const error = useSelector(selectCourseError);

//   // handleLoadData
//   const handleLoadData = () => {
//     setNext((value) => value + 3);
//   };

//   // Fetch courses data on component mount
//   useEffect(() => {
//     // Dispatch UserCourses action to fetch courses
//     dispatch(UserCourses());
//   }, [dispatch]);

//   // Log the status and fetched data to the console for debugging
//   useEffect(() => {
//     console.log("Courses Status:", status);
//     if (status === 'succeeded') {
//       console.log("Courses Data:", courses);
//     }
//     if (status === 'failed') {
//       console.log("Error:", error);
//     }
//   }, [status, courses, error]);

//   return (
//     <div className="edu-course-area course-area-1">
//       <div className="container">
//         {/* {title && <h3 className="title">{title}</h3>}

//         <div className="row g-5">
//           {status === 'loading' && <div>Loading...</div>}
//           {status === 'failed' && <div>Error: {error}</div>}
//           {courses?.slice(0, next)?.map((course, idx) => (
//             <div key={course.id} className="col-md-6 col-lg-4">
//               <CourseTypeEleven
//                 my={my}
//                 title={title}
//                 data={course}
//                 classes="course-box-shadow"
//                 idx={idx}
//               />
//             </div>
//           ))}
//         </div> */}
// {/* 
//         <div className="load-more-btn">
//           <button onClick={handleLoadData}>Load More</button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default CourseElevenArea;

"use client";

import React, { useEffect, useState } from "react";
import { course_data } from "@/data";

// import CourseTypeEleven from "../course/course-type-eleven";
import CourseTypeEleven from "../../../components/course/course-type-eleven";
import { useDispatch, useSelector } from "react-redux";
import { UserCourses } from "../../../store/features/course-slice"; // Adjust the import based on your project structure
import { selectCourses, selectCourseStatus, selectCourseError } from "../../../store/features/course-slice"; // Adjust as needed


const page = ({
  my = false,
  recommend = false,
  title = null,
  coursePerView = 6,
}) => {
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(course_data);
  const dispatch = useDispatch();

  const course = useSelector(selectCourses);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);

  // handleLoadData
  const handleLoadData = () => {
    setNext((value) => value + 3);
  };

  useEffect(() => {
    // Dispatch UserCourses action to fetch courses
    dispatch(UserCourses());
  }, [dispatch]);

  // Log the status and fetched data to the console for debugging
  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === 'succeeded') {
      console.log("Courses Data:", course);
    }
    if (status === 'failed') {
      console.log("Error:", error);
    }
  }, [status, course, error]);


  return (
    <div className="edu-course-area course-area-1 ">
      <div className="container">
        {title && <h3 className="title">{title}</h3>}
        
        <div className="row g-5 ">
          {course?.slice(0, next)?.map((course, idx) => (
            <div key={course.courseId} className="col-md-6 col-lg-4">
              <CourseTypeEleven
                my={my}
                title={title}
                data={course}
                classes="course-box-shadow"
                idx={idx}
              />
            </div>
          ))}
        </div>
        {/* {next < courses.length && (
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

export default page;

