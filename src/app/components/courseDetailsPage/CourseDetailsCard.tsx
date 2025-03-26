import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { MdOutlineAccessTimeFilled, MdPriceCheck } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";
import { LiaCertificateSolid } from "react-icons/lia";
import Button from "../common/button/Button";
import ReactPlayer from "react-player";

interface CourseDetailsType {
    price: string;
    salesPrice: string;
    videoPath: string;
    skillLevel: string;
    levels: string;
    exams: string;
    lectures: string;
    instructorName: string;
    hasCertificate: boolean;
    hasDailyChallenge: boolean;
}


export default function CourseDetailsCard({
    price,
    salesPrice,
    skillLevel,
    lectures,
    levels,
    instructorName,
    videoPath,
    exams,
    hasCertificate,
    hasDailyChallenge,
}: CourseDetailsType) {
    return (
        <aside className="course_details_card">
            <div className="course_details_card_image">
                {/* <video src={videoPath}></video> */}
                <ReactPlayer
                        key={videoPath}
                        width="100%"
                        style={{width: "100%", height: "100%" }}
                        controls
                        config={{
                            youtube: { playerVars: { modestbranding: 1, rel: 0 } },
                        }}
                        url={videoPath || ""}
                        // playing={!!videoLink}
                        // onDuration={handleDuration}
                        // onProgress={handleProgress}
                        // onEnded={handleVideoEnd}
                        progressInterval={100}
                        // onReady={() => {
                        //     if (playerRef?.current) {
                        //         const startTime = startFromPercentage(lastVideoData?.percentage || 0);
                        //         playerRef.current.seekTo(startTime);
                        //     }
                        // }}
                    />
            </div>
            <h3>Course Content :</h3>
            <div className="course_details_card_info">
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <MdPriceCheck />
                        <span>price</span>
                    </div>
                    <span className="red">${price}</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <FaUserTie />
                        <span>Instrutor</span>
                    </div>
                    <span>{instructorName}</span>
                </div>
                {/* <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <MdOutlineAccessTimeFilled />
                        <span>Duration</span>
                    </div>
                    <span>4 Months</span>
                </div> */}
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <GiWhiteBook />
                        <span>Lectures</span>
                    </div>
                    <span>{lectures}</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <GiWhiteBook />
                        <span>Exams</span>
                    </div>
                    <span>{exams}</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <GiWhiteBook />
                        <span>Levels</span>
                    </div>
                    <span>{levels}</span>
                </div>
                {/* <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <FaUsers />
                        <span>Students</span>
                    </div>
                    <span>8 Students</span>
                </div> */}
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <LiaCertificateSolid />

                        <span>Certifications</span>
                    </div>
                    <span>{hasCertificate}</span>
                </div>
                <div className="card_info f ac jb">
                    <div className="card_info_icon f ac">
                        <LiaCertificateSolid />

                        <span>Daily Challenge</span>
                    </div>
                    <span>{hasDailyChallenge}</span>
                </div>
            </div>
            <div className="course_details_card_btn">
                <Button title="Enroll Now"/>
            </div>
        </aside>
    );
}
