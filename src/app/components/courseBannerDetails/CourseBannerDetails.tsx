import React from 'react'
import HeaderSection from '../common/headerSection/HeaderSection'
import Image from 'next/image'
import { useTranslations } from 'next-intl';
import { ICourseBannerDetails } from '@/app/types/Types';

export default function CourseBannerDetails({bgImg,smImg,title,subTitle,subTitle2,point1,point2,point3}:ICourseBannerDetails) {
    const t = useTranslations();
  return (
    <div className="course_banner_details f jb">
                    <div className="course_banner_details_images">
                        <div className="course_banner_details_images_lg" >
                            <Image
                                src={bgImg}
                                alt="logo"
                                fill
                            />
                        </div>
                        <div className="course_banner_details_images_sm">
                            <Image
                                src={smImg}
                                alt="logo"
                                fill
                            />
                        </div>
                    </div>
                    <div className="course_banner_details_content">
                        <HeaderSection
                            title={title }
                            subTitle={subTitle }
                            subTitle2={subTitle2 }
                            customClass="header_section_start fs-sm"
                            showDescription
                        />
                        <div className="course_banner_details_content_steps">
                            <p className="p1" >
                                {point1 }
                            </p>
                            <p className="p1" >
                                {point2 }
                            </p>
                            <p className="p1" >
                                {point2 }
                            </p>
                        </div>
                    </div>
                </div>
  )
}
