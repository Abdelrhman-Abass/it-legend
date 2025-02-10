import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";

export default function CourseAccordion() {
    return (
        <div className="course_accordion">
            <div className="course_accordion_header f ac jb">
                <h5>C# Basics</h5>
                <div className="course_accordion_header_icon">
                    <FaPlus />
                </div>
            </div>
            <div className="course_accordion_lectures">
                {new Array(8).fill("").map((item, index) => (
                    <div className="course_accordion_lectures_item f ac jb" key={index}>
                        <div className="course_accordion_lectures_item_icon f ac">
                            <MdOutlineOndemandVideo />
                            <h6>Lecture {index + 1}</h6>
                        </div>
                        <span>20 minutes</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
