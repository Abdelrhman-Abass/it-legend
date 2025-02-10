"use client";
import React from "react";
import MobileAppCard from "./MobileAppCard";
import FaqsMobileApp from "../FaqsMobileApp";
import { useTranslations } from "next-intl";
export default function MobileApp() {
    const t =useTranslations();
    return (
        <div className="mobileApp p-lg py">
            <MobileAppCard />
            <FaqsMobileApp />
        </div>
    );
}
