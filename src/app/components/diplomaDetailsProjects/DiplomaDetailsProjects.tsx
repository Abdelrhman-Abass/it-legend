import React from "react";
import HeaderSection from "../common/headerSection/HeaderSection";
import { useTranslations } from "next-intl";
import ProjectCard from "../common/projectCard/ProjectCard";
import Button from "../common/button/Button";
import { useParams } from "next/navigation";

export default function DiplomaDetailsProjects() {
    const t = useTranslations();
    const { locale } = useParams();
    return (
        <div className="diploma_details_projects p-lg py">
            <HeaderSection title={t("diplomaDetails.projects.title")} subTitle={t("diplomaDetails.projects.subTitle")} />
            <div className="diploma_details_projects_container">
                {new Array(3).fill(0).map((item, index) => (
                    <ProjectCard key={index} />
                ))}
            </div>
            <div className="diploma_details_projects_container_btn">
                <Button title={t("diplomaDetails.projects.btn")} customClass="flip_icon noCTA" url={`/${locale}/diploma/diploma-sales`} />
            </div>
        </div>
    );
}
