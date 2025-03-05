import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

export default function WarningCountDownPopup({ handleUserActivity }: { handleUserActivity: () => void }) {
    const { countDownPopup, closeCountDownPopup, extraData } = generalActivePopup();
    const { videoNode, videoId , setVideoNode ,setVideoID ,setVideoName ,setLastVideoData , prevNode} = GenralCoursePlayerId();

    const [showVideo, setShowVideo] = useState(false);
    
    const handleReady=() =>{
        // setVideoNode(videoNodeExam)
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        console.log("not ready " + videoNode)
        
        setLastVideoData(null);
    }

    const COUNTDOWN_TIME = 300; // 5 minutes in seconds
        const [countdown, setCountdown] = useState(COUNTDOWN_TIME);

        useEffect(() => {
            if (countDownPopup) {
            setCountdown(COUNTDOWN_TIME); // Reset countdown when popup is shown
            const interval = setInterval(() => {
                setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // onExamEnd(); // Call function when countdown reaches 0
                    handleUserActivity()
                    return 0;
                }
                return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval when unmounting
            }
        }, [countDownPopup]);

        // Format countdown as MM:SS
        const formatCountdown = (time: number) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        };

    

    return (
        <motion.div
            onClick={closeCountDownPopup}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: countDownPopup ? 1 : 0, visibility: countDownPopup ? "visible" : "hidden" }}
            // exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup  p-lg py ${countDownPopup ? "active" : ""}`}>
            <div className="general_popup_close f ac jc" onClick={closeCountDownPopup}>
                <IoClose />
            </div>
            
            
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video warning-countdown-popup" style={{ background: "white" }}>
                        <div>
                            <div className="pop_up_content">
                                <h1> ⚠️ احزر ي صديقي ستفقد تقدمك </h1>
                                {/* <p>اقرأ الملاحظات دي بالتباه:</p> */}
                                {/* <h2>⚠️ Warning: Inactivity Detected!</h2> */}
                                {/* <p>The exam will close in <strong>{formatCountdown(countdown)}</strong> if no action is taken.</p> */}
                                {/* <p>The exam will close in:</p> */}
                                {/* <h2> تحذير: تم اكتشاف عدم نشاط!</h2> */}
                                <p>سيتم إغلاق الامتحان خلال:</p>

                                <div className={`countdown-timer ${countdown <= 30 ? "alert" : ""}`}>
                                {formatCountdown(countdown)}
                                </div>
                            </div>
                            {/* <div className="pre_buttons">
                                <button className="bt_next" onClick={closeCountDownPopup}>
                                    محتاج اراجع اكنر"
                                </button>

                                <button className="bt_prev" onClick={handleReady}>
                                    أنا جاهز للامتحان
                                </button>
                            </div> */}
                        </div>
                    </motion.div>
                </Suspense>
            
            
        </motion.div>
    );
}
