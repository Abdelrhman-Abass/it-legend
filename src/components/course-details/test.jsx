import React from "react";
import SingleAccordion from "./single-accordion";

const Test = ({ course }) => {
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
            <div
              className="col-lg-6"
              data-aos-delay="150"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <ul>
                <li>
                  أساسيات التصميم: فهم المبادئ الأساسية لتصميم واجهات المستخدم
                  وتجربة المستخدم.
                </li>
                <li>
                  أدوات التصميم: التعرف على أدوات التصميم الشائعة مثل Figma
                  وAdobe XD وكيفية استخدامها بكفاءة.
                </li>
              </ul>
            </div>

            <div
              className="col-lg-6"
              data-aos-delay="150"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <ul>
                <li>
                  تقنيات التصميم المتجاوب: تعلم كيفية إنشاء تخطيطات متجاوبة تعمل
                  على مختلف الأجهزة والشاشات.
                </li>
                <li>
                  مشاريع تطبيقية: تطوير مشاريع حقيقية لتطبيق المهارات المكتسبة
                  وبناء محفظة مهنية قوية.
                </li>
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
          <SingleAccordion
            show={true}
            id="1"
            title="Course Introduction"
            desc={[
              { title: "Introduction", icon: "icon-68" },
              { title: "Course Overview", icon: "icon-68" },
              {
                title: "Course Overview",
                badge_list: true,
                question: 0,
                minutes: 10,
              },
              {
                title: "Course Exercise / Reference Files",
                icon: "icon-68",
              },
              {
                title: "Code Editor Installation (Optional if you have one)",
                icon: "icon-68",
              },
              { title: "Embedding PHP in HTML", icon: "icon-68" },
            ]}
          />
          <SingleAccordion
            id="2"
            title="JavaScript Language Basics"
            desc={[
              { title: "Introduction", icon: "icon-68" },
              { title: "Course Overview", icon: "icon-68" },
              {
                title: "Course Overview",
                badge_list: true,
                question: 2,
                minutes: 12,
              },
              {
                title: "Course Exercise / Reference Files",
                icon: "icon-68",
              },
              {
                title: "Code Editor Installation (Optional if you have one)",
                icon: "icon-68",
              },
              { title: "Embedding PHP in HTML", icon: "icon-68" },
            ]}
          />
          <SingleAccordion
            id="3"
            title="Components & Databinding"
            desc={[
              { title: "Introduction", icon: "icon-68" },
              { title: "Course Overview", icon: "icon-68" },
              {
                title: "Course Overview",
                badge_list: true,
                question: 4,
                minutes: 15,
              },
              {
                title: "Course Exercise / Reference Files",
                icon: "icon-68",
              },
              {
                title: "Code Editor Installation (Optional if you have one)",
                icon: "icon-68",
              },
              { title: "Embedding PHP in HTML", icon: "icon-68" },
            ]}
          />
          <SingleAccordion
            id="4"
            title="Product Management Leadership"
            desc={[
              { title: "Introduction", icon: "icon-68" },
              { title: "Course Overview", icon: "icon-68" },
              {
                title: "Course Overview",
                badge_list: true,
                question: 6,
                minutes: 18,
              },
              {
                title: "Course Exercise / Reference Files",
                icon: "icon-68",
              },
              {
                title: "Code Editor Installation (Optional if you have one)",
                icon: "icon-68",
              },
              { title: "Embedding PHP in HTML", icon: "icon-68" },
            ]}
          />
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
