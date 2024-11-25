"use client";
import React from "react";
import { Link } from "@/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { cart_course } from "@/store/features/cart-slice";
// import { useLocale } from "next-intl";

const CourseTypeEleven = ({ data, classes, my, idx }) => {
  // const { cartCourses } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  // const locale = useLocale();

  // handle add to cart
  console.log(data)
  // const handleAddToCart = (course) => {
  //   dispatch(
  //     cart_course({
  //       id: course.id,
  //       img: `/assets/images/course/course-06/${course.img}`,
  //       price: course.course_price,
  //       title: course.title,
  //     })
  //   );
  // };

  return (
    <div
      className={`edu-course course-style-3 ${classes ? classes : undefined}`}
      data-aos="fade-up"
      data-aos-duration="700"
      data-aos-delay={300 + (idx + 1) * 300}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link
            href={
              my
                ? `/course-player/c84e7902-1205-426f-a857-922bedd84bdf`
                : `/course-details/${data.courseId}`
            }
          >
            <img
              src={`/assets/images/course/course-04/course-01.jpg`}
              alt="Course Meta"
            />
          </Link>
          <div className="time-top">
            <span className="duration_1">
              45%
              {/* <i className="icon-61"></i> */}
            </span>
          </div>
        </div>

        <div className="content">
          <span className="course-level">{data.levelTitleAr}</span>
          <h5 className="title">
            <Link
              href={
                my
                  ? `/diploma/${data.courseId}`
                  : `/course-details/${data.courseId}`
              }
            >
              {data.title}
            </Link>
          </h5>
          <p className="truncate-text">{data.shortDescriptionAr}</p>
          

          <div className="read-more-btn">
            <Link
              href={
                my &&
                `/diploma/${data.courseId}`
              }
              className="edu-btn btn-small btn-secondary"
              style={{ cursor: "pointer" }}
            >
                <>انتقل</>
              
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseTypeEleven;
