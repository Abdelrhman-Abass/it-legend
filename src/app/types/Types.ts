import React from "react";

export interface IButton {
    title: string;
    itemVariants?: any;
    url?: string;
    customClass?: string;
    red?: boolean;
    white?: boolean;
    blank?: boolean;
    isLoading?: boolean;
    hideIcon?: boolean;
    customIcon?: React.ReactNode;
}
export interface IExperienceCard {
    title: string;
    subTitle: string;
    count: number;
    index: number;
}
export interface IHeaderSection {
    title: string;
    subTitle?: string;
    subTitle2?: string;
    customClass?: string;
    campany_name?: string;
    flip?: boolean;
    showDescription?: boolean;
}
export interface IGeneralFormik {
    initialValues: any;
    validationSchema: any;
    onSubmit: any;
    children: React.ReactNode;
}
export interface IWrapperInput {
    name: string;
    label?: string;
    subLabel?: string;
    type?: string;
    placeholder?: string;
    isCheckBox?: boolean;
    isDefault?: boolean;
    isPassword?: boolean;
}
export interface IGeneralVideo {
    customClass?: string;
    videoLink: string;
    controls?: boolean;
}
export interface ICourseCard {
    btnText: string;
    customIcon?: React.ReactNode;
    titleAr?: string;
    titleEn?: string;
    shortDescriptionAr?: string;
    shortDescriptionEn?: string;
    lectures?: number;
    exams?: number;
    summaries?: number;
    averageRating?: number;
    categoryId?: number;
    image?: string;
    index?: number;
    progressPercentage?: number ;
    hideItems?: boolean;
    showProgress?: boolean;
    url?: string;
}
export interface ICourseBannerDetails {
    bgImg: string;
    smImg: string;
    title: string;
    subTitle: string;
    subTitle2: string;
    point1?: string;
    point2?: string;
    point3?: string;
}

export interface IStudentResult {
    title: string;
    result?: string | number;
    icon?: React.ReactNode;
    showIcon?: boolean;
    customClass?: string;
}

export interface ILineProgress {
    title: string;
    percent: number;
}


export interface VideoItem {
    id: string;
    label: string;
    video_link?: string;
    duration?: string;
    isActive?: boolean;
    
}

// Define the structure of each accordion panel
interface AccordionItem {
    id: string;
    label: string;
    children: VideoItem[];
    nodeId?: string;
    nodes?: any;
    moduleTitleAr?: any;
    moduleTitleEn?: any;
}

// Props for the `CoursePlayerAccordion` component
export interface CoursePlayerAccordionProps {
    videosItems: AccordionItem[] | any;
    videoCommentsMutation: any
}

interface TabItem {
    key: string;
    label: React.ReactNode; // Can be text, JSX, or a component
    children: React.ReactNode; // Content to render inside the tab
    icon?: React.ReactNode; // Optional icon for the tab
}

// Define props for the CourseTabs component
export interface CourseTabsProps {
    data: TabItem[];
}