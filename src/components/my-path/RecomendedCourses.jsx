"use client";
import React from "react";
import { useState ,useEffect} from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter ,Link } from "@/navigation";


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
    const router = useRouter();



    // handleLoadData
    useEffect(() => {
        const htmlElement = document.documentElement; // or document.querySelector('html')
        const currentDirection = htmlElement.dir
        setDirection(currentDirection);
    }, [direction]);

    return (
        <div className="edu-course-area course-area-1 ">
            <div className="container">
            {title && <h3 className="title">{title}</h3>}

                <div className="row g-5 ">
                    {courses?.slice(0, 6)?.map((course, idx) => (
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
                    data-aos-delay="100"
                    data-aos="fade-up"
                    data-aos-duration="1200"
                >
                    <Link className="edu-btn" href="/courses" style={{ cursor: "pointer" }}>
                        {direction == "rtl" ? (
                            <ArrowLeft className="d-inline h-[20px]" />
                        ) : (
                            <i className="icon-4 mr-2"></i>
                        )}
                        <span>المزيد</span>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default RecommendedCourses;
