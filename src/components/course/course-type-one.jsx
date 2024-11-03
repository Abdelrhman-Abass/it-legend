"use client";
import { Link } from "@/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import {
  add_to_wishlist,
  wishlistItems,
} from "@/store/features/wishlist-slice";

const CourseTypeOne = ({
  data,
  classes,
  image_location_path = "01",
  bg,
  my,
}) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const wishlists = useSelector(wishlistItems);
  const isWishlistSelected = wishlists.find(
    (w) => Number(w.id) === Number(data.id)
  );

  const handleWishlist = (course_item) => {
    if (wishlists.find((i) => i.id === course_item.id)) {
      dispatch(
        add_to_wishlist({
          change_type: "remove_wishlist",
          item: {
            id: course_item.id,
            img: `/assets/images/course/course-06/${course_item.img}`,
            title: course_item.title,
            price: course_item.course_price,
          },
        })
      );
    } else {
      dispatch(
        add_to_wishlist({
          change_type: "add_wishlist",
          item: {
            id: course_item.id,
            img: `/assets/images/course/course-06/${course_item.img}`,
            title: course_item.title,
            price: course_item.course_price,
          },
        })
      );
    }
  };

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
      style={{ backgroundColor: bg }}
      className={`edu-course course-style-1 ${
        classes ? classes : undefined
      } hover-button-bg-white`}
    >
      <div className="inner">
        <div className="thumbnail">
          <Link
            href={my ? `/diploma/${data.id}` : `/diploma-details/${data.id}`}
          >
            <img
              src={`/assets/images/course/course-${image_location_path}/${data.img}`}
              alt="Course Meta"
            />
          </Link>
          <div className="time-top">
            <span className="duration">
              <i className="icon-61"></i> <span>{data.duration}</span>{" "}
              <span>اسابيع</span>
            </span>
          </div>
        </div>
        <div className="content">
          <span className="course-level">{data.level}</span>
          <h6 className="title">
            <a href="#">{data.title}</a>
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
              ({data.rating} /{data.rating_count} تقيمات)
            </span>
          </div>
          <div className="course-price">${data.course_price}</div>
          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lesson}</span>{" "}
              <span>المحاضرات</span>
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-25"></i>
              {data.student} طالب
            </li>
          </ul>
        </div>
      </div>

      <div className="course-hover-content-wrapper">
        <button
          onClick={() => handleWishlist(data)}
          className={`wishlist-btn ${
            isWishlistSelected ? "active" : undefined
          }`}
        >
          <i className="icon-22"></i>
        </button>
      </div>

      <div className="course-hover-content">
        <div className="content">
          <button
            onClick={() => handleWishlist(data)}
            className={`wishlist-btn ${
              isWishlistSelected ? "active" : undefined
            }`}
          >
            <i className="icon-22"></i>
          </button>
          <span className="course-level">{data.level}</span>
          <h6 className="title">
            <Link
              href={my ? `/diploma/${data.id}` : `/diploma-details/${data.id}`}
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
              ({data.rating} /{data.rating_count} تقيمات)
            </span>
          </div>
          <div className="course-price">${data.course_price}</div>
          <p>{data.short_desc}</p>
          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lesson}</span>{" "}
              <span>المحاضرات</span>
            </li>
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-25"></i>
              {data.student} طالب
            </li>
          </ul>
          <Link
            href={my ? `/diploma/${data.id}` : `/diploma-details/${data.id}`}
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
