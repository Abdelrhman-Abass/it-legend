// import generalActivePopup from "@/app/store/ActivePopup";
// import React, { Suspense, useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import ReactPlayer from "react-player";
// import { motion } from "framer-motion";
// import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

// export default function AskQuestion() {
//     const { openQuestion, closeQuestion, askquestionPopup } = generalActivePopup();
//     // const { videoNode, videoId , setVideoNode ,setVideoID ,setVideoName ,setLastVideoData , prevNode} = GenralCoursePlayerId();

//     // const [showVideo, setShowVideo] = useState(false);
//     const [question, setQuestion] = useState("");
    
//     const handleAsk=() =>{
//         // setVideoNode(videoNodeExam)
//         if (question) {
//             // onSubmit(question);
//             // setQuestion(""); // Clear input after submission
//             console.log("question : ",question)
//         }
//     }

//     console.log(askquestionPopup)
//     // if (!askquestionPopup) return null; // Hide modal if not open

//     const handleSend = () => {
//         if (question.trim()) {
//         // onSubmit(question);
//         setQuestion(""); // Clear input after submission
//         // onClose(); // Close modal
//         }
//     };

    

//     return (
//         <motion.div
//             onClick={closeQuestion}
//             initial={{ opacity: 0, visibility: "hidden" }}
//             animate={{ opacity: askquestionPopup ? 1 : 0, visibility: askquestionPopup ? "visible" : "hidden" }}
//             // exit={{ opacity: 0, visibility: "hidden" }}
//             transition={{ duration: 0.2, ease: "easeInOut" }}
//             className={`general_popup p-lg py ${askquestionPopup ? "active" : ""}`}>
//             <div className="general_popup_close f ac jc" onClick={closeQuestion}>
//                 <IoClose />
//             </div>
            
            
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
                        
//                         transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
//                         className="general_popup_video" style={{ background: "white" }}>
//                         <div>
//                             <div className="pop_up_content">
//                                 <h1>احزر ي صديقي ستفقد تقدمك </h1>
//                                 <p>اقرأ الملاحظات دي بالتباه:</p>
//                                 <textarea
//                                     placeholder="Type your question here..."
//                                     value={question}
//                                     onChange={(e) => setQuestion(e.target.value)}
//                                     />
//                             </div>
//                             <div className="pre_buttons">
//                                 <button className="bt_next" onClick={closeQuestion}>
//                                     محتاج اراجع اكنر"
//                                 </button>

//                                 <button className="bt_prev" onClick={handleAsk}>
//                                     أنا جاهز للامتحان
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 </Suspense>
            
            
//         </motion.div>
//     );
// }


import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function AskQuestion() {
    const { closeQuestion, askquestionPopup } = generalActivePopup();
    const [question, setQuestion] = useState("");
    const t = useTranslations();

    // Handle submitting the question
    const handleAsk = () => {
        if (question.trim()) {
            console.log("Question:", question);
            setQuestion(""); // Clear the textarea
        }
        closeQuestion(); // Close the popup
    };

    return (
        <motion.div
            onClick={closeQuestion}  // Clicking outside closes the modal
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: askquestionPopup ? 1 : 0, visibility: askquestionPopup ? "visible" : "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ask-question-overlay ${askquestionPopup ? "active" : ""}`}
        >
            {/* Prevent closing when clicking inside */}
            <motion.div
                onClick={(e) => e.stopPropagation()} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                className="general_popup_content ask-question-box " 
                style={{ background: "white", padding: "20px", borderRadius: "10px" }}
            >
                <div className="general_popup_close f ac jc" onClick={closeQuestion}>
                    <IoClose />
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <div className="ask_question">
                        <h1>{t("askQuestion.title")}</h1>
                        <textarea
                            placeholder={t("askQuestion.placeholder")}
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </div>
                    <div className="ask-question-buttons">
                        <button className="send-btn" onClick={handleAsk}>
                        {t("askQuestion.btnSend")}
                        </button>
                        <button className="cancel-btn" onClick={closeQuestion}>
                        {t("askQuestion.cancel")}
                        </button>
                    </div>
                </Suspense>
            </motion.div>
        </motion.div>
    );
}
