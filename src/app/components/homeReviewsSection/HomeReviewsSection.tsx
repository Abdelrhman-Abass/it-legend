import React from "react";
import HeaderSection from "../common/headerSection/HeaderSection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReviewCard from "../common/reviewCard/ReviewCard";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
export default function HomeReviewsSection() {
    const reviewsData = [
        {
            id: Math.random().toString(),
            name: "علي كامل",
            job: "طالب",
            comment: "استاذ محترف جدا وبسبب التقييمات العالية والتواصل العالي والتقييمات العالية والتواصل العالي",
            video: null,
        },
        {
            id: Math.random().toString(),
            name: "Joe",
            job: "طالب",
            comment: null,
            video: "https://www.youtube.com/embed/WQt6mzH2CNI?si=N84PMImNd4xG2pt7",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
        {
            id: Math.random().toString(),
            name: "ali",
            job: "طالب",
            comment: null,
            video: "https://youtu.be/IwtkCGhZP-A?si=4GVQ6LveyQrBEb-u",
        },
    ];
    return (
        <section className="home_reviews_section p-lg py">
            <HeaderSection title="Reviews" />
            {/* <div className="home_reviews_section_swiper_paginations f ac jb">
                <div className="swiper_navigation f ac">
                    <div className="swiper_navigation_icon _prev f ac jc">
                        <IoIosArrowRoundBack />
                    </div>
                    <div className="swiper_navigation_icon _next f ac jc">
                        <IoIosArrowRoundForward />
                    </div>
                </div>
            </div> */}
            <div className="home_reviews_section_swiper">
                <Swiper
                    loop
                    modules={[Navigation, Pagination, Autoplay]}
                    pagination={{
                        type: "bullets",
                        el: ".swiper_pagination_count",
                    }}
                    navigation={{
                        nextEl: "._next",
                        prevEl: "._prev",
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        reverseDirection: false,
                    }}
                    speed={900}
                    spaceBetween={20}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}>
                    {reviewsData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <ReviewCard item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="swiper_pagination">
                <span className="swiper_pagination_count"></span>
            </div>
        </section>
    );
}
