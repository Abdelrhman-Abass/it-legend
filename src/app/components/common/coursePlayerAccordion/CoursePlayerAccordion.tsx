import { CoursePlayerAccordionProps, VideoItem } from "@/app/types/Types";
import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { DownOutlined, LockOutlined, MinusOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { FaCheck, FaCheckDouble, FaFileCode } from "react-icons/fa";
import { useCookies } from "react-cookie";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import { MdOndemandVideo } from "react-icons/md";

export default function CoursePlayerAccordion({ videosItems, videoCommentsMutation }: CoursePlayerAccordionProps) {
    const { setVideoNode, setVideoName, setVideoID, setLastVideoData, videoNode } = GenralCoursePlayerId();
    const [cookies] = useCookies(["userData"]);
    const { locale } = useParams() as { locale: string }; // Ensure `locale` is a string
    const [activeKey, setActiveKey] = useState<string | string[]>([]);

    function handleVideoPlayType(type: number, nodeID?: string) {
        if (type >= 0 && type <= 3) {
            setVideoNode(nodeID || "");
        } else if (type === 4) {
            // Uncomment if needed:
            // window.open(`https://itlegend.net/Content/Uploads/ViewerPath/${nodeID}`, "download", "_blank");
        }
    }

    // Find the active module (the one containing the current videoNode)
    const findActiveModule = (): any => {
        if (!videosItems || !videoNode) return null;

        for (const item of videosItems) {
            const foundNode = item.nodes.find((node: any) => node.nodeId === videoNode);            
            if (foundNode) {
                return item.moduleTitleAr || item.moduleTitleEn || null;
            }
        }
        return null;
    };

    // Update activeKey when videoNode changes
    useEffect(() => {
        const activeModule = findActiveModule();
        if (activeModule) {
            setActiveKey([activeModule]);
        }
    }, [videoNode, videosItems]);

    const items =
        videosItems &&
        videosItems
            .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder)
            .map((item: any) => ({
                key: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn, // Use module title as key
                label: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
                children: (
                    <>
                        {item.nodes
                            .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
                            .map((child: any) => (
                                <div
                                    onClick={() => {
                                        handleVideoPlayType(child.type, child.nodeId);
                                        console.log(child,"child");
                                        
                                        setVideoID(child.contentId);
                                        setVideoName(`${locale === "ar" ? child.titleAr : child.titleEn}`);
                                        videoCommentsMutation.mutate(child.contentId);
                                        localStorage.clear();
                                        setLastVideoData(null);
                                    }}
                                    key={child.nodeId}
                                    className={`course_player_accordion_item ${child.isWatched && cookies.userData ? "watched" : ""}`}>
                                    <p className="p1">
                                        {child.isWatched && <FaCheck className="watch_icon" />}
                                        {!child.isWatched && child.type === 0 && <MdOndemandVideo className="watch_icon" />} {locale === "ar" ? child.titleAr : child.titleEn}
                                    </p>
                                    {cookies.userData ? <span>{child.duration || <FaFileCode />}</span> : child.isFree ? <span>{child.duration || <FaFileCode />}</span> : <LockOutlined />}
                                </div>
                            ))}
                    </>
                ),
            }));

    return (
        <div className="course_player_accordion">
            <Collapse activeKey={activeKey} expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <UpOutlined />)} onChange={(keys) => setActiveKey(keys)} expandIconPosition="end" items={items} />
        </div>
    );
}
