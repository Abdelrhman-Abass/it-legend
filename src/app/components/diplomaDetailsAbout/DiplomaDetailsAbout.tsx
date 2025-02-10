import React from 'react'
import HeaderSection from '../common/headerSection/HeaderSection'
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BenfitsCard from '../benfitsCard/BenfitsCard';

export default function DiplomaDetailsAbout() {
    const t = useTranslations();
  return (
      <div className="diploma_details_about p-top p-lg jb">
          <div className="diploma_details_about_content">
              <HeaderSection title={t("diplomaDetails.about.title")} subTitle={t("diplomaDetails.about.subTitle")} subTitle2={t("diplomaDetails.about.desc")} showDescription />
              <div className="diploma_details_about_content_benfits">
                  
              {new Array(3).fill(0).map((item, index) => <BenfitsCard title='Exclusive Program' subTitle='It reflects the latest innovations and trends in the world of technology, highlighting new products and providing in-depth analyses of current trends.' key={index} index={index} customClass='rounded'/>)}
              </div>
          </div>
          <div className="diploma_details_about_images">
              <div className="diploma_details_about_images_lg" >
                <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} fill fetchPriority="low" alt="diploma_details_about_images"/>
              </div>
              <div className="diploma_details_about_images_sm" >
                <Image src={"https://img.freepik.com/free-photo/surprised-amazed-man-looking-promotion-pointing-fingers-left-advertisement-standing-blue-background_1258-65025.jpg?t=st=1736954549~exp=1736958149~hmac=e60a1f9de355f178b30d8218bff3c9c1d028ae97c64910333b932db9f6250fa2&w=996"} fill fetchPriority="low" alt="diploma_details_about_images"/>
              </div>
          </div>
      </div>
  );
}
