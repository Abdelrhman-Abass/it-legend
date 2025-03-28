import React from "react";

export interface IButton {
    courseTitle?: string;
    title: string;
    itemVariants?: any;
    url?: string;
    customClass?: string;
    red?: boolean;
    white?: boolean;
    blank?: boolean;
    isLoading?: boolean;
    hideIcon?: boolean;
    onClick?: () => void;
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
    courseTitle?: string;
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
    progressPercentage?: number;
    hideItems?: boolean;
    showProgress?: boolean;
    customClass?:string;
    url?: string;
}
export interface Course  {
    averageRating: number;
    categoryId: string;
    courseId: string;
    displayOrder: number;
    exams: number;
    image: string;
    lectures: number;
    levelId: string;
    levelOrder: number;
    levelTitleAr: string;
    levelTitleEn: string;
    packageId: string | null;
    packagePrice: number;
    price: number;
    salesPrice: number;
    shortDescriptionAr: string;
    shortDescriptionEn: string;
    titleAr: string;
    titleEn: string;
};

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
    videoCommentsMutation: any,
    slug?: string,
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
export interface CourseFeatures {
    featureId: string;
    courseId: string;
    featureTextAr: string;
    featureTextEn: string;
}


export interface Node {
    nodeId: string;
    titleAr: string;
    titleEn: string;
    type: number;
    displayOrder: number;
    contentId: string;
    isFree: boolean;
    duration: string | null;
    isWatched: boolean | null;
    isPassed: boolean | null;
    questionCount: number | null;
    isRequired: boolean | null;
    isAccessible: boolean;
}

export interface Module {
    moduleId: string;
    moduleTitleAr: string;
    moduleTitleEn: string;
    courseId: string;
    moduleOrder: number;
    nodes: Node[];
}
