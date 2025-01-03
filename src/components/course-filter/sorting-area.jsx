"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { add_force_page, add_item_offset } from "@/store/features/filter-slice";
import Link from "next/link";

const SortingArea = ({
  course_items,
  num,
  setCourses,
  courses,
  course_list,
  items,
}) => {
  // const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   if (e.target.value === "Filters") {
  //     setCourses(course_items);
  //   } else if (e.target.value === "Low To High") {
  //     const lowToHigh = courses
  //       .slice()
  //       .sort(
  //         (a, b) => parseFloat(a.course_price) - parseFloat(b.course_price)
  //       );
  //     setCourses(lowToHigh);
  //   } else if (e.target.value === "High To Low") {
  //     const highToHigh = courses
  //       .slice()
  //       .sort(
  //         (a, b) => parseFloat(b.course_price) - parseFloat(a.course_price)
  //       );
  //     setCourses(highToHigh);
  //   }
  //   dispatch(add_item_offset(0));
  //   dispatch(add_force_page(0));
  // };

  return (
    <div className="edu-sorting-area">
      <div
        className="sorting-left"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        {items ? (
          <h6 className="showing-text">
            Showing <span>{num}</span> of <span>{items.length}</span> courses
          </h6>
        ) : (
          <h6 className="showing-text">
            عرض <span>{num}</span> كورسات
          </h6>
        )}
      </div>
      <div className="sorting-right">
          <div className="layout-switcher">
           <label>{course_list ? "List" : "Grid"}</label> 
          <ul className="switcher-btn">
            <li>
              <Link
                href="#"
                className={!course_list ? "active" : ""}
              >
                <i className="icon-53"></i>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className={course_list ? "active" : ""}
              >
                <i className="icon-54"></i>
              </Link>
            </li>
          </ul> 
        </div>
        <div className="edu-sorting">
          <div className="icon">
            <i className="icon-55"></i>
          </div>
          <select className="edu-select">
            <option>Filters</option>
            <option>Low To High</option>
            <option>High To Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortingArea;
