"use client";
import React from "react";
import { Link } from "@/navigation";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import { useLocale } from "next-intl";
import { Rate } from "antd";
import Image from "next/image";

const CourseTypeSix = ({ data, classes, my = false, idx }) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const locale = useLocale();

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.coursId,
        img: `https://www.itlegend.net/Content/Uploads/CoursesMedia/${course.image}`,
        price: course.salesPrice,
        title: locale == "ar" ? course.titleAr : course.titleEn,
      })
    );
  };
  function toFixedNumber(value, decimalPlaces = 1) {
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
            <Image
              src={`https://www.itlegend.net/Content/Uploads/CoursesMedia/${data.image}`}
              alt="Course Meta"
              width={200}
              height={200}
              className="h-[200px]"
            />
          </Link>
          {/* <div className="time-top">
            <span className="duration">
              {data.lectures}
              <i className="icon-61"></i>
            </span>
          </div> */}
        </div>

        <div className="content">
          <h5 className="title">
            <Link
              href={
                my
                  ? `/course-player/c84e7902-1205-426f-a857-922bedd84bdf`
                  : `/course-details/${data.courseId}`
              }
            >
              {data.titleAr}
            </Link>
          </h5>
          <span className="course-level">{locale == "ar" ? data.levelTitleAr : data.levelTitleEn}</span>
          <p className={`truncate-text h-[50px]`}>{locale == "ar" ? data.shortDescriptionAr : data.shortDescriptionEn}</p>
          {data.price >0 ? (
            (data.salesPrice ? <><span className="line-through  mx-[10px]">{data.price}$</span>  <span>{data.salesPrice}$</span></> : <p>{data.price}</p>)
          ) :(
            <p>Free</p>
          )}
          <div className="course-rating">
            <div className="rating">
              {/* <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i> */}
              <Rate disabled allowHalf defaultValue={toFixedNumber(data.averageRating)} />

            </div>

            <span className="rating-count">
              ({toFixedNumber(data.averageRating)} /5 التقيمات)
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
                  {cartCourses.some((item) => item.id === data.courseId)
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
export default CourseTypeSix;
