import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

export default function MobileAppCard() {
    const t = useTranslations();

    return (
        <div className="mobileAppCard ">
            <div className="mobileApp_header">
                <h2>{t("mobileApp.title1")} {t("mobileApp.title2")}</h2>
            </div>
            <div className="mobileAppCard_container f ac jc">
                <Link href={"https://play.google.com/store/apps/details?id=com.itlegend.itlegendapp"} target="_blank" className="mobileAppCard_image">
                    <div className="mobileAppCard_image_leyer"></div>
                </Link>
                <div className="mobileAppCard_image_or f ac jc">
                    <span>OR</span>
                </div>
                <Link href={"https://apps.apple.com/us/app/it-legend/id6446231104"} target="_blank" className="mobileAppCard_image">
                    <div className="mobileAppCard_image_leyer"></div>
                </Link>
            </div>
        </div>
    );
}
