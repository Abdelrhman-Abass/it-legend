import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

export default function WarningPopup({ isVideo = false, isExam ,success ,videoNodeExam }: { isVideo?: boolean, isExam?: boolean , success?:boolean , videoNodeExam?:string}) {
    const { activeWarningPopup, closeWarningClosePop, extraData } = generalActivePopup();
    const { videoNode, videoId , setVideoNode ,setVideoID ,setVideoName ,setLastVideoData , prevNode} = GenralCoursePlayerId();

    const [showVideo, setShowVideo] = useState(false);
    
    const handleReady=() =>{
        // setVideoNode(videoNodeExam)
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        console.log("not ready " + videoNode)
        
        setLastVideoData(null);
    }


    

    return (
        <motion.div
            onClick={closeWarningClosePop}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: activeWarningPopup ? 1 : 0, visibility: activeWarningPopup ? "visible" : "hidden" }}
            // exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ${activeWarningPopup ? "active" : ""}`}>
            <div className="general_popup_close f ac jc" onClick={closeWarningClosePop}>
                <IoClose />
            </div>
            
            
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video" style={{ background: "white" }}>
                        <div>
                            <div className="pop_up_content">
                                <h1>احزر ي صديقي ستفقد تقدمك </h1>
                                <p>اقرأ الملاحظات دي بالتباه:</p>
                                <ul>
                                    <li>اتاكد إلك مذكر كويس قبل الامتحان، عشان السكور بناعك هيتححد بناء على إجاباتك.</li>
                                    <li>المحاضرات التالية هاتفاتم لك لما تجيب سكو أكثر من %۸ في الامتحان ده.</li>
                                    <li>تقد ر تعيد الامتحان للد أ في أي وقت، لكن السكو بيتحجد بناء على أول مرة.</li>
                                    <li>الامتحان متكون من ٠٢ سؤال اختيار من متعدد، وفيه عداد للوقت بمتوسط دقيقتي الامتحان.</li>
                                </ul>
                            </div>
                            <div className="pre_buttons">
                                <button className="bt_next" onClick={closeWarningClosePop}>
                                    محتاج اراجع اكنر"
                                </button>

                                <button className="bt_prev" onClick={handleReady}>
                                    أنا جاهز للامتحان
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </Suspense>
            
            
        </motion.div>
    );
}
