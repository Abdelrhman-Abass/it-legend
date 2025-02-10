"use client";

import { useTranslations } from "next-intl";
import StudentResult from "../common/studentResult/StudentResult";
import { MdSportsScore } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { RiAnticlockwise2Fill } from "react-icons/ri";
import { PiRanking } from "react-icons/pi";
import CourseCard from "../common/courseCard/CourseCard";
import HeaderSection from "../common/headerSection/HeaderSection";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import NewLoader from "../common/newLoader/NewLoader";
import { Progress } from "antd";
import Link from "next/link";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import AdsSection from "../adsSection/AdsSection";
import Image from "next/image";

export default function DiplomasPage() {
    const [cookies, setCookie, removeCookie] = useCookies(["userData"]);
    const [lastVideo, setLastVideo] = useState<any>(null);
    const { setLastVideoData } = GenralCoursePlayerId();
    const router = useRouter();
    const { locale } = useParams();
    const t = useTranslations();
    const studentData = [
        {
            id: 1,
            title: t("user.diplomaPage.score"),
            result: 10,
            icon: <GiTeacher />,
        },
        {
            id: 2,
            title: t("user.diplomaPage.myTitle"),
            result: t("user.diplomaPage.status"),
            icon: <RiAnticlockwise2Fill />,
        },
        {
            id: 3,
            title: t("user.diplomaPage.currentRank"),
            result: t("user.diplomaPage.status1"),
            icon: <PiRanking />,
        },
        {
            id: 4,
            title: t("user.diplomaPage.crownLight"),
            result: t("user.diplomaPage.status2"),
            icon: <PiRanking />,
        },
    ];
    const resultStudent = [
        {
            id: 1,
            title: t("user.diplomaPage.card1"),
            result: 10,
        },
        {
            id: 2,
            title: t("user.diplomaPage.card2"),
            result: 30,
        },
        {
            id: 3,
            title: t("user.diplomaPage.card3"),
            result: 51,
        },
    ];
    const {
        data: diplomaData,
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ["MemberCategory"],
        queryFn: () => getServerRequest("/MemberCategory/categories"),
    });
    const { data: coursesData } = useQuery({
        queryKey: ["MemberCourse"],
        queryFn: () => getServerRequest("/MemberCourse"),
    });

    useEffect(() => {
        if (isError) {
            removeCookie("userData", { path: "/", expires: new Date(0) });
            router.replace(`/${locale}`);
        }
    }, [diplomaData]);
    useEffect(() => {
        if (localStorage.getItem("watchedPercentage") && !!cookies.userData) {
            setLastVideo(JSON.parse(localStorage.getItem("watchedPercentage")!));
        }
    }, []);
    return (
        <section className="diplomas_page ">
            <NewLoader loading={isLoading} />
            {lastVideo && (
                <div className="last_video_watched py ">
                    <Link
                        href={`/${locale}/learn-path/course-player/${lastVideo?.slug}`}
                        className="last_video_watched_item"
                        onClick={() => {
                            setLastVideoData(lastVideo);
                        }}>
                        <div className="last_video_watched_item_content">
                            <span>Continue from where you stopped.</span>
                            <h2>{lastVideo?.title}</h2>
                        </div>
                        <div className="last_video_watched_item_image">
                            <Progress
                                className="last_video_watched_item_progress"
                                type="circle"
                                strokeColor={"#d81b15"}
                                style={{ color: "#d81b15" }}
                                percent={Math.trunc(lastVideo?.percentage)}
                                format={() => (Math.trunc(lastVideo?.percentage) === 100 ? "Done" : `${Math.trunc(lastVideo?.percentage)}%`)}
                                size={"small"}
                            />
                            <Image src={`https://itlegend.net/Content/Uploads/CoursesMedia/${lastVideo?.image}`} alt="image" fill />
                        </div>
                    </Link>
                </div>
            )}
            <div className="student_result_container py p-lg">
                {studentData.map((item, index) => (
                    <StudentResult showIcon title={item.title} result={item.result} icon={item.icon} key={index} />
                ))}
            </div>
            <div className="student_result_container_items ">
                {resultStudent.map((item, index) => (
                    <StudentResult title={item.title} result={item.result} key={index} customClass="remover_spacing" />
                ))}
            </div>
            <AdsSection />
            <div className="diplomas_page_cards _line py p-lg" id="learn-path">
                <HeaderSection title={t("common.myDiplomas")} />
                {diplomaData?.data?.data.map((item: any, index: number) => (
                    <CourseCard
                        hideItems
                        titleAr={item.titleAr}
                        titleEn={item.titleEn}
                        shortDescriptionAr={item.shortDescriptionAr}
                        shortDescriptionEn={item.shortDescriptionEn}
                        btnText={t("diplomaDetails.footer.btn")}
                        image={`https://itlegend.net/Content/Uploads/CoursesMedia/${item.image}`}
                        key={index}
                        url={`/${locale}/learn-path/diploma/${item.categoryId}`}
                    />
                ))}
            </div>
            <div className="diplomas_page_cards p-lg py" id="my-courses">
                <HeaderSection title={t("common.myCourses")} />
                <div className="diplomas_page_cards_container _grid">
                    {coursesData?.data?.data.map((item: any, index: number) => (
                        <CourseCard
                            showProgress
                            hideItems
                            titleAr={item.titleAr}
                            titleEn={item.titleEn}
                            shortDescriptionAr={item.shortDescriptionAr}
                            shortDescriptionEn={item.shortDescriptionEn}
                            btnText={t("diplomaDetails.footer.btn")}
                            image={`https://itlegend.net/Content/Uploads/CoursesMedia/${item.image}`}
                            key={index}
                            progressPercentage={Math.trunc(item.progressPercentage)}
                            url={`/${locale}/learn-path/course-player/${item.courseId}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
