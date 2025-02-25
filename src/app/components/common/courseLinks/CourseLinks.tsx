import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { memo } from "react";
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

    return (
        <div className="course_links">
            <h3>{title}</h3>
            {showComments ? (
                <div className="course_links_container comments">
                    {data?.length < 1 && <p className="p1 empty_message">{t("empty.comment")}</p>}
                    {data?.map((item) => (
                        <div className="course_links_container_item" key={item.id || item.videoMinute}>
                            <span>{item.videoMinute}</span>
                            <p className="p1">{item.message}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="course_links_container_link">
                    {data?.length <= 0 && <p className="p1 empty_message">{t("empty.links")}</p>}
                    {sortedLinks?.map((item) => (
                        <Link className="course_links_container_item" key={item.id || item.path} href={item.path} target="_blank">
                            <span>{item.title}</span>
                            <MdArrowOutward />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
});

export default CourseLinks;
