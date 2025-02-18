"use client";
import React, { useEffect } from "react";
import HeaderSection from "../common/headerSection/HeaderSection";
import CourseCard from "../common/courseCard/CourseCard";
import Button from "../common/button/Button";

import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useParams } from "next/navigation";
import { ICourseCard } from "@/app/types/Types";
import { useTranslations } from "next-intl";

export default function FreeDiploma() {
    const { locale } = useParams();
    const t = useTranslations();

    // Fetch category data
    const { data } = useQuery({
        queryKey: ["Category"],
        queryFn: () => getServerRequest("/Category"),
    });
    return (
        <section className="free_diploma p-lg py" id="free_diploma">
            {/* Header Section */}
            <HeaderSection title={t("diploma.title")} subTitle={t("diploma.subTitle")} />

            {/* Courses Container */}
            <div className="free_diploma_container">
                {data?.data?.data?.map((item: ICourseCard, index: number) => (
                    <CourseCard
                        url={`${locale}/diplomas/diploma-details/${4545}`}
                        key={index}
                        index={index}
                        btnText={t("common.showMoreDetails")}
                        titleAr={item.titleAr}
                        titleEn={item.titleEn}
                        shortDescriptionAr={item.shortDescriptionAr}
                        shortDescriptionEn={item.shortDescriptionEn}
                        lectures={item.lectures}
                        exams={item.exams}
                        summaries={item.summaries}
                        averageRating={item.averageRating}
                        categoryId={item.categoryId}
                        image={`https://itlegend.net/Content/Uploads/CategoryMedia/${item.image}`}
                    />
                ))}
            </div>

            {/* More Diplomas Button */}
            <div className="free_diploma_more f ac jc" style={{width: "fit-content" , marginInline:"auto"}}>
                <Button title={t("common.morePathes")} url={`${locale}/diplomas`} customClass="flip_icon white" />
            </div>
        </section>
    );
}
