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



export default function DiplomaContainer() {
    const t = useTranslations();
    const { type } = GridToggle();
    const { locale } = useParams();

    // State to manage the number of courses displayed
    const [visibleCourses, setVisibleCourses] = useState(9);

    // Fetch courses using React Query
    const { data, isLoading, error } = useQuery({
        queryKey: ["category"],
        queryFn: async () => {
            const response = await getServerRequest("/Category");
            return response.data || [];
        },
    });

    // Handle loading and error states
    // if (isLoading) {
    //     return <NewLoader loading={isLoading} />;
    // }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const category = data?.data;
    console.log("category", category);

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
                            {t("common.offering")} <span>{category.length}</span> {t("common.courses")}
                        </h2>
                        <div className="courses_container_header_layout f ac">
                            <CardsLayout />
                            <WrapperSelect />
                        </div>
                    </div>


                    <div className={`courses_container_cards ${`_${type}`}`}>
                        {category.slice(0, visibleCourses).map((category: any, index: number) => (
                            <CourseCard
                                key={index}
                                hideItems={false}
                                titleAr={category.titleAr}
                                titleEn={category.titleEn}
                                shortDescriptionAr={category.shortDescriptionAr}
                                shortDescriptionEn={category.shortDescriptionEn}
                                btnText={t("diplomaDetails.footer.btn")}
                                customClass={type === "line" ? "course_dip" : ""}
                                image={`https://itlegend.net/Content/Uploads/CoursesMedia/${category.image}`}
                                url={`/${locale}/diploma/diploma-details/${category.categoryId}`}
                                lectures={category.lectures}
                                exams={category.exams}
                                averageRating={category.averageRating}
                            />
                        ))}
                    </div>

                    <div className="courses_container_cards_btn f ac jc">
                        {visibleCourses < category.length && ( // Show the button only if there are more courses to load
                            <Button
                                title="View More Courses"
                                onClick={loadMoreCourses} // Call loadMoreCourses on button click
                                customIcon={<TbReload />}
                                red
                            />
                        )}
                    </div>
                </>
            )}
        </section>
    );
}