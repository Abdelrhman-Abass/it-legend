"use client";
import { Link } from "@/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";
import Image from "next/image";

const CourseDiploma = ({
  data,
  classes,
  image_location_path = "01",
  bg,
  my,
}) => {
  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  
  

  // handle add to cart
  const handleAddToCart = (course) => {
    dispatch(
      cart_course({
        id: course.id,
        img: `/assets/images/course/course-06/course-01`,
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
              // src={`http://49.13.77.125:1118/Content/Uploads/CategoryMedia/${data.image}`}
              src={`/assets/images/course/course-01/course-01.jpg`}
              alt="Course Meta"
              width={370}
              height={220}
              loading="lazy"
            />
          </Link>
          <div className="time-top">
            <span className="duration_1">
               <span>45%</span>
            </span>
          </div>
        </div>
        <div className="content">
          {/* <span className="course-level">{data.level}</span> */}
          <h6 className="title">
            <a href="#">{data.titleAr}</a>
          </h6>
          <p className="truncate-text">{data.shortDescriptionAr ? data.shortDescriptionAr : "No description available"}</p>

          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lectures}</span>{" "}
              <span>المحاضرات</span>
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
              href={my ? `/diploma/${data.categoryId}` : `/diploma-details/${data.categoryId}`}
            >
              {data.titleAr}
            </Link>
          </h6>
          
          <p>{data.shortDescriptionAr ? data.shortDescriptionAr : "No description available"}</p>
          <ul className="course-meta">
            <li
              style={{
                display: "inline-flex",
                gap: 4,
                alignItems: "center",
              }}
            >
              <i className="icon-24"></i> <span>{data.lectures}</span>{" "}
              <span>المحاضرات</span>
            </li>
            
          </ul>
          <Link
            href={my ? `/diploma/${data.categoryId}` : `/diploma-details/${data.categoryId}`}
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

export default CourseDiploma;
