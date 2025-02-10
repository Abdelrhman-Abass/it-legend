import React from "react";
import { Tabs } from "antd";
import { CourseTabsProps } from "@/app/types/Types";

export default function CourseTabs({ data }: CourseTabsProps) {
    return (
        <Tabs
            defaultActiveKey="1"
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
