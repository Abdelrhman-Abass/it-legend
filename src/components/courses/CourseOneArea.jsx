"use client";
import React, { useEffect, useState } from "react";
import { course_data } from "@/data";
import CourseTypeSix from "../course/course-type-six";
import SortingArea from "../course-filter/sorting-area";
import { Link } from "@/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import { useLocale } from "next-intl";
import CourseTypeOne from "@/components/course/course-type-one";

const CourseOneArea = ({
  my = false,
  recommend = false,
  title = null,
  coursePerView = 6,
  coursesData = [],
  items,
}) => {
  const [next, setNext] = useState(coursePerView);
  const [courses, setCourses] = useState(coursesData);
  const [boxes, setBoxes] = useState("List");
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const locale = useLocale();

  function toFixedNumber(value, decimalPlaces = 2) {
    if (typeof value === "string") {
      // Try converting the string to a number
      value = parseFloat(value);
      if (isNaN(value)) {
        throw new Error("Invalid number input");
      }
    }

    if (typeof value === "number") {
      // Return the fixed number with the specified decimal places
      return parseFloat(value.toFixed(decimalPlaces));
    }

    throw new Error("Input must be a number or a string representing a number");
  }
  useEffect(()=>{
    if(window.innerWidth < 768){
      setBoxes("List")
    }
  },[boxes])

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.coursId,
        img: `https://www.itlegend.net/Content/Uploads/CategoryMedia/${course.image}`,
        price: course.salesPrice,
        title: locale == "ar" ? course.titleAr : course.titleEn,
      })
    );
  };
  // console.log("Courses type:", typeof courses); // Debugging

  if (!Array.isArray(courses) || courses.length === 0) {
    return null; // Show nothing if courses is not an array or empty
  }

  const handleLoadData = () => {
    setNext((prev) => prev + 3);
  };

  return (
    <div className="edu-course-area course-area-1 gap-tb-text">
      <div className="container">
        {courses.length > 0 && (
          <>
            {title && <h3 className="title">{title}</h3>}
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
                    عرض <span>{courses.length}</span> دبلومات
                  </h6>
                )}
              </div>
              <div className="sorting-right">
                <div className="layout-switcher">
                  {/* <label>{boxes ? "List" : "Grid"}</label> */}
                  <ul className="switcher-btn">
                    <li>
                      <Link
                        href="#"
                        className={boxes=="List" ? "active" : ""}
                        onClick={()=>{setBoxes("List")}}
                      >
                        <i className="icon-53"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className={boxes== "Grid" ? "active" : ""}
                        onClick={()=>{setBoxes("Grid")}}

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
            
            <div className="row g-5">
              {courses.slice(0, next).map((diploma, idx) => {
                return boxes=="List" ?(
                    <div
                      className="col-md-6 col-lg-4"
                      data-aos-delay="150"
                      data-aos="fade-up"
                      data-aos-duration="800"
                      key={diploma.categoryId}
                    >
                      <CourseTypeOne
                        bg="#f5f1eb"
                        my={false}
                        data={diploma}
                        image_location_path="02"
                      />
                    </div>
                  
                ) : (
                  <div
                    key={idx}
                    className="edu-blog blog-style-list"
                    data-aos-delay="150"
                    data-aos="fade-up"
                    data-aos-duration="800"
                  >
                    <div className="inner">
                      <div className="thumbnail">
                        <a href={`/diploma-details/${diploma.categoryId}`}>
                          <img
                            src={`https://www.itlegend.net/Content/Uploads/CategoryMedia/${diploma.image}`}
                            alt="Blog Images"
                            className="lg:w-[280px]"
                          />
                        </a>
                      </div>
                      <div className="content">
                        {/* <span className="course-level">{locale == "ar" ? diploma.levelTitleAr : course.levelTitleEn}</span> */}

                        <h5 className="title">
                          <a href={`/course-details/${diploma.categoryId}`}>
                            {locale == "ar" ? diploma.titleAr : diploma.titleEn}
                          </a>
                        </h5>
                        <p className="truncate-text">
                          {locale == "ar" ? diploma.shortDescriptionAr : diploma.shortDescriptionEn}
                        </p>
                        <div className="course-rating">
                          <div className="rating">
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                            <i className="icon-23"></i>
                          </div>
                          <span className="rating-count">
                            ({toFixedNumber(diploma.averageRating)} /5 التقيمات)
                          </span>
                        </div>
                        <div className="read-more-btn">
                          <a
                            href={
                              my &&
                              `/${locale}/course-player/c84e7902-1205-426f-a857-922bedd84bdf`
                            }
                            className="edu-btn btn-small btn-secondary"
                            onClick={() => !my && handleAddToCart(diploma)}
                            style={{ cursor: "pointer" }}
                          >
                            {my ? (
                              <>انتقل</>
                            ) : (
                              <>
                                {cartCourses.some((item) => item.id === diploma.categoryId)
                                  ? "حذف من السلة"
                                  : "اضف الي السلة"}
                                <i className="icon-4"></i>
                              </>
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {next < courses.length && (
              <div
                onClick={handleLoadData}
                className="load-more-btn mb-[50px]"
                data-aos-delay="100"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                <a className="edu-btn" style={{ cursor: "pointer" }}>
                  المزيد <i className="icon-56"></i>
                </a>
              </div>

            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseOneArea;
