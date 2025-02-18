import React from "react";
import { Tabs } from "antd";
import { CourseTabsProps } from "@/app/types/Types";
import { useParams } from "next/navigation";

export default function CourseTabs({ data }: CourseTabsProps) {
    const {locale} =useParams()
    return (
        <Tabs
            defaultActiveKey="1"
            direction={locale === "ar" ? "rtl" : "ltr"}
            indicator={{ align: "center" }}
            animated
            centered
            autoCapitalize="characters"
            size="small"
            color="red"
            className="course_tabs"
            items={data.map((item) => ({
                key: item.key,
                label: item.label,
                children: item.children,
                icon: item.icon,
            }))}
        />
    );
}
