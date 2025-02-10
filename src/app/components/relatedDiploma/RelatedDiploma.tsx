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

export default function RelatedDiploma({ slug }: any) {
    const [cookies, , removeCookie] = useCookies(["userData"]);
    const router = useRouter();
    const t = useTranslations();
    const { locale } = useParams();

    const {
        data: relatedDiploma,
        isLoading,
        status,
    } = useQuery({
        queryKey: ["MemberCategory", slug],
        queryFn: async () => await getServerRequest(`/MemberCategory/${slug}/details`),
    });

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
                                    key={item.courseId}
                                    showProgress={true}
                                    hideItems={true}
                                    btnText={t("diplomaDetails.footer.btn")}
                                    titleAr={item.titleAr}
                                    titleEn={item.titleEn}
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
