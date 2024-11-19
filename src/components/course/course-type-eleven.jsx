"use client";
import React from "react";
import { Link } from "@/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import { useLocale } from "next-intl";

const CourseTypeEleven = ({ data, classes, my, idx }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const locale = useLocale();

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.id,
        img: `/assets/images/course/course-06/${course.img}`,
        price: course.course_price,
        title: course.title,
      })
    );
  };

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
                : `/course-details/${data.id}`
            }
          >
            <img
              src={`/assets/images/course/course-04/${data.img}`}
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
          <span className="course-level">{data.level}</span>
          <h5 className="title">
            <Link
              href={
                my
                  ? `/course-player/c84e7902-1205-426f-a857-922bedd84bdf`
                  : `/course-details/${data.id}`
              }
            >
              {data.title}
            </Link>
          </h5>
          <p>{data.short_desc}</p>
          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count">
              ({data.rating} /{data.rating_count} التقيمات)
            </span>
          </div>

          <div className="read-more-btn">
            <a
              href={
                my &&
                `/${locale}/course-player/c84e7902-1205-426f-a857-922bedd84bdf`
              }
              className="edu-btn btn-small btn-secondary"
              onClick={() => !my && handleAddToCart(data)}
              style={{ cursor: "pointer" }}
            >
              {my ? (
                <>انتقل</>
              ) : (
                <>
                  {cartCourses.some((item) => item.id === data.id)
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
};
export default CourseTypeEleven;
