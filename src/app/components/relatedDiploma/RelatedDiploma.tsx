"use client";
import React, { Fragment, useEffect, useMemo } from "react";
import LineProgress from "../common/lineProgress/LineProgress";
import { useTranslations } from "next-intl";
import StudentResult from "../common/studentResult/StudentResult";
import CourseCard from "../common/courseCard/CourseCard";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { FaStar } from "react-icons/fa";
import { GiRank2 } from "react-icons/gi";
import { LuAlarmClock } from "react-icons/lu";
import NewLoader from "../common/newLoader/NewLoader";
import { useCookies } from "react-cookie";
import { usePathname } from "@/i18n/routing";
interface Course {
    courseId: string;
    titleAr: string;
    titleEn: string;
    category_id: string;
    levelTitleAr: string;
    levelOrder: number;
    progressPercentage: number;
    shortDescriptionAr: string;
    shortDescriptionEn: string;
    image: string;
}

interface DiplomaData {
    score: number;
    level: number;
    codeChallenges: number;
    categoryProgress: number;
    courses: Course[];
}

interface RelatedDiplomaProps {
    slug: string;
}

export default function RelatedDiploma({ slug }: any) {
    const [cookies, , removeCookie] = useCookies(["userData"]);
    const router = useRouter();
    const t = useTranslations();
    const { locale } = useParams();
    const pathName = usePathname();
    useEffect(() => {
        if (pathName.includes("diploma")) {
            localStorage.setItem("diploma_route", `learn-path/diploma/${slug}`);
        }
    },[pathName])

    const {
        data: relatedDiploma,
        isLoading,
        status,
    } = useQuery({
        queryKey: ["MemberCategory", slug],
        queryFn: async () => await getServerRequest(`/MemberCategory/${slug}/details`),
    });

    useEffect(() => {
        if (relatedDiploma?.data?.data?.courses) {
            const storedCourses: Record<string, { titleAR: string; category_id: string; categoryTitleAr: string, categoryTitleEn : string }> =
                JSON.parse(localStorage.getItem("courses") || "{}");

                relatedDiploma?.data?.data?.courses.forEach((course:Course) => {
                storedCourses[course.courseId] = {
                    titleAR: course.titleAr,
                    category_id: slug,
                    categoryTitleAr: relatedDiploma?.data?.data?.titleAr, // Storing category title in Arabic
                    categoryTitleEn: relatedDiploma?.data?.data?.titleEn // Storing category title in Arabic

                };
            });

            localStorage.setItem("courses", JSON.stringify(storedCourses));
        }
    }, [relatedDiploma]);

    // تحضير بيانات نتائج الطالب
    const studentResults = useMemo(() => {
        if (!relatedDiploma?.data?.data) return [];
        return [
            {
                title: t("courseResults.title1"),
                result: relatedDiploma.data.data.score ?? 0,
                icon: <FaStar />,
            },
            {
                title: t("courseResults.title2"),
                result: relatedDiploma.data.data.level ?? 0,
                icon: <GiRank2 />,
            },
            {
                title: t("courseResults.title3"),
                result: relatedDiploma.data.data.codeChallenges ?? 0,
                icon: <LuAlarmClock />,
            },
            {
                title: t("courseResults.title3"),
                result: relatedDiploma.data.data.codeChallenges ?? 0,
                icon: <LuAlarmClock />,
            },
        ];
    }, [relatedDiploma, t]);

    // معالجة الأخطاء وإعادة توجيه المستخدم
    useEffect(() => {
        if (status === "error") {
            removeCookie("userData", { path: "/", expires: new Date(0) });
            router.push(`/${locale}`);
        }
    }, [status, removeCookie, router, locale]);

    // تجميع الكورسات حسب `levelTitleAr` مع ترتيبها
const sortedLevels = useMemo(() => {
    const courses = relatedDiploma?.data?.data?.courses || [];
    if (!courses.length) return [];

    // Explicitly define the type for groupedCourses
    const groupedCourses: Record<string, { levelOrder: number; courses: any[] }> = courses.reduce(
        (acc:any, course: any) => {
            const { levelTitleAr, levelOrder } = course;
            if (!acc[levelTitleAr]) {
                acc[levelTitleAr] = { levelOrder, courses: [] };
            }
            acc[levelTitleAr].courses.push(course);
            return acc;
        },
        {} as Record<string, { levelOrder: number; courses: any[] }>
    );

    return Object.entries(groupedCourses)
        .map(([title, data]: [string, { levelOrder: number; courses: any[] }]) => ({
            title,
            levelOrder: data.levelOrder,
            courses: data.courses
        })) // ✅ Now TypeScript fully recognizes data
        .sort((a, b) => a.levelOrder - b.levelOrder);
}, [relatedDiploma]);


    console.log(sortedLevels, "sortedLevels");

    return (
        <section className="related_diploma py p-lg">
            <NewLoader loading={isLoading} />
            <LineProgress title={t("singleDiploma.titleDiploma")} percent={Math.trunc(relatedDiploma?.data?.data?.categoryProgress ?? 0)} />
            <div className="related_diploma_results">
                {studentResults.map((item, index) => (
                    <StudentResult key={index} showIcon result={item.title} title={item.result} icon={item.icon} />
                ))}
            </div>

            <div className="related_diploma_container _line">
                {sortedLevels.map((level) => (
                    <Fragment key={level.title}>
                        <h2>{level.title}</h2>
                        <div className="courses_list ">
                            {level.courses.map((item: any) => (
                                <CourseCard
                                    courseTitle={locale === "ar" ? item.titleAr : item.titleEn}
                                    key={item.courseId}
                                    showProgress={true}
                                    hideItems={true}
                                    btnText={t("diplomaDetails.footer.btn")}
                                    titleAr={item.titleAr}
                                    titleEn={item.titleEn}
                                    customClass="course_dip"

                                    progressPercentage={Math.trunc(item.progressPercentage ?? 0)}
                                    shortDescriptionAr={item.shortDescriptionAr}
                                    shortDescriptionEn={item.shortDescriptionEn}
                                    image={`https://itlegend.net/Content/Uploads/CoursesMedia/${item.image}`}
                                    url={`/${locale}/learn-path/course-player/${item.courseId}`}
                                />
                            ))}
                        </div>
                    </Fragment>
                ))}
            </div>
        </section>
    );
}
