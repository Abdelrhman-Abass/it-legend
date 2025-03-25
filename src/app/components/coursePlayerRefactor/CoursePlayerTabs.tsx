import generalActivePopup from "@/app/store/ActivePopup";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { IoLinkSharp } from "react-icons/io5";
import AskQuestion from "../common/askQuestion/AskQuestion";
import LeaderBoard from "../common/leaderBoard/LeaderBoard";
import CourseLinks from "../common/courseLinks/CourseLinks";
import NewLoader from "../common/newLoader/NewLoader";
import LineProgress from "../common/lineProgress/LineProgress";
import CoursePlayerAccordion from "../common/coursePlayerAccordion/CoursePlayerAccordion";
import AddComment from "../common/addComment/AddComment";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

export default function CoursePlayerTabs({
    linksRef,
    nodeType,
    isTablet,
    commentsRef,
    CourseLinksData,
    slug,
    CourseDetails,
    isLoadingMemberCoursePlayer,
    MemberCoursePlayer,
    videoCommentsMutation,
}: any) {
    const { openQuestion, activeLeaderBoard } = generalActivePopup();
    const [activeTab, setActiveTab] = useState("links");
    const { videoNode } = GenralCoursePlayerId();
    const t = useTranslations();
    const scrollToSection = (ref: React.RefObject<HTMLElement>, tabName: string) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setActiveTab(tabName);
        }
    };
    return (
        nodeType !== 1 && (
            <div className="course_player_video_tabs">
                <div className="buttons-container">
                    <button onClick={() => scrollToSection(linksRef, "links")} className={`custom-button ${activeTab === "links" ? "active" : ""}`}>
                        <div title={t("courseTabs.links")}>
                            <IoLinkSharp />
                        </div>
                    </button>

                    {!isTablet && (
                        <button onClick={() => scrollToSection(linksRef, "course_list")} className={`custom-button ${activeTab === "course_list" ? "active" : ""}`}>
                            <div title={t("courseTabs.courseContent")} className="custom-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-file-user">
                                    <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                                    <path d="M15 18a3 3 0 1 0-6 0"></path>
                                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path>
                                    <circle cx="12" cy="13" r="2"></circle>
                                </svg>
                            </div>
                        </button>
                    )}

                    <button onClick={() => scrollToSection(commentsRef, "comments")} className={`custom-button ${activeTab === "comments" ? "active" : ""}`}>
                        <div title={t("courseTabs.comments")} className="custom-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-message-circle-more">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                <path d="M8 12h.01"></path>
                                <path d="M12 12h.01"></path>
                                <path d="M16 12h.01"></path>
                            </svg>
                        </div>
                    </button>

                    <button onClick={openQuestion} className={`custom-button ${activeTab === "q_a" ? "active" : ""}`}>
                        <div title={t("courseTabs.q_a")} className="custom-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-message-circle-question">
                                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <path d="M12 17h.01"></path>
                            </svg>
                        </div>
                    </button>

                    <button onClick={activeLeaderBoard} className={`custom-button ${activeTab === "leader" ? "active" : ""}`}>
                        <div title={t("courseTabs.leader")} className="custom-button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-shield-ellipsis">
                                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                                <path d="M8 12h.01"></path>
                                <path d="M12 12h.01"></path>
                                <path d="M16 12h.01"></path>
                            </svg>
                        </div>
                    </button>
                </div>

                <AskQuestion slug={slug} />
                <LeaderBoard />

                <div ref={linksRef}>
                    <CourseLinks data={CourseLinksData?.data?.data} title={t("courseTabs.links")} />
                </div>

                {!isTablet &&
                    (isLoadingMemberCoursePlayer ? (
                        <NewLoader loading={isLoadingMemberCoursePlayer} />
                    ) : (
                        <div className="course_player_list">
                            <div className="course_player_header">
                                {CourseDetails && <LineProgress title={t("courseTabs.coursList")} percent={Math.trunc(CourseDetails?.data?.data.progressPercentage)} />}
                            </div>
                            <div className="course_player_list_items">
                                <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data?.data} videoCommentsMutation={videoCommentsMutation} slug={slug} />
                            </div>
                        </div>
                    ))}

                <div ref={commentsRef}>
                    <CourseLinks data={videoCommentsMutation?.isPending ? [] : videoCommentsMutation?.data?.data?.data} title={t("common.comments")} showComments />
                    <AddComment videoCommentsMutation={videoCommentsMutation} nodeId={videoNode} />
                </div>
            </div>
        )
    );
}