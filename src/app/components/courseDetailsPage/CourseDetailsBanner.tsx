import Link from "next/link";
import React from "react";
import { FaStar, FaUserTie } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

export default function CourseDetailsBanner() {
    return (
        <div className="course_details_banner  p-lg">
            <div className="course_details_banner_breadcrumb f ac">
                <Link href="/">Home</Link>
                <MdKeyboardArrowRight />
                <Link href="/courses">Courses</Link>
                <MdKeyboardArrowRight />
                <span>C# Course</span>
            </div>
            <h2>Javascript Fundamital</h2>
            <div className="course_details_banner_overview f">
                <div className="overview f ac">
                    <FaUserTie />
                    <span>By Ali Shaheen</span>
                </div>
                <div className="overview f ac">
                    <TbWorld />
                    <span>Arabic</span>
                </div>
                <div className="overview f ac">
                    <div className="overview_rate f">{new Array(5).fill(0).map((_, index) => (index >= 3 ? <FaStar key={index} /> : <FaStar key={index} className="gold" />))}</div>
                    <span>(8 Rate)</span>
                </div>
            </div>
        </div>
    );
}
