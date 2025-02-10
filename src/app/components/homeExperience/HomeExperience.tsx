"use client";
import React from "react";
import ExperienceCard from "./ExperienceCard";
import Image from "next/image";
import { useTranslations } from "next-intl";
export default function HomeExperience() {
    const t =useTranslations()
    const experienceData = [
    {
        id: Math.random().toString(),
        title: t("experienceCard.title1"),
        sub_title: t("experienceCard.years"),
        number: 15,
    },
    {
        id: Math.random().toString(),
        title: t("experienceCard.title2"),
        sub_title: t("experienceCard.Thousand"),
        number: 30,
    },
    {
        id: Math.random().toString(),
        title: t("experienceCard.title3"),
        sub_title: t("experienceCard.years"),
        number: 5,
    },
    {
        id: Math.random().toString(),
        title: t("experienceCard.title4"),
        sub_title: t("experienceCard.years"),
        number: 3,
    },
];
    return (
        <section className={`home-experience p-lg py`}>
            <div className="home-experience_container f">
                {experienceData.map((item, index) => (
                    <ExperienceCard key={index} index={index} title={item.title} subTitle={item.sub_title} count={item.number} />
                ))}
            </div>
            <div className="home-experience_content f ac">
                <div className="home-experience_content_image">
                    {/* <div variants={eleFVariants} className="home-experience_content_image_circleShape">
                        <Image src="/assets/images/shape-5.png" alt="logo" width={200} height={200} />
                    </div>
                    <div variants={eleFVariants} className="home-experience_content_image_circleShape">
                        <Image src="/assets/images/shape7.png" alt="logo" width={250} height={250} />
                    </div>
                    <div variants={eleFVariants} className="home-experience_content_image_circleShape">
                        <Image src="/assets/images/shape3.png" alt="logo" width={150} height={150} />
                    </div> */}
                    <div className="home-experience_content_image_banner" >
                        <Image
                            src="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                            alt="logo"
                            fill
                        />
                    </div>
                    <div className="home-experience_content_image_card" >
                        <div className="circle"></div>
                        <strong>{t("experienceCard.ali") }</strong>
                        <p className="p1">{t("experienceCard.ali_exp") }</p>
                    </div>
                </div>
                <div className="home-experience_content_text" >
                    <h2 >{t("experienceCard.titleHead") }</h2>
                    <p className="p1" >
                       {t("experienceCard.desc")}
                    </p>
                </div>
            </div>
        </section>
    );
}
