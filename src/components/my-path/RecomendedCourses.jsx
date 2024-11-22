"use client";
import React from "react";
import { useState ,useEffect} from "react";
import { ArrowLeft } from "lucide-react";

import { course_data } from "@/data";
import CourseTypeSix from "../course/course-type-six";

const RecommendedCourses = ({
    my = false,
    recommend = false,
    title = null,
    coursePerView = 3,
}) => {
    const [next, setNext] = useState(coursePerView);
    const [courses, setCourses] = useState(course_data);
    const [direction, setDirection] = useState('rtl');


    // handleLoadData
    useEffect(() => {
        const htmlElement = document.documentElement; // or document.querySelector('html')
        const currentDirection = htmlElement.dir
        setDirection(currentDirection);
    }, [direction]);

    return (
        <div className="edu-course-area course-area-1 ">
            <div className="container">

                <div className="row g-5 ">
                    {courses?.slice(0, 3)?.map((course, idx) => (
                        <div key={course.id} className="col-md-6 col-lg-4">
                            <CourseTypeSix
                                my={my}
                                title={title}
                                data={course}
                                classes="course-box-shadow"
                                idx={idx}
                            />
                        </div>
                    ))}
                </div>


                <div
                    className="load-more-btn"
                    data-aos-delay="100"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                >
                    <a className="edu-btn" href="/courses" style={{ cursor: "pointer" }}>
                        {direction == "rtl" ? (
                            <ArrowLeft className="d-inline h-[20px]" />
                        ) : (
                            <i className="icon-4 mr-2"></i>
                        )}
                        <span>المزيد</span>
                    </a>
                </div>
            </div>

        </div>
    );
};

export default RecommendedCourses;
