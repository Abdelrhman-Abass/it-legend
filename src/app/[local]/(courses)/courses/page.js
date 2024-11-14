"use client"
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import { Wrapper } from "@/layout";
import React, { useState } from "react";
import { course_data } from "@/data";
import SortingArea from "@/components/course-filter/sorting-area";

const Page = () => {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState(course_data);

  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <Wrapper >
        
      <div className="container">
      <SortingArea
          course_items={course_data}
          num={courses?.length}
          setCourses={setCourses}
          courses={courses}
        />
        <CourseTwoArea />
        {/* <CourseTwoArea  />
        <CourseTwoArea /> */}

      </div>
    </Wrapper>
  );
};

export default Page;
