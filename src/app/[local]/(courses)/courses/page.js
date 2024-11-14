"use client"
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import { Wrapper } from "@/layout";
import React, { useState } from "react";

const Page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  return (
    <Wrapper >
        
      <div className="container">

        <CourseTwoArea />
        <CourseTwoArea  />
        <CourseTwoArea />

      </div>
    </Wrapper>
  );
};

export default Page;
