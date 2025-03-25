import CourseDetailsPage from "@/app/components/courseDetailsPage/CourseDetailsPage";
import getMetadata from "@/app/utils/getMetadata";
import React from "react";


// export async function generateMetadata({ params }: any) {
//     // const metaData = await getMetadata(`/Settings`, "", params,"/assets/images/main-logo.webp");
//     const { slug } = params; // Assuming the course ID is part of the URL
//     // const route = `/api/courses/${slug}`; // API route to fetch course details
//     const pageRoute = `/courses/${slug}`; // The route of the current page
//     const locale = "en"; // Default locale, or fetch dynamically
//     const customPageIcon = "/assets/images/main-logo.webp"; // Custom icon for the page

//     return await getMetadata(route, pageRoute, locale, customPageIcon);
//     // return metaData;
// }
export default function page({ params }: any) {

    // console.log("slug", params.slug);


    return <CourseDetailsPage courseId={params.slug}/>;
}
