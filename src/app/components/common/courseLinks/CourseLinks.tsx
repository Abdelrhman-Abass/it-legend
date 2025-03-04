import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

interface CourseLinksProps {
    data: any[];
    title: string;
    showComments?: boolean;
}

const CourseLinks = memo(({ data, title, showComments }: CourseLinksProps) => {
    const t = useTranslations();
    // Sort data outside of render flow if necessary
    const sortedLinks = data?.sort((a, b) => a.linkOrder - b.linkOrder);
    console.log(data)

    const formatTime = (time: string): string => {
        const parts = time.split(":"); // Split by ":"
        return `${parts[1]}:${parts[2]}`; // Return MM:SS
      };
      

    return (
        <div className="course_links">
            <h3>{title}</h3>
            {showComments ? (
                <div className="course_links_container comments">
                    {data?.length < 1 && <p className="p1 empty_message">{t("empty.comment")}</p>}
                    {data?.map((item) => (
                        <div className="course_links_container_item" key={item.id || item.videoMinute}>
                            <div className="comments_container">
                                <img src="/assets/images/placeholder.webp" alt="student" className="comments_image"/>
                                {/* <FaRegUserCircle className="comments_image"/> */}

                                <div className="comments_container_box">
                                    <p className="student-name">Student Name Goes Here</p>
                                    <span>{formatTime(item.videoMinute)}</span>
                                    <p className="message_comment">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="course_links_container_link">
                    {data?.length <= 0 && <p className="p1 empty_message">{t("empty.links")}</p>}
                    {sortedLinks?.map((item) => (
                        <Link className="course_links_container_item" key={item.id || item.path} href={item.path} target="_blank">
                            <span>{item.title}</span>
                            {/* <MdArrowOutward /> */}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
});

export default CourseLinks;
