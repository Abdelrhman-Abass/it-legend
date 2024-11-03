"use client";
import React, { useEffect, useState } from "react";
import { blog_data } from "@/data";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "@/navigation";

const BlogMasonryArea = ({ showMore = false }) => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() => {
    const blogItems = blog_data.filter((blog) => blog?.blog_masonry);
    setBlogItems(blogItems);
  }, []);

  return (
    <section id="projects" className="section-gap-equal">
      <div className="container">
        <div
          className="g-5"
          id="masonry-gallery"
          data-aos-delay="100"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h3
            className="title"
            style={{ textAlign: "center", marginBottom: 70 }}
          >
            المشروعات اللي هتعملها أثناء الدبلومة دي
          </h3>

          <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 750: 2, 992: 3 }}>
            <Masonry gutter="30px">
              {blogItems.slice(0, 3).map((blog) => {
                const { id, img, desc, title, date, category, comment } = blog;
                return (
                  <div key={id}>
                    <div className="edu-blog blog-style-5">
                      <div className="inner">
                        <div className="thumbnail">
                          <Link href={`#`}>
                            <img src={img} alt="Blog Images" />
                          </Link>
                        </div>

                        <div className="content position-top">
                          <div className="read-more-btn">
                            <Link href={`#`} className="btn-icon-round">
                              <i className="icon-4"></i>
                            </Link>
                          </div>
                          <div className="category-wrap">
                            <a href="#" className="blog-category">
                              {category}
                            </a>
                          </div>
                          <h5 className="title">
                            <Link href={`#`}>{title}...</Link>
                          </h5>
                          <ul className="blog-meta">
                            <li>
                              <i className="icon-27"></i>
                              {date}
                            </li>
                          </ul>
                          <p>{desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          </ResponsiveMasonry>
        </div>
        <ul className="edu-pagination top-space-30"></ul>
        {showMore && (
          <Link href="/diploma-sales/1#projects" className="edu-btn">
            <i className="icon-4"></i>
            <span>المزيد من المشاريع</span>
          </Link>
        )}
      </div>
    </section>
  );
};

export default BlogMasonryArea;
