"use client"
import React, { useState, useEffect } from "react";
import { course_data } from "@/data";
import { Link } from "@/navigation";
import CourseDiploma from "@/components/course/CourseDiploma";
// import CourseDiploma from "../course/CourseDiploma";
import { useDispatch, useSelector } from "react-redux";
import { UserDiploma } from "../../store/features/diploma-slice";
import {
  selectDiploma,
  selectDiplomaStatus,
  selectDiplomaError,
} from "../../store/features/diploma-slice";

const ListArea = ({ title }) => {
  const [cour, setCour] = useState([]);

  const dispatch = useDispatch();

  const diploma = useSelector(selectDiploma) || []; // Ensure it's always an array
  const status = useSelector(selectDiplomaStatus);
  const error = useSelector(selectDiplomaError);
  const courseTest =
    [
      {
        "courseId": "602d090f-ef57-464a-b724-0bf57ae9cdc3",
        "titleAr": "HTML | Two Projects",
        "titleEn": "HTML | Two Projects",
        "shortDescriptionAr": "1. تعلم اساسات تصميم المواقع وانشاء مشروعين متكاملين\n تصميم موقعين متكاملين \n     - موقع افلام كرتون \n     -  تصميم موقع مطعم الكترونى",
        "shortDescriptionEn": "Learn website design with HTML CSS and build two websites\nfirst website is Animy Website\nSecond website is Restaurant website",
        "image": "d647c8e5-c0f1-4992-9c55-a1e64a539e4b.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.465909,
        "lectures": 44,
        "exams": 0,
        "progressPercentage": 0
      },
      {
        "courseId": "c7f5bfef-8117-4021-b83e-448051bced9a",
        "titleAr": "C# Basics",
        "titleEn": "C# Basics",
        "shortDescriptionAr": "كورس أساسيات لغة السي شارب المستوى الأول هو نقطة الانطلاق المثالية لمسيرتك في عالم البرمجة. \nتعلم اللغة لأكثر شيوعا على مستوى العالم ومفتاحك لدخول كافة مجالات البرمجة الرائدة عالميا.\n",
        "shortDescriptionEn": "The C# Basics Course, Level 1, is the ideal starting point for your career in the world of programming.\nLearn the most common language in the world and your key to entering all the world's leading pro",
        "image": "24d47750-5cb9-4170-be34-99075536853c.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.462992,
        "lectures": 372,
        "exams": 24,
        "progressPercentage": 12.257685927577327
      },
      {
        "courseId": "3447ff38-1809-4495-bfbd-6a3da119ca0a",
        "titleAr": "Web Development with Asp.Net Core",
        "titleEn": "Web Development with Asp.Net Core",
        "shortDescriptionAr": "هذه الدورة هي بوابتك  المثالية لاكتساب مهارات تطوير مواقع الويب الحديثة باستخدام إطار العمل الأشهر .asp.net\n\nدليلك العملي الشامل نحو كيفية تركيب التصاميم بدقة والتعامل مع قواعد البيانات بكفاءة واستخدام أساليب حماية التطبيقات بفاعلية\n\n",
        "shortDescriptionEn": "This course is your ideal gateway to acquiring modern website development skills using the most famous .asp.net framework\nYour comprehensive practical guide to how to install designs accurately, deal with databases efficiently, and use application protection methods effectively\n",
        "image": "dc86041b-119a-4013-8cae-b3dc18249684.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.344919,
        "lectures": 196,
        "exams": 10,
        "progressPercentage": 6.706455641982992
      },
      {
        "courseId": "6c719fa0-70ea-41cc-bfb1-972482285d23",
        "titleAr": "Web Development with Asp.Net Core Training",
        "titleEn": "Web Development with Asp.Net Core Training",
        "shortDescriptionAr": "هذه الدورة هي بوابتك  المثالية لاكتساب مهارات تطوير مواقع الويب الحديثة باستخدام إطار العمل الأشهر .asp.net\n\nدليلك العملي الشامل نحو كيفية تركيب التصاميم بدقة والتعامل مع قواعد البيانات بكفاءة واستخدام أساليب حماية التطبيقات بفاعلية\n\n",
        "shortDescriptionEn": "This course is your ideal gateway to acquiring modern website development skills using the most famous .asp.net framework\nYour comprehensive practical guide to how to install designs accurately, deal with databases efficiently, and use application protection methods effectively\n",
        "image": "b45b6cff-f943-443a-80bf-3a6878a4a676.jpg",
        "levelId": "b9f2f3eb-7c5e-4799-7ef4-08da1c0984d9",
        "levelOrder": 0,
        "levelTitleAr": "مبتدئ",
        "levelTitleEn": "مبتدئ",
        "averageRating": 3.713903,
        "lectures": 48,
        "exams": 0,
        "progressPercentage": 0.9205917692990128
      },
      {
        "courseId": "0d693845-141c-4ced-93d8-b30a37844ad9",
        "titleAr": "C# OOP Old 2021",
        "titleEn": "C# OOP Old 2021",
        "shortDescriptionAr": "كورس السي شارب المستوى الثاني هو فرصتك المثالية لتجاوز الأساسيات والتعمق في فهم وإتقان لغة C# اعتمادا على مفاهيم البرمجة الكائنية التوجه كالكائنات والفئات والوراثة والتغليف والتجريد",
        "shortDescriptionEn": "The C# Level 2 course is your ideal opportunity to go beyond the basics and delve deeper into understanding and mastering the C# language based on object-oriented programming concepts such as objects",
        "image": "2bfd53cb-dab8-4ce0-b171-a2ecdc79ffbd.jpg",
        "levelId": "37966ce2-a3c6-408c-a827-fd6f30130a55",
        "levelOrder": 0,
        "levelTitleAr": "متوسط",
        "levelTitleEn": "متوسط",
        "averageRating": 3.374579,
        "lectures": 123,
        "exams": 0,
        "progressPercentage": 0
      }
    ]

  useEffect(() => {
    dispatch(UserDiploma());
  }, [dispatch]);

  useEffect(() => {
    console.log("Courses Status:", status);
    if (status === "succeeded") {
      console.log("Courses Data:", diploma);

    }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, diploma, error]);

  return (
    <section >
      <div className="container">
        <div
          className="section-title section-center"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h2 className="title">دبلوماتي</h2>
          <span className="shape-line">
            <i className="icon-19"></i>
          </span>
        </div>
        <h4 className="title">{title}</h4>
        <div className="pr-[70px] pl-[70px] row row--30 desktop" style={{ justifyContent: "center" }}>
          <div className=" px-[60px]">
            {status === "loading" && (
              <p className="loading-text">Loading...</p>
            )}
            {/* {status === "succeeded" && diploma.map((course, idx) => ( */}
            {courseTest.map((course, idx) => (
              <div
                key={idx}
                className="edu-blog blog-style-list"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <div className="inner">
                  <div className="thumbnail">
                    <Link href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}>
                      <img
                        // src={`http://49.13.77.125:1118/Content/Uploads/CategoryMedia/${course.image}`}
                        src={`/assets/images/course/course-01/course-01.jpg`}
                        alt="Blog Images"
                      />
                    </Link>
                    <div className="time-top">
                      <span className="duration_1">
                        45%
                      </span>
                    </div>
                  </div>
                  <div className="content">
                    <h5 className="title">
                      <Link href={`/diploma/${course.categoryId}`}>
                        {course.titleAr}...
                      </Link>
                    </h5>
                    <p>{course.shortDescriptionAr ? course.shortDescriptionAr : "No description available"}</p>
                    <div className="read-more-btn">
                      <Link
                        href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}
                        className="edu-btn btn-border btn-medium"
                      >
                        ابدا الان <i className="icon-4"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {status === "failed" && (
              <p className="error-text">Failed to load courses. Please try again.</p>
            )}
          </div>
        </div>

        <div className="row g-5 mobile ">
          {status === "loading" && (
            <p className="loading-text">Loading...</p>
          )}


          {/* {status === "succeeded" &&
            diploma.map((course, idx) => ( */}
          {
            courseTest.map((course, idx) => (
              <div
                className="col-md-6 col-lg-4"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
                key={idx}
              >
                <CourseDiploma
                  bg="#f5f1eb"
                  my={true}
                  data={course}
                  image_location_path="02"
                />
              </div>
            ))}

          {status === "failed" && (
            <p className="error-text">Failed to load courses. Please try again.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ListArea;
