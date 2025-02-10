"use client";
import React from "react";
import CourseDetailsBanner from "./CourseDetailsBanner";
import CourseDetails from "./CourseDetails";
import CourseDetailsCard from "./CourseDetailsCard";
import SolutionBanner from "../solutionBanner/SolutionBanner";
import HomeReviewsSection from "../homeReviewsSection/HomeReviewsSection";

export default function CourseDetailsPage() {
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
