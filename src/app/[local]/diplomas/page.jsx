"use server"
import CourseOneArea from "@/components/courses/CourseOneArea";
import { Wrapper } from "@/layout";
// import React, { useState } from "react";
// import { course_data } from "@/data";
// import SortingArea from "@/components/course-filter/sorting-area";
const fetchCourses = async () => {
  try {
    const response = await fetch("http://49.13.77.125:1118/Endpoint/api/Category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Avoid caching if data is dynamic
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    }
    const {data} = await response.json();
    // console.log("response " + JSON.stringify(data))
    return data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    return []; // Return an empty array or handle errors appropriately
  }
};
const Page = async () => {
  const diplomas = await fetchCourses();

  return (
    <Wrapper>
      <div className="container">
        {/* Pass the fetched courses to CourseTwoArea */}
        <CourseOneArea coursesData={diplomas} />
      </div>
    </Wrapper>
  );
};

export default Page;