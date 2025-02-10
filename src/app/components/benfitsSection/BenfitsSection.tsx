"use client";
import React from "react";
import HeaderSection from "../common/headerSection/HeaderSection";

import { useTranslations } from "next-intl";
import BenfitsCard from "../benfitsCard/BenfitsCard";
export default function BenfitsSection() {
    const t = useTranslations();
    const benfitsData = [
        {id:Math.random().toString(),title:t("benfitsCard.title1"),subTitle:t("benfitsCard.subTitle1")},
        {id:Math.random().toString(),title:t("benfitsCard.title2"),subTitle:t("benfitsCard.subTitle2")},
        {id:Math.random().toString(),title:t("benfitsCard.title3"),subTitle:t("benfitsCard.subTitle3")},
        {id:Math.random().toString(),title:t("benfitsCard.title4"),subTitle:t("benfitsCard.subTitle4")},
        {id:Math.random().toString(),title:t("benfitsCard.title5"),subTitle:t("benfitsCard.subTitle5")},
        {id:Math.random().toString(),title:t("benfitsCard.title6"),subTitle:t("benfitsCard.subTitle6")},
        {id:Math.random().toString(),title:t("benfitsCard.title7"),subTitle:t("benfitsCard.subTitle7")},
        {id:Math.random().toString(),title:t("benfitsCard.title8"),subTitle:t("benfitsCard.subTitle8")},
        {id:Math.random().toString(),title:t("benfitsCard.title9"),subTitle:t("benfitsCard.subTitle9")},
        
    ]
    return (
        <section  className="benfits_section p-lg py">
            <HeaderSection title={t("benfits.title")} subTitle={t("benfits.subTitle")} subTitle2={t("benfits.subTitle2")} campany_name={"ITLegend"} flip />
            <div className="benfits_section_container">
                {benfitsData.map((item, index) => (
                    <BenfitsCard index={index} key={index} title={item.title} subTitle={item.subTitle} />
                ))}
            </div>
        </section>
    );
}
