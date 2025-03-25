"use client";
import React, { useState } from "react";
import WrapperSelect from "../common/wrapperSelect/WrapperSelect";
import { useTranslations } from "next-intl";
import CardsLayout from "../common/cardsLayout/CardsLayout";
import CourseCard from "../common/courseCard/CourseCard";
import GridToggle from "@/app/store/GridToggle";
import { IoMdCart } from "react-icons/io";
import Button from "../common/button/Button";
import { TbReload } from "react-icons/tb";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import NewLoader from "../common/newLoader/NewLoader";
import { Course } from "@/app/types/Types";



export default function CoursesContainer() {
    const t = useTranslations();
    const { type } = GridToggle();
    const { locale } = useParams();

    // State to manage the number of courses displayed
    const [visibleCourses, setVisibleCourses] = useState(9);

    const [filter, setFilter] = useState("all"); // "all", "free", or "paid"

    // Fetch courses using React Query
    // const { data: courses, isLoading, error } = useQuery({
    //     queryKey: ["courses"],
    //     queryFn: async () => {
    //         const response = await getServerRequest("/Course");
    //         return response.data.data || [];
    //     },
    // });

    // Handle loading and error states
   

    // Filter courses based on the selected filter
    
    // Fetch courses using React Query
    const { data :courses, isLoading, error } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await getServerRequest("/Course");
            return response.data.data || [];
        },
    });
    
    const filteredCourses = courses?.filter((course:Course) => {
        if (filter === "free") {
            return course.price === 0; // Free courses have a price of 0
        } else if (filter === "paid") {
            return course.price > 0; // Paid courses have a price greater than 0
        }
        return true; // Show all courses if filter is "all"
    });
    // Handle loading and error states
    // if (isLoading) {
    //     return <NewLoader loading={isLoading} />;
    // }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // const courses = data?.data;

    // Function to load more courses
    const loadMoreCourses = () => {
        setVisibleCourses((prev) => prev + 6); // Add 6 more courses
    };

    return (
        <section className="courses_container p-lg py">
            {isLoading ? (<NewLoader loading={isLoading} />) : (
                <>
                    <div className="courses_container_header f jb ac">
                        <h2>
                            {t("common.offering")} <span>{filteredCourses.length}</span> {t("common.courses")}
                        </h2>
                        <div className="courses_container_header_layout f ac">
                            <CardsLayout />
                            <WrapperSelect  setFilter={setFilter}/>
                        </div>
                    </div>


                    <div className={`courses_container_cards ${`_${type}`}`}>
                        {filteredCourses.slice(0, visibleCourses).map((course: Course, index: number) => (
                            <CourseCard
                                key={index}
                                hideItems={false}
                                titleAr={course.titleAr}
                                titleEn={course.titleEn}
                                shortDescriptionAr={course.shortDescriptionAr}
                                shortDescriptionEn={course.shortDescriptionEn}
                                btnText={t("diplomaDetails.footer.btn")}
                                customClass={type === "line" ? "course_dip" : ""}
                                image={`https://itlegend.net/Content/Uploads/CoursesMedia/${course.image}`}
                                url={`/${locale}/courses/course-details/${course.categoryId}`}
                                lectures={course.lectures}
                                exams={course.exams}
                                averageRating={course.averageRating}
                            />
                        ))}
                    </div>

                    <div className="courses_container_cards_btn f ac jc">
                        {visibleCourses < courses.length && ( // Show the button only if there are more courses to load
                            <Button
                                title="View More Courses"
                                onClick={loadMoreCourses} // Call loadMoreCourses on button click
                                customIcon={<TbReload />}
                                red
                            />
                        )}
                    </div>
                </>
            )
            }
        </section >
    );
}