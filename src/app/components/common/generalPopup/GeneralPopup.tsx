import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function GeneralPopup({ isVideo = false }: { isVideo?: boolean }) {
    const { isActivePopup, closePopup, extraData } = generalActivePopup();
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        if (isActivePopup) {
            setTimeout(() => setShowVideo(true), 300); // تأخير تشغيل الفيديو
        } else {
            setShowVideo(false);
        }
    }, [isActivePopup]);

    return (
        <motion.div
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: isActivePopup ? 1 : 0,  visibility: isActivePopup ? "visible" : "hidden" }}
            // exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ${isActivePopup ? "active" : ""}`}>
            <div className="general_popup_close f ac jc" onClick={closePopup}>
                <IoClose />
            </div>
            {isVideo && showVideo && (
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video">
                        <ReactPlayer url={extraData?.videoUrl} controls width="100%" height="100%" />
                    </motion.div>
                </Suspense>
            )}
        </motion.div>
    );
}
