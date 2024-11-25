"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { UserCourses } from "../../store/features/course-slice"; // Adjust the import based on your project structure
// import { UserCourses, selectCourses, selectCourseStatus, selectCourseError } from "../../store/features/course-slice"; // Adjust path accordingly
import { course_data } from "@/data";
import { cookies } from "next/headers";

const page = () => {
//   const [next, setNext] = useState(coursePerView);
//   const [courses, setCourses] = useState(course_data);
  // const dispatch = useDispatch();
   // Accessing courses from Redux state
  //  const course = useSelector(selectCourses);
  //  const status = useSelector(selectCourseStatus);
  //  const error = useSelector(selectCourseError);

  //  setCourses(course)
  // handleLoadData

  const fetchDataUser = async () => {
    try {
      const token =
        typeof window !== "undefined"
          ? document.cookie
              .split("; ")
              .find((row) => row.startsWith("token="))
              ?.split("=")[1]
          : null;

      if (!token) throw new Error("Token is not available");

      const response = await fetch(`http://49.13.77.125:1118/Endpoint/api/MemberCourse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
console.log(error)    }
  };


//   const handleLoadData = () => {
//     setNext((value) => value + 3);
//   };

  useEffect(() => {
    // Dispatch UserCourses action to fetch courses
    // dispatch(UserCourses());
    // const data = fetchDataUser()
    // const token =
    //       document.cookie
    //           .split("; ")
    //           .find((row) => row.startsWith("token="))
    //           ?.split("=")[1]
              console.log("token " +cookies().get('token')?.value);

    // console.log("data " + token)
    // console.log("data " + data)
  }, []);

  // Log the status and fetched data to the console for debugging
  // useEffect(() => {
  //   console.log("Courses Status:", status);
  //   if (status === 'succeeded') {
  //     console.log("Courses Data:", courses);
  //   }
  //   if (status === 'failed') {
  //     console.log("Error:", error);
  //   }
  // }, [status, courses, error]);

  // console.log("data "+ courses)
  return (
    <div className="edu-course-area course-area-1 ">
      <div className="container">
        
        {/* <div className="row g-5 ">
          {courses?.slice(0, next)?.map((course, idx) => (
            <div key={course.id} className="col-md-6 col-lg-4">
              <CourseTypeEleven
                my={my}
                title={title}
                data={course}
                classes="course-box-shadow"
                idx={idx}
              />
            </div>
          ))}
        </div> */}
        
      </div>
    </div>
  );
};

export default page;
