"use client";
import React from "react";
import CourseDetailsBanner from "./CourseDetailsBanner";
import CourseDetails from "./CourseDetails";
import CourseDetailsCard from "./CourseDetailsCard";
import SolutionBanner from "../solutionBanner/SolutionBanner";
import HomeReviewsSection from "../homeReviewsSection/HomeReviewsSection";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";

export default function CourseDetailsPage({courseId} : {courseId: string}) {
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await getServerRequest("/Course");
            return response.data || [];
        },
    });

    return (
        <section className="course_details_page">
            <CourseDetailsBanner />
            <div className="course_details_page_container f py p-lg">
                <CourseDetails />
                <CourseDetailsCard />
            </div>
            <HomeReviewsSection />
            <SolutionBanner />
        </section>
    );
}
