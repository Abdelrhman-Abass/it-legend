"use client";
import React from "react";
import CourseDetailsBanner from "./CourseDetailsBanner";
import CourseDetails from "./CourseDetails";
import CourseDetailsCard from "./CourseDetailsCard";
import SolutionBanner from "../solutionBanner/SolutionBanner";
import HomeReviewsSection from "../homeReviewsSection/HomeReviewsSection";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import NewLoader from "../common/newLoader/NewLoader";
import { useParams } from "next/navigation";


export default function CourseDetailsPage({courseId} : {courseId: string}) {
      const { locale } = useParams();
    
    const { data:courseNodes, isLoading :isLoadingNodes, error } = useQuery({
        queryKey: ["courses_nodes"],
        queryFn: async () => {
            const response = await getServerRequest(`/CourseNode/${courseId}/nodes`);
            return response.data.data || [];
        },
    });
    const { data:courseDetails, isLoading :isLoadingDetails } = useQuery({
        queryKey: ["courses_details"],
        queryFn: async () => {
            const response = await getServerRequest(`/CourseDetails/${courseId}`);
            return response.data.data || [];
        },
    });

    const { data :courseFeatures, isLoading :isLoadingFeature } = useQuery({
        queryKey: ["features"],
        queryFn: async () => {
            const response = await getServerRequest(`/CourseFeature/${courseId}/features`);
            return response.data.data || [];
        },
    });

    console.log(courseDetails);


    return (
        <section className="course_details_page">
            <CourseDetailsBanner courseName={locale == "ar"? courseDetails.titleAr :courseDetails.titleEn} instructorName={courseDetails.instructorArName} />
            <div className="course_details_page_container f py p-lg">
                {isLoadingFeature ? (
                    <NewLoader loading={isLoadingFeature}/>
                ) : (
                    <CourseDetails features={courseFeatures} nodes={courseNodes} courseOverView={locale == "ar"? courseDetails.descriptionAr : courseDetails.descriptionEn} slug={courseId}/>

                )}
                <CourseDetailsCard price={courseDetails.price} salesPrice={courseDetails.salesPrice} videoPath={courseDetails.videoPath} skillLevel={locale == "ar" ? courseDetails.skillLevelAr : courseDetails.skillLevelEn} lectures={courseDetails.lectures} instructorName={courseDetails.instructorArName} hasCertificate={courseDetails.hasCertificate} exams={courseDetails.exams} levels={courseDetails.levels}  hasDailyChallenge={courseDetails.hasDailyChallenge}/>
            </div>
            <HomeReviewsSection />
            <SolutionBanner />
        </section>
    );
}
