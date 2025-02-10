"use client";
import React from "react";
import WrapperSelect from "../common/wrapperSelect/WrapperSelect";
import { useTranslations } from "next-intl";
import CardsLayout from "../common/cardsLayout/CardsLayout";
import CourseCard from "../common/courseCard/CourseCard";
import GridToggle from "@/app/store/GridToggle";
import { IoMdCart } from "react-icons/io";
import Button from "../common/button/Button";
import { TbReload } from "react-icons/tb";

export default function CoursesContainer() {
    const t = useTranslations();
    const { type } = GridToggle();
    return (
        <section  className="courses_container p-lg py">
            <div className="courses_container_header f jb ac">
                <h2  >
                    {t("common.offering")} <span>64</span> {t("common.courses")}
                </h2>
                <div className="courses_container_header_layout f ac">
                    <CardsLayout />
                    <WrapperSelect />
                </div>
            </div>
            <div className={`courses_container_cards ${`_${type}`}`}>
                {new Array(8).fill("").map((item, index) => (
                    <CourseCard key={index} btnText="Add to Cart" customIcon={<IoMdCart />} />
                ))}
            </div>
            <div className="courses_container_cards_btn f ac jc">
                <Button title="View More Courses" url="#" customIcon={<TbReload />} red />
            </div>
        </section>
    );
}
