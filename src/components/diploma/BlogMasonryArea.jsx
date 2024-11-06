"use client";
import React, { useEffect, useState } from "react";
import { blog_data } from "@/data";
import { Link } from "@/navigation";

const BlogMasonryArea = ({ showMore = false }) => {
  const [blogItems, setBlogItems] = useState([]);
  const [columns, setColumns] = useState(3);

  // Handle responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) {
        setColumns(1);
      } else if (window.innerWidth < 992) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setBlogItems(blog_data.filter((blog) => blog?.blog_masonry));
  }, []);

  // Distribute items into columns
  const getColumnsContent = () => {
    const columnsContent = Array.from({ length: columns }, () => []);
    blogItems.slice(0, 3).forEach((item, index) => {
      columnsContent[index % columns].push(item);
    });
    return columnsContent;
  };

  const BlogCard = ({ blog }) => {
    const { id, img, desc, title, date, category } = blog;
    return (
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
    );
  };

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

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: `repeat(${columns}, 1fr)`,
              gap: '30px'
            }}
          >
            {getColumnsContent().map((column, columnIndex) => (
              <div key={columnIndex} className="masonry-column">
                {column.map((blog) => (
                  <div key={blog.id} style={{ marginBottom: '30px' }}>
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            ))}
          </div>
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
