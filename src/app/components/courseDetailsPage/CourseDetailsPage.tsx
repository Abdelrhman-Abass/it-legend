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

export default function CourseDetailsPage({courseId} : {courseId: string}) {
    
    const { data:courseNodes, isLoading :isLoadingNodes, error } = useQuery({
        queryKey: ["courses_nodes"],
        queryFn: async () => {
            const response = await getServerRequest(`/CourseNode/${courseId}/nodes`);
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

    // console.log(courseNodes);

    return (
        <section className="course_details_page">
            <CourseDetailsBanner />
            <div className="course_details_page_container f py p-lg">
                {isLoadingFeature ? (
                    <NewLoader loading={isLoadingFeature}/>
                ) : (
                    <CourseDetails features={courseFeatures} nodes={courseNodes} slug={courseId}/>

                )}
                <CourseDetailsCard />
            </div>
            <HomeReviewsSection />
            <SolutionBanner />
        </section>
    );
}
