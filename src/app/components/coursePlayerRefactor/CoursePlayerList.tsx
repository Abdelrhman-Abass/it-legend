import React from 'react'
import LineProgress from '../common/lineProgress/LineProgress';
import NewLoader from '../common/newLoader/NewLoader';
import CoursePlayerAccordion from '../common/coursePlayerAccordion/CoursePlayerAccordion';
import { useTranslations } from 'next-intl';

export default function CoursePlayerList({ nodeType, CourseDetails, MemberCoursePlayer, videoCommentsMutation, isLoadingMemberCoursePlayer, course_list, slug }: any) {
    const  t  = useTranslations();
    return (
        <div className={`course_player_list ${nodeType === 1 ? "exam_overlay" : ""}`}>
            <div className="course_player_list">
                <div className="course_player_header">{CourseDetails && <LineProgress title={t("courseTabs.coursList")} percent={Math.trunc(CourseDetails?.data?.data?.progressPercentage)} />}</div>
                <div className="course_player_list_items">
                    {isLoadingMemberCoursePlayer ? (
                        <NewLoader loading={isLoadingMemberCoursePlayer} />
                    ) : (
                        <div ref={course_list}>
                            <CoursePlayerAccordion videosItems={MemberCoursePlayer?.data?.data} videoCommentsMutation={videoCommentsMutation} slug={slug} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}