"use client";
import React from "react";
import AccordionItem from "../common/accordionItem/AccordionItem";
import CourseAccordion from "../courseAccordion/CourseAccordion";
import InstructorCard from "../common/instructorCard/InstructorCard";
import CoursePlayerAccordion from "../common/coursePlayerAccordion/CoursePlayerAccordion";

export default function CourseDetails() {
    const demoVideosItems = [
        {
            moduleTitleAr: "الوحدة ١",
            moduleTitleEn: "Module 1",
            moduleOrder: 1,
            nodes: [
                {
                    nodeId: "vid1",
                    contentId: "c1",
                    titleAr: "مقدمة",
                    titleEn: "Introduction",
                    displayOrder: 1,
                    type: 0,
                    isWatched: false,
                    isFree: true,
                    duration: "5:30",
                },
                {
                    nodeId: "vid2",
                    contentId: "c2",
                    titleAr: "أساسيات",
                    titleEn: "Basics",
                    displayOrder: 2,
                    type: 0,
                    isWatched: true,
                    duration: "10:45",
                },
            ],
        },
    ];
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div className="course_details ">
            <div className="course_details_header">
                <h2>Course Overview</h2>
                <p className="p1">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid sint reprehenderit assumenda officiis error earum voluptatem neque cum. Sed modi dolores vero illo, culpa ullam
                    unde maiores ut. Natus ipsam numquam quas laudantium! Illo voluptatibus quos velit placeat exercitationem repellat.
                </p>
            </div>
            <div className="course_details_points">
                <h3>What we Learn ?</h3>
                <div className="course_details_points_container f">
                    {new Array(8).fill("").map((item, index) => (
                        <p className="p1" key={index}>
                            Lorem ipsum dolor sit amet consectetur.
                        </p>
                    ))}
                </div>
            </div>
            <div className="course_details_page_content">
                <h4>Course Content :</h4>
                <CoursePlayerAccordion
                    videosItems={demoVideosItems}
                    videoCommentsMutation={null} // Pass null if an empty string is not allowed
                />
            </div>
            <div className="course_details_page_Instructor_Card ">
                <InstructorCard />
            </div>
        </div>
    );
}
