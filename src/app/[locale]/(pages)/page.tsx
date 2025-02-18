import HomePageSection from "@/app/components/homePageSection/HomePageSection";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import React from "react";
import getMetadata from "@/app/utils/getMetadata";
export async function generateMetadata({ params }: any) {
    const metaData = await getMetadata(`/Settings`, "", params,"/assets/images/main-logo.webp");
    return metaData;
}
export default async function page() {

    return <HomePageSection />;
}
