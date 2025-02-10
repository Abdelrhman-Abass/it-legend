import { IExperienceCard } from "@/app/types/Types";
import React from "react";

export default function ExperienceCard({ count, subTitle, title, index }: IExperienceCard) {
    return (
        <div className={"experience-card f f-column jc ac"}>
            <h2>
                <span>{count}</span> {subTitle}
            </h2>
            <p className="p1">{title}</p>
        </div>
    );
}
