
import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState , useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
interface ActiveAnswersPopupProps {
    onSelectExam: (memberExamID: string) => void;
    questionHistory: any;
}

export default function ActiveAnswersPopup({ onSelectExam , questionHistory  }: ActiveAnswersPopupProps) {
    const { closeActiveDatePopup, activeDatesPopup } = generalActivePopup();
    // const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // useEffect(()=>{
    //     if (questionHistory){
    //         console.log("questionHistory : " + JSON.stringify(questionHistory.data.examSolutions))
    //     }

    // },[questionHistory])
    const handleDateClick = (memberExamID: string) => {
        setSelectedDate(memberExamID);
        onSelectExam(memberExamID); // Pass the selected memberExamID back to the parent
    };

    // const handleDateClick = (date: string) => {
    //     setSelectedDate(date);
    //     // You can replace alert with API call or navigation logic
    // };

    const examData = questionHistory.data?.examSolutions.map((exam: any) => ({
        date: new Date(exam.createdDate).toLocaleDateString(), // Format the date
        successRate: exam.isPassed ? "100%" : "0%", // Calculate success rate (example logic)
        score: Math.round(exam.score),
        memberExamID: exam.memberExamId,
    }));

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
                        style={{ background: "white" ,maxHeight: " 90vh" , overflow:"scroll"}}
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
                                    {examData?.map((exam: any, index: number) =>(
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
