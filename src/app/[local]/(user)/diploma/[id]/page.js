"use client";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import CourseTwoArea from "@/components/courses/CourseTwoArea";
import CounterArea from "@/components/my-path/counter-area";
import ListArea from "@/components/my-path/list-area";
import { Progress, Tooltip } from "antd";
import React from "react";

const page = () => {
  return (
    <>
      <BreadcrumbTwo subtitle={"تطوير تطبيقات الويب"} />
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
            <Progress percent={33} strokeColor="#080264" showInfo={false} />
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
            {33}%
          </div>
        </div>
      </div>
      <CounterArea />
      <ListArea title="المستوي الأول" />
      <ListArea title="المستوي الثاني" />
      <ListArea title="المستوي الثالث" />
    </>
  );
};

export default page;
