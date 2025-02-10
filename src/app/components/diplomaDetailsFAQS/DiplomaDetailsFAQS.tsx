import React from "react";
import HeaderSection from "../common/headerSection/HeaderSection";
import { useTranslations } from "next-intl";
import AccordionItem from "../common/accordionItem/AccordionItem";
import Image from "next/image";

export default function DiplomaDetailsFAQS() {
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
        <div className="diploma_details_FAQS py p-lg">
            <div className="diploma_details_FAQS_image">
                <div className="diploma_details_FAQS_image_item">
                    <Image
                        src={
                            "https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                        }
                        fill
                        fetchPriority="low"
                        alt="course-banner"
                    />
                </div>
                <div className="diploma_details_FAQS_image_item">
                    <Image
                        src={
                            "https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                        }
                        fill
                        fetchPriority="low"
                        alt="course-banner"
                    />
                </div>
                <div className="diploma_details_FAQS_image_item">
                    <Image
                        src={
                            "https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                        }
                        fill
                        fetchPriority="low"
                        alt="course-banner"
                    />
                </div>
                <div className="diploma_details_FAQS_image_item">
                    <Image
                        src={
                            "https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"
                        }
                        fill
                        fetchPriority="low"
                        alt="course-banner"
                    />
                </div>
            </div>
            <div className="diploma_details_FAQS_container">
                <HeaderSection title={t("diplomaDetails.faqs.title")} campany_name={t("diplomaDetails.faqs.subTitle")} flip />
                <div className="diploma_details_FAQS_container_items">
                    <AccordionItem items={faqsData} />
                </div>
            </div>
        </div>
    );
}
