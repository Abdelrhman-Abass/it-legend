"use client";
import { Link } from "@/navigation";
import React from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import { useLocale } from "next-intl";

const BreadcrumbThree = ({ title, subtitle }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const locale = useLocale();
  return (
    <div className="edu-breadcrumb-area">
      <div className="container">
        <div className="breadcrumb-inner">
          <div className="page-title">
            <h1 className="title">{title}</h1>
          </div>
          <ul className="edu-breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">الرئيسية</Link>
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

export default BreadcrumbThree;
