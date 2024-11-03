import React from "react";
import useModal from "../../../hooks/use-modal";
import { Books } from "@/svg";
import VideoModal from "../popup-modal/video-modal";
import { useDispatch, useSelector } from "react-redux";
import { cart_course } from "@/store/features/cart-slice";

const CourseDetailsSidebar = ({ course, details_2 = false }) => {
  const {
    img,
    certificate,
    videoId,
    course_price,
    instructor,
    duration,
    student,
    language,
  } = course || {};
  const { isVideoOpen, setIsVideoOpen } = useModal();

  const { cartCourses } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // handle add to cart
  const handleAddToCart = () => {
    dispatch(
      cart_course({
        id: 3101,
        img: `/assets/images/course/course-06/course-01.jpg`,
        price: 132,
        title: "تطبيقات الهاتف",
      })
    );
  };
  return (
    <>
      <div
        className={`course-sidebar-3 ${
          details_2 ? undefined : "sidebar-top-position"
        }`}
      >
        <div className="edu-course-widget widget-course-summery">
          <div className="inner">
            <div className="thumbnail">
              <img
                src={`/assets/images/course/course-01/${img}`}
                alt="Course Thumb"
              />
              <a
                onClick={() => setIsVideoOpen(true)}
                style={{ cursor: "pointer" }}
                className="play-btn video-popup-activation"
              >
                <i className="icon-18"></i>
              </a>
            </div>
            <div className="content">
              <h4 className="widget-title">محتويات الكورس:</h4>
              <ul className="course-item">
                <li>
                  <span className="label">
                    <i className="icon-60"></i>السعر:
                  </span>
                  <span className="value price">${course_price}</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-62"></i>المدرب:
                  </span>
                  <span className="value">{instructor}</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-61"></i>المدة:
                  </span>
                  <span className="value"> {duration} اسابيع </span>
                </li>

                <li>
                  <span className="label">
                    <Books />
                    الدروس:
                  </span>
                  <span className="value">8</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-63"></i>الملتحقين:
                  </span>
                  <span className="value">{student} طالب</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-59"></i>اللغة:
                  </span>
                  <span className="value">{language}</span>
                </li>

                <li>
                  <span className="label">
                    <i className="icon-64"></i>شهاردة:
                  </span>
                  <span className="value">
                    {certificate == "yes" ? "نعم" : "لا"}
                  </span>
                </li>
              </ul>

              <div className="read-more-btn">
                <a
                  onClick={handleAddToCart}
                  className="edu-btn"
                  style={{ justifyContent: "center", cursor: "pointer" }}
                >
                  احصل عليه الان<i className="icon-4"></i>
                </a>
              </div>

              {/* <div className="share-area">
                <h4 className="title">Share On:</h4>
                <ul className="social-share">
                  <li>
                    <a href="#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-linkedin2"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
      />
      {/* video modal end */}
    </>
  );
};

export default CourseDetailsSidebar;
