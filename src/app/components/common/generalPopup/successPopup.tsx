import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
// import {videoCommentsMutation} from "./"
export default function SuccessPopup({ result , retake }: { result?: number , retake?:() => void}) {
    const { activeSuccess, closeSucPopup, extraData, success, setSuccess,activeDatesPopup } = generalActivePopup();
    const { setVideoNode, videoNode ,setVideoID,firstNodeModule, nextNode ,setVideoName , setLastVideoData} = GenralCoursePlayerId();
    const [next, setNext] = useState<any>()

    const [showVideo, setShowVideo] = useState(false);

    const handleContinueLerning = ()=>{
        // console.log(JSON.stringfy(nextNode))
        if(nextNode){
            setVideoNode(nextNode.nodeId)
            setVideoID(nextNode.contentId)
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
            setVideoName(`${nextNode.titleEn}`);
            // videoCommentsMutation.mutate(nextNode.contentId);
            setLastVideoData(null);
        }
        closeSucPopup()
    }
    // console.log(firstNodeModule)
    const handlePrevLerning = ()=>{
        if(firstNodeModule){
            setVideoNode(firstNodeModule.nodeId)
            setVideoID(firstNodeModule.contentId)
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
            setVideoName(`${firstNodeModule.titleEn}`);
            // videoCommentsMutation.mutate(nextNode.contentId);
            setLastVideoData(null);
        }
        // closeSucPopup()
    }
    useEffect(()=>{
        // setNext(JSON.stringify(nextNode))
        setNext(nextNode)
        // console.log("next : " + nextNode.nodeId);

    },[nextNode])
    // console.log(videoNode)
    // http://localhost:3000/ar/learn-path/course-player/c7f5bfef-8117-4021-b83e-448051bced9a
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
            {success ? (
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
                                    <div className="heading-tertiary">ممتاز ي صديقي ...</div>
                                    <div className="heading-tertiary">انت نجحت بنسبة 85% وكسبت</div>
                                    {/* <div className="result-box"> */}
                                    {/* <div className="heading-primary">{result}</div> */}
                                    <p className="result">{result}</p>
                                    {/* </div> */}
                                    <div className="heading-tertiary">نقطة</div>

                                    <div className="result-text-box">
                                        {/* <div className="heading-secondary">أنت تمتلك كل ما يلزم للوصول إلى القمة! </div> */}
                                        <p className="paragraph">
                                            والسكور بتاعك دلوقتي {result} وتم فتح المحاضرات التاليه
                                        </p>
                                    </div>

                                    <div className="pre_buttons">
                                        <button className="bt_next" style={{cursor:"pointer"}} onClick={handleContinueLerning}>
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
            ) : <Suspense fallback={<div>Loading...</div>}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSuccess(false);
                      }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                    className="general_popup_video">
                    <div>
                        <div className="results-summary-container failed" >
                            <div className="results-summary-container__result" style={{gap:"50px"}}>
                                <div className="heading-tertiary">للأسف ي صديقي.. انت حققت %45</div>
                                {/* <div className="result-box"> */}
                                {/* <div className="heading-primary">{result}</div> */}
                                <p className="result">محتاج تراجع المنهج التاني</p>
                                {/* </div> */}
                                {/* <div className="heading-tertiary">نقطة</div> */}

                                <div className="result-text-box">
                                    {/* <div className="heading-secondary">أنت تمتلك كل ما يلزم للوصول إلى القمة! </div> */}
                                    <p className="paragraph">
                                        والسكور بتاعك دلوقتي {result} كما هو
                                    </p>
                                </div>

                                <div className="pre_buttons" style={{ justifyContent: "center" }}>
                                    <button className="bt_next" onClick={retake}>
                                        حاول مره اخري
                                    </button>
                                    <button className="bt_prev" onClick={handlePrevLerning}>
                                        محتاج اراجع اكتر
                                    </button>

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
