"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMouseMoveUI } from "@/contexts/mouse-move-context";
import VideoModal from "../common/popup-modal/video-modal";
import { AutoPlay } from "swiper"; // Import the Autoplay module
import { Swiper, SwiperSlide } from "swiper/react";

const contents = {
  pre_title: "الآراء",
  title: (
    <>
      ارأء من درسوا الدبلومة <br /> من طلابنا
    </>
  ),
  // desc: "Lorem ipsum dolor sit amet consectur adipiscing elit sed eiusmod tempor incidid unt labore dolore magna aliquaenim minim.",
  testimonial_items: [
    {
      type: 1,
      logo: "/assets/images/testimonial/logo-01.png",
      desc: "الدبلومة كانت تجربة رائعة، حيث تعلمت الكثير عن تطوير التطبيقات بطرق ممتعة وفعالة، وأصبحت أملك المهارات اللازمة.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-01.png",
      name: "أحمد العلي",
      title: "طالب",
    },
    {
      type: 2,
      id: "WQt6mzH2CNI",
      logo: "/assets/images/testimonial/logo-01.png",
      desc: "لقد زودتني الدبلومة بالمعرفة والمهارات اللازمة للعمل في مجال التصميم وتطوير التطبيقات، وساعدتني على تعزيز إبداعي.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-02.png",
      name: "منى الجابر",
      title: "مصممة",
    },
    {
      type: 1,
      logo: "/assets/images/testimonial/logo-01.png",
      desc: "التعليم العملي والدعم من المدربين جعلني أشعر بالثقة في تطوير التطبيقات، وفتح لي آفاق جديدة في هذا المجال.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-03.png",
      name: "فاطمة الحسن",
      title: "مطورة",
    },
    {
      type: 2,
      id: "WQt6mzH2CNI",
      logo: "/assets/images/testimonial/logo-01.png",
      desc: "أوصي بهذه الدبلومة بشدة، لقد غيرت حياتي المهنية للأفضل، وساعدتني في تحقيق أهدافي بشكل أسرع وأسهل.",
      ratings: [1, 2, 3, 4, 5],
      img: "/assets/images/testimonial/testimonial-04.png",
      name: "علي السعيد",
      title: "صانع محتوى",
    },
  ],
};

const { desc, pre_title, testimonial_items, title } = contents;

const Testimonial = ({ about_p_2 }) => {
  const { mouseDirection, mouseReverse } = useMouseMoveUI();
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState("WQt6mzH2CNI");
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <div
        className={`testimonial-area-2 ${
          about_p_2 ? "edu-section-gap" : "section-gap-large"
        }`}
      >
        <div className="container edublink-animated-shape">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className="section-title section-center"
                data-aos-delay="150"
                data-aos="fade-up"
                data-aos-duration="800"
              >
                <span className="pre-title">{pre_title}</span>
                <h2 className="title">{title}</h2>
                <span className="shape-line">
                  <i className="icon-19"></i>
                </span>
              </div>
            </div>
          </div>
          {isMounted && (
            <Swiper
              className="testimonial-activation swiper"
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              grabCursor={true}
              modules={[Autoplay]}
              speed={1000}
              autoplay={{ delay: 1500, disableOnInteraction: false }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
            >
              {testimonial_items.map((item, i) => {
                const { desc, img, logo, name, ratings, title, type, id } =
                  item;
                return (
                  <SwiperSlide key={i} style={{ alignItems: "center" }}>
                    {type == 1 ? (
                      <div className="testimonial-slide">
                        <div className="content">
                          <div className="logo">
                            <img src={logo} alt="Logo" />
                          </div>
                          <p>{desc}</p>
                          <div className="rating-icon">
                            {ratings.map((r) => (
                              <i key={r} className="icon-23"></i>
                            ))}
                          </div>
                          <div
                            className="author-info"
                            style={{ paddingTop: 8 }}
                          >
                            <div className="thumb">
                              <img src={img} alt="Testimonial" />
                            </div>
                            <div className="info">
                              <h5 className="title">{name}</h5>
                              <span className="subtitle">{title}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="testimonial-slide">
                        <div className="content">
                          <div className="row justify-content-center">
                            <div
                              className="video-gallery"
                              style={{
                                position: "relative",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <div className="thumbnail">
                                <img
                                  src={thumbnail}
                                  alt="Thumb"
                                  style={{
                                    width: "100%",
                                    borderRadius: 0,
                                  }}
                                />
                                <button
                                  onClick={() => setIsVideoOpen(true)}
                                  className="video-play-btn video-popup-activation"
                                >
                                  <i className="icon-18"></i>
                                </button>
                              </div>
                              <div className="video-overlay"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <div className="swiper-pagination"></div>
          <ul className="shape-group">
            <motion.li
              className="shape-1 scene"
              data-aos-delay="200"
              data-aos="fade"
              data-aos-duration="1000"
              animate={{
                x: mouseReverse(25).x,
                y: mouseReverse(25).y,
              }}
            >
              <img src="/assets/images/about/shape-30.png" alt="Shape" />
            </motion.li>
            <motion.li
              className="shape-2 scene"
              data-aos-delay="200"
              data-aos="fade"
              data-aos-duration="1000"
              animate={{
                x: mouseDirection(25).x,
                y: mouseDirection(25).y,
              }}
            >
              <img src="/assets/images/about/shape-25.png" alt="Shape" />
            </motion.li>
          </ul>
        </div>
        <ul className="shape-group">
          <li
            className="shape-3"
            data-aos-delay="200"
            data-aos="fade"
            data-aos-duration="1000"
          >
            <img
              className="d-block-shape-light"
              src="/assets/images/others/map-shape-3.png"
              alt="Shape"
            />
            <img
              className="d-none-shape-dark"
              src="/assets/images/others/dark-map-2-shape-3.png"
              alt="Shape"
            />
          </li>
        </ul>
      </div>
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
      />
    </>
  );
};

export default Testimonial;
