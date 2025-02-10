import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsCalendar2Date } from "react-icons/bs";
import { IoArrowForwardOutline } from "react-icons/io5";

export default function ProjectCard() {
    return (
        <div className="project_card">
            <div className="project_card_image">
                <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} alt="project_card_image" fill/>
            </div>
            <div className="project_card_content">
                <Link href={"#"} >
                    <IoArrowForwardOutline />
                </Link>
                <span>Medical</span>
                <h4>Project Name</h4>
                <div className="project_card_content_date">
                    <BsCalendar2Date />
                    <p className="p1">Sep 20, 2023</p>
                </div>
                <p className="p1 project_card_content_desc" >Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </div>
    );
}
