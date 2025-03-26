"use client";
import React from "react";
import AccordionItem from "../common/accordionItem/AccordionItem";
import CourseAccordion from "../courseAccordion/CourseAccordion";
import InstructorCard from "../common/instructorCard/InstructorCard";
import CoursePlayerAccordion from "../common/coursePlayerAccordion/CoursePlayerAccordion";
import { CourseFeatures, Module } from "@/app/types/Types";
import { useParams } from "next/navigation";

interface MyComponentProps {
    features: CourseFeatures[];
    nodes: Module[];
    slug: string;
    courseOverView: string;
}

const CourseDetails : React.FC<MyComponentProps> = ({features ,nodes ,slug , courseOverView}) =>{
// export default function CourseDetails : React.FC<MyComponentProps>({features} : {features : any}) {
    const { locale } = useParams();
    
    // console.log(nodes)
   
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div className="course_details ">
            <div className="course_details_header">
                <h2>Course Overview</h2>
                <p className="p1">
                    {courseOverView}
                </p>
            </div>
            {features.length > 0 && (
                <div className="course_details_points">
                    <h3>What we Learn </h3>
                    <div className="course_details_points_container f">
                        {features.map((item, index) => (
                            <p className="p1" key={index}>
                                {locale == "ar" ? item.featureTextAr : item.featureTextEn}
                            </p>
                        ))}
                    </div>
                </div>

            )}
            
            <div className="course_details_page_content">
                <h4>Course Content :</h4>
                <CourseAccordion
                    videosItems={nodes}
                    videoCommentsMutation={null} // Pass null if an empty string is not allowed
                    slug={slug}
                />
            </div>
            <div className="course_details_page_Instructor_Card ">
                <InstructorCard />
            </div>
        </div>
    );
}


export default CourseDetails;