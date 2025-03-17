import generalActivePopup from "@/app/store/ActivePopup";
import React, { Suspense, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { postServerRequest } from "@/app/utils/generalServerRequest";
import GeneralToaster from "../generalToaster/GeneralToaster";

export default function AskQuestion({ slug }: { slug: string }) {
    const { closeQuestion, askquestionPopup } = generalActivePopup();
    const [question, setQuestion] = useState("");
    const t = useTranslations();

    
    const handleAsk = async () => {
        if (!question.trim()) return alert("Please enter a question!");

        try {
            const response = await postServerRequest("/CourseQuestion/ask", {
                questionText: question,
                courseId: slug, // Use slug as course ID
            });

            if (response?.status !== 200) {
                throw new Error("Failed to submit question");
            }

            setQuestion(""); // Clear the textarea
            // alert("Question submitted successfully!");
            GeneralToaster("Question submitted successfully!", "success");
            closeQuestion(); // Close the popup
        } catch (error) {
            console.error("Error submitting question:", error);
            alert("Something went wrong. Please try again.");
        } // ✅ Missing closing bracket for try-catch block is now added
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
                            maxLength={500}

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
