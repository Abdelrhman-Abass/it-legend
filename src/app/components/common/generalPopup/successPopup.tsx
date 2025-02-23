import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";

export default function SuccessPopup() {
    const { activeSuccess, closeSucPopup, extraData , success , activeDatesPopup } = generalActivePopup();
    const [showVideo, setShowVideo] = useState(false);

    

    return (
        <motion.div
            onClick={closeSucPopup}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: activeSuccess ? 1 : 0, visibility: activeSuccess ? "visible" : "hidden" }}
            // exit={{ opacity: 0, visibility: "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ${activeSuccess ? "active" : ""}`}>
            <div className="general_popup_close f ac jc" onClick={closeSucPopup}>
                <IoClose />
            </div>
            {success ?(
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video">
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
                                    <div className="heading-tertiary">ممتاز ي صديقي انت حققت</div>
                                    <div className="result-box">
                                        <div className="heading-primary">78</div>
                                        <p className="result">of 100</p>
                                    </div>
                                    <div className="result-text-box">
                                        <div className="heading-secondary">أنت تمتلك كل ما يلزم للوصول إلى القمة! </div>
                                        <p className="paragraph">
                                            والسكور بتاعك دلوقتي 78 وتم فتح المحاضرات التاليه
                                        </p>
                                    </div>
                                    
                                    <div className="pre_buttons">
                                        <button className="bt_next" onClick={closeSucPopup}>
                                            استكمل الدراسة
                                        </button>

                                        <button className="bt_prev" onClick={closeSucPopup}>
                                            مراجعة اجاباتي
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </motion.div>
                </Suspense>
            ):<Suspense fallback={<div>Loading...</div>}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                className="general_popup_video">
                <div>
                    <div className="results-summary-container failed" >
                        {/* <div className="confetti">
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
                        </div> */}
                        <div className="results-summary-container__result" style={{ background: "white" }}>
                            <div className="heading-tertiary">للأسف ي صديقي انت حققت</div>
                            <div className="result-box">
                                <div className="heading-primary">40</div>
                                <p className="result">of 100</p>
                            </div>
                            <div className="result-text-box">
                                <div className="heading-secondary">أنت قادر على تحقيق الأفضل! </div>
                                <p className="paragraph">
                                    والسكور بتاعك دلوقتي 40 حاول مره أخري
                                </p>
                            </div>
                            
                            <div className="pre_buttons" style={{justifyContent:"center"}}>
                                <button className="bt_next" onClick={closeSucPopup}>
                                    حاول مره اخري
                                </button>

                                {/* <button className="bt_prev" onClick={closeSucPopup}>
                                    مراجعة اجاباتي
                                </button> */}
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
            </motion.div>
        </Suspense>
        
        }


        </motion.div>
    );
}
