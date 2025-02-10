import Image from "next/image";
import React from "react";
import ScrollBottom from "../scrollBottom/ScrollBottom";

export default function DiplomaBanner({scrollToEleRef}:any) {
    return (
        <section className="diploma_banner py p-lg">
            <div className="diploma_banner_container">
                <div className="diploma_banner_content_images" >
                    <div className="diploma_banner_content_images_lg" >
                        <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} fill fetchPriority="low" alt="course-banner"/>
                    </div>
                    <div className="diploma_banner_content_images_sm" >
                        <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} fill fetchPriority="low" alt="course-banner"/>
                    </div>
                </div>
                <div className="diploma_banner_content">
                    <h2 >دورة احتراف تصميم التطبيقات</h2>
                    <p className="p1" >تتكون الدورة من ثلاث مستويات. يأخذك من الصفر ثم يضعك علي اول . طريق احتراف تصميم التطبيقات</p>
                </div>
                <div className="diploma_banner_content_image" >
                    <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} fill fetchPriority="low" alt="course-banner"/>
                </div>
            </div>
            <ScrollBottom scrollToEleRef={scrollToEleRef}/>
        </section>
    );
}
