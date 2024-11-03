import CourseTwoArea from "@/components/courses/CourseTwoArea";
import { Wrapper } from "@/layout";
import React from "react";

const page = () => {
  return (
    <Wrapper>
      <div style={{ paddingBottom: 72 }}>
        <CourseTwoArea title="مرحلة ما قبل التعلم" />
        <CourseTwoArea title="مرحلة التأسيس" />
        <CourseTwoArea coursePerView={3} title="التأهيل لسوق العمل" />
      </div>
    </Wrapper>
  );
};

export default page;
