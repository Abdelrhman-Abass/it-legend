"use server"
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import { Wrapper } from "@/layout";
// import React, { useState } from "react";
// import { course_data } from "@/data";
// import SortingArea from "@/components/course-filter/sorting-area";
const fetchCourses = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/Course`, {
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
  const courses = await fetchCourses();

  return (
    <Wrapper>
      <div className="container">
        {/* Pass the fetched courses to CourseTwoArea */}
        <CourseTwoArea coursesData={courses} />
      </div>
    </Wrapper>
  );
};

export default Page;
// const Page = () => {
//   const [search, setSearch] = useState("");
//   const [courses, setCourses] = useState(course_data);

//   const [category, setCategory] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   return (
//     <Wrapper >
        
//       <div className="container">
//       {/* <SortingArea
//           course_items={course_data}
//           num={courses?.length}
//           setCourses={setCourses}
//           courses={courses}
//         /> */}
//         <CourseTwoArea />
//         {/* <CourseTwoArea  />
//         <CourseTwoArea /> */}

//       </div>
//     </Wrapper>
//   );
// };

// export default Page;
