"use client"
import SingleAccordion from "./single-accordion";
import { FilePen, FileText, FileVideo, Paperclip } from "lucide-react";
import { useLocale } from "next-intl";
import React, { useState } from "react";

const Test = ({ course, courses, features }) => {
  const {
    course_desc,
    course_desc_2,
    learn_list,
    course_desc_3,
    curriculum_desc,
    course_lessons,
    instructor_img,
    instructor_title,
    instructor_desc,
    social_links,
    reviews,
    instructor,
    rating,
    rating_count,
  } = course || {};
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleAccordionToggle = (idx) => {
    setOpenAccordion((prevIndex) => (prevIndex === idx ? null : idx));
  };
  const locale = useLocale()

  return (
    <div className="course-details-content course-details-2">
      {/* 1 */}
      <div className="course-overview">
        <h3
          className="heading-title"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          حول هذه الدورة
        </h3>
        <p data-aos-delay="150" data-aos="fade-up" data-aos-duration="800">
          {course_desc}
        </p>
        <p data-aos-delay="150" data-aos="fade-up" data-aos-duration="800">
          {course_desc_2}
        </p>
        <div className="border-box">
          <h5
            className="title"
            data-aos-delay="150"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            ماذا سوف تتعلم؟
          </h5>
          <div className="row g-5">
            {/* First column - First half of the features */}
            <div
              className="col-lg-6"
              data-aos-delay="150"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <ul>
                {features.slice(0, Math.ceil(features.length / 2)).map((feat, idx) => (
                  <li key={idx}>
                    {locale === 'ar' ? feat.featureTextAr : feat.featureTextEn}
                  </li>
                ))}
              </ul>
            </div>

            {/* Second column - Second half of the features */}
            <div
              className="col-lg-6"
              data-aos-delay="150"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <ul>
                {features.slice(Math.ceil(features.length / 2)).map((feat, idx) => (
                  <li key={idx}>
                    {locale === 'ar' ? feat.featureTextAr : feat.featureTextEn}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="course-curriculam mb--90">
        <h3
          className="heading-title"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          محتوي الكورس
        </h3>
        {/* <p data-aos-delay="150" data-aos="fade-up" data-aos-duration="800">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor inc idid unt ut labore et dolore magna aliqua.
        </p> */}
        <div
          className="accordion edu-accordion"
          id="accordionExample"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          {
            courses.map((course, idx) => (

              // <Test testData={course} key={idx}/> https://it-legend-rrkg.vercel.app/ar/course-player/c84e7902-1205-426f-a857-922bedd84bdf?type=0&no=fef68bd2-7540-44d4-b8fd-c35b9f2dd839
              <div className="accordion edu-accordion" id="accordionExample" key={idx}>
                <div className="accordion-item">
                  <h3 className="accordion-header" id={`heading-${idx}`}>
                    <button
                      className={`accordion-button ${openAccordion === idx ? "" : "collapsed"}`}
                      type="button"
                      onClick={() => handleAccordionToggle(idx)}
                      aria-expanded={openAccordion === idx ? "true" : "false"}
                    >
                      <span style={{ textAlign: "start" }}>
                        {course.moduleTitleAr}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`module-${idx}`}
                    className={`accordion-collapse ${openAccordion === idx ? "show" : "collapse"}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="course-lesson course-deatail ">
                        <ul>
                          {course.nodes.map((node, i) => {
                            const {
                              titleAr = "No Title Available",
                              titleEn = "No English Title",
                              nodeId = `node-${i}`,
                              type = 0,
                              isWatched = false,
                              isPassed = false,
                              duration = "Unknown Duration",
                              questionCount = 0,
                              contentId = null,
                            } = node || {}; // Handle null or undefined `node`

                            return (
                              <li
                                // style={{ color: isWatched || watchedNodes[nodeId] ? "#6ABD8A" : undefined }}
                                // className={nodeId == activeNode ? "active" : ""}
                                key={nodeId}
                                onClick={() => handleNodeIdChange(nodeId)}
                              >
                                <div className="text d-flex align-items-center" >
                                  <span style={{ margin: "0 4px 4px" }}>
                                    {type === 1 || type === 2 ? (
                                      <FilePen size={20} />
                                    ) : type === 3 ? (
                                      <Paperclip size={20} />
                                    ) : type === 4 ? (
                                      <FileText size={20} />
                                    ) : (
                                      <FileVideo size={20} />
                                    )}
                                  </span>
                                  <span >
                                    {/* <a href={`/ar/course-player/${course.courseId}?type=${type}&no=${nodeId}`}> */}
                                    {titleAr}
                                    {/* </a> */}
                                  </span>
                                </div>
                                {type === 0 && <span className="duration-node">{duration}</span>}
                                {type === 4 && (
                                  <div className="badge-list">
                                    <span className="badge badge-secondary">
                                      {questionCount} أسئلة
                                    </span>
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* 3 */}
      <div
        className="course-instructor-wrap mb--90"
        data-aos-delay="150"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h3 className="heading-title">المدرب</h3>
        <div className="course-instructor">
          <div className="thumbnail">
            <img
              src={`/assets/images/team/team-02/${instructor_img}`}
              alt="team images"
            />
          </div>

          <div className="author-content">
            <h6 className="title">{instructor}</h6>
            <span className="subtitle">{instructor_title}</span>
            <p>{instructor_desc}</p>
            <ul className="social-share">
              {social_links?.map((social, i) => (
                <li key={i}>
                  <a
                    href={social.link}
                    target={social.target ? social.target : ""}
                  >
                    <i className={social.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* 4 */}
      <div
        className="course-review"
        data-aos-delay="150"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h3
          className="heading-title"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          المتطلبات
        </h3>
        <ul
          className="mb--90"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <li>الوقت والتفرغ للكورس</li>
          <li>اجادة اللغة الانجليزية</li>
          <li>معرفة اساسيات البرمجة</li>
        </ul>

        <h3
          className="heading-title"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          الجمهور المستهدف
        </h3>
        <ul
          className="mb--90"
          data-aos-delay="150"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <li>من تعلم الاساسيات ويرد التقدم</li>
          <li>من بحث عن فرصه عمل ولم يستطع مواكبة السوق الفعلي</li>
          <li>المتدربين تحت الخبرة</li>
        </ul>
      </div>
    </div>
  );
};

export default Test;
