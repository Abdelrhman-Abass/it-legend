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
