"use server";

// import React, { useEffect, useState } from "react";
import { course_data } from "@/data";

// import CourseTypeEleven from "../course/course-type-eleven";
import CourseTypeEleven from "../../../components/course/course-type-eleven";
import { useDispatch, useSelector } from "react-redux";
import { UserCourses } from "../../../store/features/course-slice"; // Adjust the import based on your project structure
import { selectCourses, selectCourseStatus, selectCourseError } from "../../../store/features/course-slice"; // Adjust as needed
import axios from "axios";


export const fetchData = async (id) => {
  const blog = await axios.get(
    `http://49.13.77.125:1118/Endpoint/api/Course`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 300000, // Set timeout to 30 seconds
    }
  );
  
  return blog;
};


const page = async ({
  my = false,
  recommend = false,
  title = null,
  coursePerView = 6,
}) => {
  // const [next, setNext] = useState(coursePerView);
  // const [courses, setCourses] = useState(course_data);
  const blog = await fetchData();
  console.log(blog)
  // const dispatch = useDispatch();

  // const course = useSelector(selectCourses);
  // const status = useSelector(selectCourseStatus);
  // const error = useSelector(selectCourseError);

  // // handleLoadData
  // const handleLoadData = () => {
  //   setNext((value) => value + 3);
  // };

  // useEffect(() => {
  //   // Dispatch UserCourses action to fetch courses
  //   dispatch(UserCourses());
  // }, [dispatch]);

  // // Log the status and fetched data to the console for debugging
  // useEffect(() => {
  //   console.log("Courses Status:", status);
  //   if (status === 'succeeded') {
  //     console.log("Courses Data:", course);
  //   }
  //   if (status === 'failed') {
  //     console.log("Error:", error);
  //   }
  // }, [status, course, error]);


  return (
    <div className="edu-course-area course-area-1 ">
      <div className="container">
        {title && <h3 className="title">{title}</h3>}
        
        {/* <div className="row g-5 ">
          {course?.map((course, idx) => (
            <div key={course.courseId} className="col-md-6 col-lg-4">
              
            </div>
          ))}
        </div> */}
        
      </div>
    </div>
  );
};

export default page;

