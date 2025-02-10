"use client";
import React from "react";
import Button from "../common/button/Button";

import { useTranslations } from "next-intl";
export default function SolutionBanner() {
    const t = useTranslations();
    return (
        <section className="solution_banner p-lg py-lg  f f-column ac jc">
            {/* <p >{t("solution.text")}</p> */}
            <h2 >{t("solution.title")}</h2>
            <div className="solution_banner_btns f ac" >
                <Button blank title={t("solution.btn1")} customClass="flip_icon" url="https://api.whatsapp.com/send/?phone=1234567890&text&type=phone_number&app_absent=0" />
                <Button blank title={t("solution.btn2")} customClass="flip_icon" url="tel:0123456789" white />
            </div>
        </section>
    );
}
