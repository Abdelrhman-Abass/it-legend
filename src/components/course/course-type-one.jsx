"use client";
import { Link } from "@/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import Image from "next/image";
import { useTranslations } from "next-intl";


const CourseTypeOne = ({
  data,
  classes,
  image_location_path = "01",
  bg,
  my=false,
}) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const t = useTranslations("home.learningPathsArea");

  const dispatch = useDispatch();
  
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

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.id,
        img: `https://www.itlegend.net/Content/Uploads/CategoryMedia/${course.image}`,
        price: course.course_price,
        title: course.title,
      })
    );
  };

  return (
    <div
      // style={{ backgroundColor: bg }}
      className={`edu-course course-style-1 ${
        classes ? classes : undefined
      } hover-button-bg-white`}
    >
      <div className="inner">
        <div className="thumbnail" >
          <Link
            href={my ? `/diploma/${data.categoryId}` : `/diploma-details/${data.categoryId}`}
          >
            <Image
              src={`https://www.itlegend.net/Content/Uploads/CategoryMedia/${data.image}`}
              alt="Course Meta"
              width={370}
              height={220}
              loading="lazy"
            />
          </Link>
          {/* <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i> <span>{data.duration}</span>{" "}
              <span>اسابيع</span>
            </span>
          </div> */}
        </div>
        <div className="content">
          {/* <span className="course-level">{data.titleAr}</span> */}
          <h6 className="title">
            <a href="#">{data.titleAr}</a>
          </h6>
          <p className="truncate-text">{data.shortDescriptionAr}</p>

          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count">
              ({toFixedNumber(data.averageRating)} / 5 {t("reviwes")})
            </span>
          </div>
          {/* <div className="course-price">${data.course_price}</div> */}
          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lectures}</span>{" "}
              <span>{t("lectures")}</span>
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <i className="icon-25"></i>
              {data.exams} {t("exams")}
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 1,
                alignItems: "center",
              }}
            >
              <i className="icon-36"></i>
              {data.summaries} {t("summary")}
            </li>
          </ul>
        </div>
      </div>

      <div className="course-hover-content-wrapper">
        
      </div>

      <div className="course-hover-content">
        <div className="content">
          
          {/* <span className="course-level">{data.level}</span> */}
          <h6 className="title">
            <Link
              href={my ? `/diploma-details/${data.categoryId}` : `/diploma-details/${data.categoryId}`}
            >
              {data.title}
            </Link>
          </h6>
          <div className="course-rating">
            <div className="rating">
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
              <i className="icon-23"></i>
            </div>
            <span className="rating-count">
              ({toFixedNumber(data.averageRating)} / 5 {t("reviwes")})
            </span>
          </div>
          {/* <div className="course-price">${data.course_price}</div> */}
          <p className="truncate-text">{data.shortDescriptionAr}</p>
          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lectures}</span>{" "}
              <span>{t("lectures")}</span>
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <i className="icon-25"></i>
              {data.exams} {t("exams")}
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              <i className="icon-36"></i>
              {data.summaries} {t("summary")}
            </li>
          </ul>
          <Link
            href={my ? `/diploma-details/${data.categoryId}` : `/diploma-details/${data.categoryId}`}
            className="edu-btn btn-secondary btn-small"
          >
            {my ? <>ابدأ</> : <> مزيد من المعلومات</>}
            <i className="icon-4"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseTypeOne;
