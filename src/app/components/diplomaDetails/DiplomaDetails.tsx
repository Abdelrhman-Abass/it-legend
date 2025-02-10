"use client";
import React, { Fragment, useEffect, useRef } from "react";
import DiplomaBanner from "../diplomaBanner/DiplomaBanner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import DiplomaDetailsVideo from "../diplomaDetailsVideo/DiplomaDetailsVideo";
import DiplomaDetailsProjects from "../diplomaDetailsProjects/DiplomaDetailsProjects";
import DiplomaDetailsFooter from "../diplomaDetailsFooter/DiplomaDetailsFooter";
import DiplomaDetailsFAQS from "../diplomaDetailsFAQS/DiplomaDetailsFAQS";
import SolutionBanner from "../solutionBanner/SolutionBanner";

export default function DiplomaDetails() {
    const { slug } = useParams();
    const scrollToEleRef = useRef<HTMLDivElement>(null);
    return (
        <Fragment>
            <DiplomaBanner scrollToEleRef={scrollToEleRef} />
            <DiplomaDetailsVideo scrollToEleRef={scrollToEleRef} />
            <DiplomaDetailsProjects />
            <DiplomaDetailsFAQS />
            {/* <DiplomaDetailsFooter /> */}
            <SolutionBanner/>
        </Fragment>
    );
}
