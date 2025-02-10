"use client";
import React from "react";
import Button from "../common/button/Button";
import { useTranslations } from "next-intl";
import { FaPhone } from "react-icons/fa";
import Image from "next/image";
import useThemeProvider from "@/app/store/ThemeProvider";

export default function HomeBanner() {
    const t = useTranslations();
    return (
        <section className="homeBanner p-lg f jb">
            {/* Content Section */}
            <div className="homeBanner_content f f-column">
                <h1>
                    {t("homeBanner.Platform")} <span>ITLegend</span> {t("homeBanner.Educational")}
                </h1>
                <p>
                    {t("homeBanner.desc")}
                    <br />
                    <strong>{t("homeBanner.desc2")}</strong>
                </p>
                <Button title={t("homeBanner.btn")} customClass="flip_icon" aria-label={t("homeBanner.btn")} />
            </div>

            {/* Image Section */}
            <div className="homeBanner_images f">
                {/* Small Image */}
                <div className="homeBanner_images_sm banner_iamges aspect-ratio">
                    <Image
                        src="https://img.freepik.com/free-photo/happy-young-male-model-holding-notebooks-showing-thumb-up-pleased-smiling-recommending-courses-standing-blue-background_1258-65336.jpg"
                        alt={"homeBanner_images_sm"}
                        fill
                        priority
                        quality={75}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Large Image */}
                <div className="homeBanner_images_lg banner_iamges aspect-ratio">
                    <Image
                        src="https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg"
                        alt={"homeBanner_images_sm"}
                        fill
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>

                {/* Contact Section */}
                <a href="tel:+0123456789" className="homeBanner_images_content f ac" aria-label={t("homeBanner.for_contact")}>
                    <div className="homeBanner_images_content_icon">
                        <FaPhone />
                    </div>
                    <div className="homeBanner_images_content_tel f f-column">
                        <span>{t("homeBanner.for_contact")}</span>
                        <span>+012 (345) 6789</span>
                    </div>
                </a>
            </div>
        </section>
    );
}
