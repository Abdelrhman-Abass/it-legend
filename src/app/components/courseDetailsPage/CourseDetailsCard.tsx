import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdPriceCheck } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { LiaCertificateSolid } from "react-icons/lia";
import Button from "../common/button/Button";

export default function CourseDetailsCard() {
    return (
        <aside className="course_details_card">
            <div className="course_details_card_image"></div>
            <h3>Course Content :</h3>
            <div className="course_details_card_info">
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <MdPriceCheck />
                        <span>price</span>
                    </div>
                    <span className="red">$500</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <FaUserTie />
                        <span>Instrutor</span>
                    </div>
                    <span>Ali Shaheen</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <MdOutlineAccessTimeFilled />
                        <span>Duration</span>
                    </div>
                    <span>4 Months</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <GiWhiteBook />
                        <span>Lectures</span>
                    </div>
                    <span>8</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <FaUsers />
                        <span>Students</span>
                    </div>
                    <span>8 Students</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <LiaCertificateSolid />

                        <span>Certifications</span>
                    </div>
                    <span>Yes</span>
                </div>
            </div>
            <div className="course_details_card_btn">
                <Button title="Enroll Now"/>
            </div>
        </aside>
    );
}
