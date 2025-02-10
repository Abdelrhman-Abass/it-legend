"use client";
import React from "react";
import Button from "../common/button/Button";
import GeneralVideo from "../common/generalVideo/GeneralVideo";
import { IoIosArrowRoundDown } from "react-icons/io";
import HeaderSection from "../common/headerSection/HeaderSection";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CourseBannerDetails from "../courseBannerDetails/CourseBannerDetails";

export default function CourseBanner({ videoLink }: { videoLink: string }) {
    const t = useTranslations();
    return (
        <section className="course_banner py p-lg">
            <div className="course_banner_header p-lg py">
                <h2>
                    <span>{t("homeCourse.success")}</span> {t("homeCourse.title")}
                </h2>
                <div>
                    <h2>{t("homeCourse.btn")} </h2>
                </div>
            </div>
            <div>
                <GeneralVideo videoLink={videoLink} controls={true} />
            </div>
            <CourseBannerDetails
                bgImg="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                smImg="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                title={t("homeCourse.title2")}
                subTitle={t("homeCourse.subTitle")}
                subTitle2={t("homeCourse.desc")}
                point1={t("homeCourse.point1")}
                point2={t("homeCourse.point2")}
                point3={t("homeCourse.point3")}
            />
        </section>
    );
}
