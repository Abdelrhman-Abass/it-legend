"use client";
import React, { Fragment } from "react";
import HomeBanner from "../homeBanner/HomeBanner";
import HomeExperience from "../homeExperience/HomeExperience";
import FreeDiploma from "../freeDiploma/FreeDiploma";
import SolutionBanner from "../solutionBanner/SolutionBanner";
import BenfitsSection from "../benfitsSection/BenfitsSection";
import MobileApp from "../mobileApp/MobileApp";
import CourseBanner from "../courseBanner/CourseBanner";
import { useQuery } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import NewLoader from "../common/newLoader/NewLoader";
import AdsSection from "../adsSection/AdsSection";
import HomeReviewsSection from "../homeReviewsSection/HomeReviewsSection";

export default function HomePageSection() {
    const { data, isLoading } = useQuery({
        queryKey: ["homePage"],
        queryFn: () => getServerRequest("/Settings"),
    });

    return (
        <Fragment>
            <NewLoader loading={isLoading} />
            <HomeBanner />
            <HomeExperience />
            <BenfitsSection />
            <CourseBanner videoLink={"https://www.youtube.com/watch?v=fgG4xvYLzgk&t=3s"} />
            <HomeReviewsSection/>
            <AdsSection />
            <FreeDiploma />
            <MobileApp />
            <SolutionBanner />
        </Fragment>
    );
}
