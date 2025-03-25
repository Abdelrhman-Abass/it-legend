import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";
import { FiSun } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function CoursePlayerHeader({ nodeType, theme, toggleTheme, diplomaRoute, storedCourse }: any) {
    const { videoName } = GenralCoursePlayerId();
    const t = useTranslations();
    const { locale } = useParams();
    return (
        <section className="course_player_header_info p-lg f ac jb" style={{ overflow: nodeType === 1 ? "hidden" : "visible" }}>
            <div>
                <div className="course_player_header_breadcrumb f ac">
                    <Link href="/learn-path">{t("menu.learn_pathes")}</Link>
                    <MdKeyboardArrowRight />

                    {storedCourse && (
                        <>
                            <Link href={`/${diplomaRoute}`}>{locale === "ar" ? storedCourse.categoryTitleAr : storedCourse.categoryTitleEn}</Link>
                            <MdKeyboardArrowRight />
                        </>
                    )}

                    <span>{localStorage.getItem("course_title")}</span>
                </div>
                <h2>{videoName}</h2>
            </div>

            <div className={`header-service-mode `} onClick={toggleTheme}>
                {theme === "dark" ? <FiSun style={{ color: "gold" }} /> : <IoMoonOutline />}
            </div>
        </section>
    );
}