// import generalActivePopup from "@/app/store/ActivePopup";
// import React, { Suspense, useEffect, useState } from "react";
// import { IoClose } from "react-icons/io5";
// import ReactPlayer from "react-player";
// import { motion } from "framer-motion";

// export default function ActiveAnswersPopup() {
//     const { activeSuccess, closeActiveDatePopup , activeDatesPopup } = generalActivePopup();
//     const [showVideo, setShowVideo] = useState(false);


//     return (
//         <motion.div
//             onClick={closeActiveDatePopup}
//             initial={{ opacity: 0, visibility: "hidden" }}
//             animate={{ opacity: activeDatesPopup ? 1 : 0, visibility: activeDatesPopup ? "visible" : "hidden" }}
//             // exit={{ opacity: 0, visibility: "hidden" }}
//             transition={{ duration: 0.2, ease: "easeInOut" }}
//             className={`general_popup p-lg py ${activeDatesPopup ? "active" : ""}`}>
//             <div className="general_popup_close f ac jc" onClick={closeActiveDatePopup}>
//                 <IoClose />
//             </div>
//             {activeDatesPopup ?(
//                 <Suspense fallback={<div>Loading...</div>}>
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
//                         className="general_popup_video" style={{ background: "white" }}>
//                         <div>
//                             <div className="pop_up_content">
//                                 <h1>إجاباتك السابقة للامتحان </h1>

//                                 <div className='line_break' style={{marginTop:"30px"}}></div>

//                                 <p className="dates"> 20/10/2024  </p>
//                                 <p className="dates"> 20/10/2024  </p>
//                                 <p className="dates"> 20/10/2024  </p>
//                                 <p className="dates"> 20/10/2024  </p>

//                                 <div className='line_break' style={{marginTop:"30px"}}></div>
//                             </div>
//                             <div className="pre_buttons" style={{justifyContent:"center"}}>
//                                 <button className="bt_next" style={{width:"140px"}}  onClick={closeActiveDatePopup}>
//                                     الغاء
//                                 </button>

                                
//                             </div>
//                         </div>
//                     </motion.div>
//                 </Suspense>
//             ):null
        
//         }

        
//         </motion.div>
//     );
// }


import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function ActiveAnswersPopup() {
    const { closeActiveDatePopup, activeDatesPopup } = generalActivePopup();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDateClick = (date: string) => {
        setSelectedDate(date);
        // You can replace alert with API call or navigation logic
    };

    const examData = [
        { date: "20/10/2024", successRate: "70%", score: "737" ,memberExamID:"1",},
        { date: "15/09/2024", successRate: "50%", score: "560" ,memberExamID:"1",},
        { date: "17/07/2024", successRate: "47%", score: "439" ,memberExamID:"1",},
    ];

    return (
        <motion.div
            onClick={closeActiveDatePopup}
            initial={{ opacity: 0, visibility: "hidden" }}
            animate={{ opacity: activeDatesPopup ? 1 : 0, visibility: activeDatesPopup ? "visible" : "hidden" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`general_popup p-lg py ${activeDatesPopup ? "active" : ""}`}
        >
            <div className="general_popup_close f ac jc" onClick={closeActiveDatePopup}>
                <IoClose />
            </div>

            {activeDatesPopup && (
                <Suspense fallback={<div>Loading...</div>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video"
                        style={{ background: "white" }}
                    >
                        <div className="pop_up_content">
                            <h1>إجاباتك السابقة للامتحان</h1>

                            <table className="exam_table">
                                <thead>
                                    <tr>
                                        <th>تاريخ الامتحان</th>
                                        <th>نسبة النجاح</th>
                                        <th>سكور</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {examData.map((exam, index) => (
                                        <tr key={index} onClick={() => handleDateClick(exam.memberExamID)}>
                                            <td>{exam.date}</td>
                                            <td>{exam.successRate}</td>
                                            <td>{exam.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="retake">
                                <div className="pre_but">
                                    <button className="bt_next" onClick={closeActiveDatePopup}>
                                        إلغاء
                                    </button>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </Suspense>
            )}
        </motion.div>
    );
}
