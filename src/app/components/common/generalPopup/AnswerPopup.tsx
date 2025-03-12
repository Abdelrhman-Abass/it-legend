import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";


export default function AnswerReason({ reason }: { reason?: string }) {
    const { closeAnswerReasonPop, answerReasonPop } = generalActivePopup();
    // const { videoId } = GenralCoursePlayerId();
    // const { setVideoNode, setVideoName, setVideoID, setLastVideoData,videoNodeExam , setVideoNodeExam, videoId,videoNode , setFirstNodeModule ,setNextNode ,setMemeberExam , memeberExam} = GenralCoursePlayerId();



    return (
        <motion.div
            onClick={closeAnswerReasonPop}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: answerReasonPop ? 1 : 0, visibility: answerReasonPop ? "visible" : "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ${answerReasonPop ? "active" : ""}`}
        >
            <div className="general_popup_close f ac jc" onClick={closeAnswerReasonPop}>
                <IoClose />
            </div>

            {answerReasonPop && (
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video"
                        style={{ background: "white", maxHeight: "90vh", overflow: "scroll" }}
                    >
                        <div className="pop_up_content">
                            <h1>سبب الاجابة </h1>
                            <div className='line_break'></div>
                            <p>{reason} I am know Abdo </p>
                            <div className='line_break'></div>

                            <div className="pre_buttons" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>


                                <button className="bt_prev" onClick={closeAnswerReasonPop}>
                                    تمام فهمت
                                </button>
                            </div>

                        </div>
                    </motion.div>
                </Suspense>
            )}
        </motion.div>
    );
}