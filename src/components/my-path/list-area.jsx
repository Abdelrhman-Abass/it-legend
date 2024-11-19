import React from "react";
import { course_data } from "@/data";
import { Link } from "@/navigation";

const ListArea = ({ title }) => {
  return (
    <section>
      <div className="container">
        <h4 className="title">{title}</h4>
        <div className="row row--30" style={{ justifyContent: "center" }}>
          <div className="col-10">
            {course_data.slice(0, 3).map((blog) => {
              const { id, img, title, date, course_desc, comment } = blog;
              return (
                <div
                  key={id}
                  className="edu-blog blog-style-list"
                  data-aos-delay="150"
                  data-aos="fade-up"
                  data-aos-duration="800"
                >
                  <div className="inner">
                    <div className="thumbnail">
                      <Link
                        href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}
                      >
                        <img
                          src={"/assets/images/blog/blog-25.jpg"}
                          alt="Blog Images"
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
                      <h5 className="title">
                        <Link
                          href={`/course-player/c84e7902-1205-426f-a857-922bedd84bdf}`}
                        >
                          {title}...
                        </Link>
                      </h5>
                      {/* <ul className="blog-meta">
                        <li>
                          <i className="icon-27"></i>
                          {date}
                        </li>
                        <li>
                          <i className="icon-28"></i>Com {comment}
                        </li>
                      </ul> */}
                      <p>{course_desc}</p>
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListArea;
