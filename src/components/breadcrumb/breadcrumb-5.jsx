"use client";
import { Link } from "@/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useLocale } from "next-intl";

const CourseBreadcrumb = ({ course, subtitle }) => {
  const { title, instructor, language, rating_count } = course || {};
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const locale = useLocale();
  return (
    <div className="edu-breadcrumb-area breadcrumb-style-3">
      <div className="container">
        <div className="breadcrumb-inner">
          {/* <ul className="edu-breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">الرئيسة</Link>
            </li>
            <li className="separator">
              {locale == "ar" ? (
                <i className="icon-angle-left"></i>
              ) : (
                <i className="icon-angle-right"></i>
              )}
            </li>
            <li className="breadcrumb-item">
              <Link href="/courses">الكورسات</Link>
            </li>
            <li className="separator">
              {locale == "ar" ? (
                <i className="icon-angle-left"></i>
              ) : (
                <i className="icon-angle-right"></i>
              )}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {subtitle}
            </li>
          </ul> */}
          <div className="page-title" style={{ paddingTop: 32 }}>
            <h1 className="title" style={{ position: "relative", zIndex: 12 }}>
              {title}
            </h1>
          </div>
          <ul className="course-meta">
            <li>
              <i className="icon-58"></i>بواسطة {instructor}
            </li>
            <li>
              <i className="icon-59"></i>
              {language}
            </li>
            <li className="course-rating">
              <div className="rating">
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
                <i className="icon-23"></i>
              </div>
              <span className="rating-count">({rating_count} التقيمات)</span>
            </li>
          </ul>
        </div>
      </div>
      <ul className="shape-group">
        <li className="shape-1">
          <span></span>
        </li>
        <motion.li
          className="shape-2 scene"
          animate={{
            x: mouseReverse(40).x,
            y: mouseReverse(40).y,
          }}
        >
          <img src="/assets/images/about/shape-13.png" alt="shape" />
        </motion.li>
        <motion.li
          className="shape-3 scene"
          animate={{
            x: mouseDirection(40).x,
            y: mouseDirection(40).y,
          }}
        >
          <img src="/assets/images/about/shape-15.png" alt="shape" />
        </motion.li>
        <li className="shape-4">
          <span></span>
        </li>
        <motion.li
          className="shape-5 scene"
          animate={{
            x: mouseReverse(40).x,
            y: mouseReverse(40).y,
          }}
        >
          <img src="/assets/images/about/shape-07.png" alt="shape" />
        </motion.li>
      </ul>
    </div>
  );
};

export default CourseBreadcrumb;
