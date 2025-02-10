import React from "react";
import GeneralVideo from "../common/generalVideo/GeneralVideo";
import DiplomaDetailsAbout from "../diplomaDetailsAbout/DiplomaDetailsAbout";
import CourseBannerDetails from "../courseBannerDetails/CourseBannerDetails";
import { useTranslations } from "next-intl";
import HeaderSection from "../common/headerSection/HeaderSection";
import Image from "next/image";
import BenfitsCard from "../benfitsCard/BenfitsCard";

export default function DiplomaDetailsVideo({ scrollToEleRef }: any) {
    const t = useTranslations();
    return (
        <section className="diploma_details_video" ref={scrollToEleRef}>
            <GeneralVideo videoLink="https://www.youtube.com/watch?v=fgG4xvYLzgk&t=3s" />
            <DiplomaDetailsAbout />
            <div className=" py p-lg">
                <CourseBannerDetails
                    bgImg="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                    smImg="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                    title={"Diploma Jobs"}
                    subTitle={t("homeCourse.subTitle")}
                    subTitle2={t("homeCourse.desc")}
                    point1={t("homeCourse.point1")}
                    point2={t("homeCourse.point2")}
                    point3={t("homeCourse.point3")}
                />
            </div>
            <div className="diploma_details_video_tech py p-lg">
                <HeaderSection title={t("diplomaDetails.tech.title")} subTitle={t("diplomaDetails.tech.subTitle")} subTitle2={t("diplomaDetails.tech.desc")} showDescription />
                <div className="diploma_details_video_tech_items">
                    {new Array(8).fill(0).map((item, index) => (
                        <div className="tech_item" key={index} >
                            <Image src={`/assets/images/diploma/angular.svg`} alt="angular" width={80} height={80} fetchPriority="low" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="traits_section py p-lg">
                <HeaderSection
                title={t("diplomaDetails.traits.title")}
                subTitle={t("diplomaDetails.traits.subTitle")}
                />
                <div className="traits_section_container">
                {new Array(6).fill(0).map((item, index) => (
                    <BenfitsCard title="الإبداع" subTitle="يساعدك على ابتكار أفكار جديدة وحلول مبتكرة." index={index} key={index} customClass="traits_mask"  />
                ))}
                </div>
            </div>
            <div className="diploma_details_info p-lg ">
                <div className="diploma_details_info_image">
                    <Image src="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996" alt="diploma_details_info" fill />
                </div>
                <div className="diploma_details_info_content py">
                    <h3>{t("diplomaDetails.info.title")}</h3>
                    <p className="p1">{t("diplomaDetails.info.desc")}</p>
                </div>
            </div>
        </section>
    );
}
