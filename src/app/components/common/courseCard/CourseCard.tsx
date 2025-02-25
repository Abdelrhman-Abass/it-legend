"use client";
import React, { memo } from "react";
import { BiRevision } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { MdOndemandVideo, MdOutlineQuiz } from "react-icons/md";
import Button from "../button/Button";
import Image from "next/image";
import { ICourseCard } from "@/app/types/Types";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Progress } from "antd";
import Link from "next/link";

// Memoizing to avoid re-renders when props are the same
const CourseCard = memo(({
  btnText,
  customIcon,
  titleAr,
  titleEn,
  shortDescriptionAr,
  shortDescriptionEn,
  lectures,
  exams,
  summaries,
  averageRating,
  categoryId,
  image,
  index,
  hideItems,
  showProgress,
  progressPercentage = 0,
  url = "#",
  courseTitle = "",
}: ICourseCard) => {
  const { locale } = useParams();
  const t = useTranslations();

  // Determine the correct title and description based on locale
  const title = locale === "ar" ? titleAr : titleEn;
  const shortDescription = locale === "ar" ? shortDescriptionAr : shortDescriptionEn;

  // Create an array of 5 stars (with gold for ratings >= 3)
  const stars = new Array(5).fill(0).map((_, index) => index < 3 ? <FaStar key={index} className="gold" /> : <FaStar key={index} />);

  return (
    <Link href={url} passHref>
    
      <div className={`course_card ${hideItems ? "course_card_hide" : ""}`} >
        <div className="course_card_image">
          {showProgress && (
            <div className="course_card_image_progress">
              <Progress type="circle" percent={progressPercentage} size={"small"} format={percent => `${percent}%`}/>
            </div>
          )}
          <Image src={image || ""} alt="course" fill loading="lazy" />
        </div>

        <div className="course_card_content">
          <h3>{title}</h3>
          <p className="p1">{shortDescription}</p>

          {!hideItems && (
            <>
              <div className="course_card_content_rate f ac jb">
                <div className="course_card_content_rate_icons f ac">
                  {stars}
                </div>
                <span>
                  ({averageRating?.toFixed(1)} / 5 {t("common.reviews")})
                </span>
              </div>

              <div className="course_card_content_details f f-column">
                <div className="course_card_content_details_item f ac">
                  <MdOndemandVideo />
                  <span>{lectures} {t("common.lectures")}</span>
                </div>
                <div className="course_card_content_details_item f ac">
                  <MdOutlineQuiz />
                  <span>{exams} {t("common.exams")}</span>
                </div>
                <div className="course_card_content_details_item f ac">
                  <BiRevision />
                  <span>{summaries} {t("common.summaries")}</span>
                </div>
              </div>
            </>
          )}

          <Button title={btnText} url={url}  customIcon={customIcon} customClass="flip_icon white" courseTitle={courseTitle} />
        </div>
      </div>
    </Link>
  );
});

export default CourseCard;
