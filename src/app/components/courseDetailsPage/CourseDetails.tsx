"use client";
import React from "react";
import AccordionItem from "../common/accordionItem/AccordionItem";
import CourseAccordion from "../courseAccordion/CourseAccordion";
import InstructorCard from "../common/instructorCard/InstructorCard";

export default function CourseDetails() {
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <div className="course_details ">
            <div className="course_details_header">
                <h2>Course Overview</h2>
                <p className="p1">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus aliquid dolorem iusto reiciendis minima optio odio officiis accusamus harum repellendus aspernatur, odit dolor
                    mollitia aut, quo voluptatibus impedit culpa officia beatae! Est iste, corrupti nemo atque quis quidem suscipit aliquid quod illo laboriosam vero autem perspiciatis harum mollitia,
                    ipsam eum quaerat ab doloremque consequuntur ut culpa consequatur numquam asperiores quo. Delectus odit deserunt nemo explicabo rem ratione, itaque ipsa veritatis velit provident
                    officia quas quibusdam doloremque, at tempore autem nostrum et quod. Quas rerum ab numquam asperiores temporibus totam! Beatae, facilis nemo. Ipsam, sapiente asperiores!
                    Necessitatibus distinctio praesentium officia beatae?
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
                {new Array(8).fill("").map((item, index) => (
                    <CourseAccordion key={index} />
                ))}
            </div>
            <div className="course_details_page_Instructor_Card ">
                <InstructorCard />
            </div>
        </div>
    );
}
