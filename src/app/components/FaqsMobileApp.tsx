import React from "react";
import HeaderSection from "./common/headerSection/HeaderSection";
import AccordionItem from "./common/accordionItem/AccordionItem";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FaqsMobileApp() {
    const t = useTranslations();
    const faqsData = [
        {
            key: "1",
            label: "ازاي تبدء في المجال ؟",
            children: <p>أفضل بداية ليك هي الدبلومة المجانية هتمهدلك الطريق وهتساعدك تفهم الأساسيات، بعد كدا تقدر تختار التخصص المناسب وتبدأ التراك الخاص بيه.</p>,
        },
        {
            key: "2",
            label: "ازاي اختار التخصص المناسب ليا ؟",
            children: <p>لو محتار في اختيار التخصص، اطمن بنجهزلك أداة هتساعدك تحدد تخصصك بسهولة ومش هتخرج من هنا غير وانت عارف هتعمل ايه</p>,
        },
    ];
    return (
        <div className="faqs_mobile_app">
            <div className="faqs_mobile_app_image">
                <Image
                    src="https://img.freepik.com/free-photo/man-with-blue-folder-looks-confused-terrified_144627-62852.jpg?t=st=1736954831~exp=1736958431~hmac=a32db23978be3b8376902c55364f7a4596be569c6ed9f685cb9593faf4952961&w=900"
                    alt="logo"
                    fill
                />
            </div>
            <div className="faqs_mobile_app_content">
                <HeaderSection title={t("mobileApp.faqSubTitle2")} subTitle={t("mobileApp.faqSubTitle")} customClass="header_section_start" />
                <div className="faqs_mobile_app_content_accordion">
                    <AccordionItem items={faqsData} />
                </div>
            </div>
        </div>
    );
}
