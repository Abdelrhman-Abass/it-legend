import CourseDetailsPage from "@/app/components/courseDetailsPage/CourseDetailsPage";
import React from "react";

export default function page({ params }: any) {

    console.log("slug", params.slug);
    return <CourseDetailsPage courseId={params.slug}/>;
}
