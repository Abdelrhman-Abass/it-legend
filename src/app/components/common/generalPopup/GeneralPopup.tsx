import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function GeneralPopup({ isVideo = false, isExam ,success }: { isVideo?: boolean, isExam?: boolean , success?:boolean}) {
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
            onClick={closePopup}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: isActivePopup ? 1 : 0, visibility: isActivePopup ? "visible" : "hidden" }}
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
                        <ReactPlayer url={extraData?.videoUrl} playing={extraData?.videoUrl ? true : false} controls width="100%" height="100%" />
                    </motion.div>
                </Suspense>
            )}
            {isExam ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video" style={{ background: "white" }}>
                        <div>
                            <div className="pop_up_content">
                                <h1>ممتاز تقدمك يا صديقي</h1>
                                <p>اقرأ الملاحظات دي بالتباه:</p>
                                <ul>
                                    <li>الأحد إلك مذكر جويس قبل الامتحان، عشان السكو بناءك هيتحجد بناء على إجاباتك.</li>
                                    <li>المحاضرات التالية هاتفاتم لك لما تجيب سكو أكثر من %۸ في الامتحان ده.</li>
                                    <li>تقد ر تعيد الامتحان للد أ في أي وقت، لكن السكو بيتحجد بناء على أول مرة.</li>
                                    <li>الامتحان متكون من ٠٢ سؤال اختيار من متعدد، وفيه عداد للوقت بمتوسط دقيقتي الامتحان.</li>
                                </ul>
                            </div>
                            <div className="pre_buttons">
                                <button className="bt_next" onClick={closePopup}>
                                    محتاج اراجع اكنر"
                                </button>

                                <button className="bt_prev" onClick={closePopup}>
                                    أنا جاهز للامتحان
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </Suspense>
            ) :null}
            {/* {success  == true ?(
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video" style={{ background: "white" }}>
                        <div>
                            <div className="results-summary-container">
                                <div className="confetti">
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                    <div className="confetti-piece"></div>
                                </div>
                                <div className="results-summary-container__result">
                                    <div className="heading-tertiary">Your Result</div>
                                    <div className="result-box">
                                        <div className="heading-primary">78</div>
                                        <p className="result">of 100</p>
                                    </div>
                                    <div className="result-text-box">
                                        <div className="heading-secondary">excellent</div>
                                        <p className="paragraph">
                                            You scored higher than 65% of the people who have taken these tests.
                                        </p>
                                    </div>
                                    
                                    <div className="pre_buttons">
                                        <button className="bt_next" onClick={closePopup}>
                                            محتاج اراجع اكنر"
                                        </button>

                                        <button className="bt_prev" onClick={closePopup}>
                                            أنا جاهز للامتحان
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </motion.div>
                </Suspense>
            ):null} */}
        </motion.div>
    );
}
