
import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import NewLoader from "../newLoader/NewLoader";

interface ActiveAnswersPopupProps {
    onSelectExam: (memberExamID: string) => void;
}

export default function ActiveAnswersPopup() {
    const { closeActiveDatePopup, activeDatesPopup ,openPopup , closeSucPopup } = generalActivePopup();
    // const { videoId } = GenralCoursePlayerId();
    const { setVideoNode, setVideoName, setVideoID, setLastVideoData,videoNodeExam ,setIsSubmitted,isSubmitted, setVideoNodeExam, videoId,videoNode , setFirstNodeModule ,setNextNode ,setMemeberExam , memeberExam} = GenralCoursePlayerId();


    const [questionHistory, setQuestionHistory] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const { mutate: fetchExamHistory, isPending: isFetchingHistory } = useMutation({
        mutationFn: async () => {
            const response = await getServerRequest(`/MemberExam/${videoId}/history`);
            return response;
        },
        onSuccess: (data) => {
            console.log("Fetched new History questions:", data);
            console.log("Fetched new History questions:", videoId);

            setQuestionHistory(data.data);
        },
        onError: (error) => {
            console.error("Failed to fetch exam questions:", error);
        }
    });

    const { mutate: fetchExamHistoryMember, isPending: isFetchingHistoryMember } = useMutation({
            mutationFn: async (memberExamID: string) => {
                const response = await getServerRequest(`/MemberExam/${memberExamID}/solution`);
                console.log("Fetched exam history:", memberExamID);
                return response;
            },
            onSuccess: (data) => {
                console.log("Fetched exam history:", data);
                setIsSubmitted(true)
                setMemeberExam(data.data.data)
                // Handle the fetched history data
            },
            onError: (error) => {
                console.error("Failed to fetch exam history:", error);
            }
        });

    // Fetch exam history when the popup is active
    useEffect(() => {
        if (activeDatesPopup) {
            fetchExamHistory();
        }
    }, [activeDatesPopup, fetchExamHistory]);

    const handleReady=() =>{
        if(videoNodeExam){
            setVideoNode(videoNodeExam)
        }
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        // console.log("not ready " + videoNode)
        
        setLastVideoData(null);
    }

    const handleSelectExam = (memberExamID: string) => {
        // setSelectedExamId(memberExamID);
        // Fetch exam history or perform other actions with the selected memberExamID
        fetchExamHistoryMember(memberExamID);
    };

    const handleDateClick = (memberExamID: string) => {
        setSelectedDate(memberExamID);
        // onSelectExam(memberExamID); // Pass the selected memberExamID back to the parent
        fetchExamHistoryMember(memberExamID);
        closeSucPopup()
        handleReady()

    };
    const handleRetake = ()=>{
        openPopup()
    }
    // Format exam data only if questionHistory is available
    const examData = questionHistory?.data?.examSolutions?.map((exam: any) => ({
        date: new Date(exam.createdDate).toLocaleDateString(), // Format the date
        successRate: exam.successRate?.toFixed(), // Calculate success rate (example logic)
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
                <Suspense fallback={<NewLoader loading={isFetchingHistory}/>}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
                        className="general_popup_video"
                        style={{ background: "white", maxHeight: "90vh", overflow: "scroll" }}
                    >
                        <div className="pop_up_content">
                            <h1>إجاباتك السابقة للامتحان</h1>

                            {isFetchingHistory ? (
                                <NewLoader loading={isFetchingHistory}/>
                            ) : (
                                <>
                                    <table className="exam_table">
                                        <thead>
                                            <tr>
                                                <th>تاريخ الامتحان</th>
                                                <th>نسبة النجاح</th>
                                                <th>سكور</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {examData?.map((exam: any, index: number) => (
                                                <tr key={index} onClick={() => handleDateClick(exam.memberExamID)}>
                                                    <td>{exam.date}</td>
                                                    <td>% {exam.successRate} </td>
                                                    <td>{exam.score}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {/* <div className="retake">
                                        <div className="pre_but">
                                            <button className="bt_next" onClick={closeActiveDatePopup}>
                                                إلغاء
                                            </button>
                                        </div>
                                    </div> */}
                                    <div className="pre_buttons">
                                        <button className="bt_next" onClick={handleRetake}>
                                        اعادة الامتحان
                                        </button>

                                        <button className="bt_prev" onClick={closeActiveDatePopup}>
                                            الغاء
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </Suspense>
            )}
        </motion.div>
    );
}