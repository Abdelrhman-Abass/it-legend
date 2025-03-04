

// import generalActivePopup from "@/app/store/ActivePopup";
// import React, { Suspense, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { motion } from "framer-motion";
// import { useTranslations } from "next-intl";

// export default function LeaderBoard() {
//     const { closeActiveBoard, activeLeaderBoard ,leaderBoard } = generalActivePopup();
//     const [question, setQuestion] = useState("");
//     const t = useTranslations();

//     // Handle submitting the question
//     const handleAsk = () => {
//         if (question.trim()) {
//             console.log("Question:", question);
//             setQuestion(""); // Clear the textarea
//             closeActiveBoard(); // Close the popup
//         }
//     };

//     return (
//         <motion.div
//             onClick={closeActiveBoard}  // Clicking outside closes the modal
//             initial={{ opacity: 0, visibility: "hidden" }}
//             animate={{ opacity: leaderBoard ? 1 : 0, visibility: leaderBoard ? "visible" : "hidden" }}
//             transition={{ duration: 0.2, ease: "easeInOut" }}
//             className={`general_popup p-lg py overlay_leaderBorad ${leaderBoard ? "active" : ""}`}
//         >
//             {/* Prevent closing when clicking inside */}
//             <motion.div
//                 onClick={(e) => e.stopPropagation()} 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
//                 className=" popup_leaderBorad" 
//                 style={{ background: "white", padding: "20px", borderRadius: "10px" }}
//             >
//                 <Suspense fallback={<div>Loading...</div>}>

//                     {/* <div className="ask_question"> */}
//                         {/* <h1 className="title_leaderBorad">{t("askQuestion.title")}</h1> */}
//                         <div className="box">

//                             <div className=" f ac jc closeButton_leaderBorad" onClick={closeActiveBoard}>
//                                 <IoClose />
//                             </div>

//                             <div>
//                                 <h2 className="title_leaderBorad">{localStorage.getItem("course_title")}</h2>
//                                 <h3 className="subtitle_leaderBorad">Leaderboard</h3>
//                             </div>

//                         </div>
//                         <div className="message_leaderBorad">
//                             <span>عظيم! يا صديقي.. أداءك في الكورس ده أفضل من 90٪ من باقي الطلبة.. كمل عايز أشوف اسمك في الليدربورد هنا</span>
//                             <span className="trophy">🏆</span>
//                         </div>
//                     {/* </div> */}
//                     <div className="leaderboard">
//                         {Array(5)
//                             .fill("")
//                             .map((_, index) => (
//                             <div key={index} className="entry"></div>
//                             ))}
//                         </div>
                    
//                 </Suspense>
//             </motion.div>
//         </motion.div>
//     );
// }


import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function LeaderBoard() {
    const { closeActiveBoard, leaderBoard } = generalActivePopup();
    const [question, setQuestion] = useState("");
    const t = useTranslations();

    // Handle submitting the question
    const handleAsk = () => {
        if (question.trim()) {
            console.log("Question:", question);
            setQuestion(""); // Clear the textarea
            closeActiveBoard(); // Close the popup
        }
    };

    return (
        <motion.div
            onClick={closeActiveBoard}  // Clicking outside closes the modal
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: leaderBoard ? 1 : 0, visibility: leaderBoard ? "visible" : "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`overlay_leaderboard  ${leaderBoard ? "active" : ""}`}
        >
            {/* Prevent closing when clicking inside */}
            <motion.div
                onClick={(e) => e.stopPropagation()} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                className="popup"
            >
                <Suspense fallback={<div>Loading...</div>}>

                    {/* Close Button */}
                    <div className="header-container">

                        <button className="exit-button" onClick={closeActiveBoard}>
                            <IoClose />
                        </button>

                        {/* Header */}
                        <div className="leaderBoard_header">
                            <h2 className="leaderboard-title">{localStorage.getItem("course_title")}</h2>
                            <h3 className="leaderboard-title">Leaderboard</h3>
                        </div>

                    </div>

                    {/* Message */}
                    <div className="message">
                        <span>عظيم! يا صديقي.. أداءك في الكورس ده أفضل من 90٪ من باقي الطلبة.. كمل عايز أشوف اسمك في الليدربورد هنا</span>
                        <span className="trophy">🏆</span>
                    </div>

                    {/* Leaderboard Entries */}
                    <div className="entries">
                        {Array(5)
                            .fill("")
                            .map((_, index) => (
                                <div key={index} className="entry"></div>
                            ))}
                    </div>
                    
                </Suspense>
            </motion.div>
        </motion.div>
    );
}  
