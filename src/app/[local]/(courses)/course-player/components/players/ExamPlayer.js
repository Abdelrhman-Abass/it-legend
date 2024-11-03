import React, { useEffect, useState } from "react";
import { submitExam } from "../../../utils/coursesHandler";
import toast from "react-hot-toast";

const ExamPlayer = ({ exam, handelIsExamEnd, nodes, content }) => {
  const [questions, setQuestions] = useState([]);
  const [data, setData] = useState({});
  const [currentQuestions, setCurrentQuestions] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [answers, setAnswers] = useState([]); // State to store user answers
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [disabled, setDisabled] = useState(true); // Track selected answer
  const [isLast, setIsLast] = useState(false); // Track selected answer
  const [submitLoading, setSubmitLoading] = useState(false);

  const currentModuleId = nodes.find(({ nodes }) =>
    nodes.some(({ contentId }) => contentId == content)
  )?.moduleId; // Return the moduleId

  useEffect(() => {
    if (exam?.data) {
      const { questions, ...data } = exam?.data?.[0];
      setQuestions(questions);
      setData(data);
    }
  }, [exam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  // Function to format time in HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `  ${String(secs).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(hours).padStart(2, "0")}`;
  };

  const handleAnswerChange = (answerId) => {
    setDisabled(false);
    const questionId = questions[currentQuestions]?.questionId;
    setSelectedAnswer(answerId); // Update the selected answer
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId == questionId
    );

    if (existingAnswerIndex >= 0) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((answer, index) =>
          index == existingAnswerIndex ? { questionId, answerId } : answer
        )
      );
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, { questionId, answerId }]);
    }
  };

  const handleNextQuestion = async () => {
    setDisabled(true);
    // Check if an answer is selected
    if (selectedAnswer == null) {
      alert("answer");
      return;
    }

    if (currentQuestions == questions.length - 2) {
      setIsLast(true);
    }

    if (currentQuestions == questions.length - 1) {
      // On the last question, make a request to the server
      // fetch
      setSubmitLoading(true);
      let examData = {
        examId: data.examId,
        time: seconds,
        answers,
        moduleId: currentModuleId,
      };
      console.log("exam data: ", examData);
      let res = await submitExam(examData);
      console.log("res submit", res);
      setSubmitLoading(false);
      if (res?.data?.isPassed) {
        toast.success("لقد تم حل الامتحان, هيا نكمل");
        // navigate to video
        handelIsExamEnd();
      } else {
        toast.error(
          `لقد جاوبت علي ${res?.data?.memberScore} أسالة فقط من اصل ${res?.data?.examScore}`
        );
      }
    } else {
      // Move to the next question
      setCurrentQuestions((prev) => prev + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestions > 0) {
      setCurrentQuestions((prev) => prev - 1);
      setSelectedAnswer(
        answers.find(
          (answer) =>
            answer.questionId === questions[currentQuestions - 1]?.questionId
        )?.answerId || null
      );
    }
  };

  return (
    <div className="exam">
      <div className="exam-head">
        <div className="time">{formatTime(seconds)}</div>
        <div>
          <span>{currentQuestions + 1}</span> / <span>{questions?.length}</span>
        </div>{" "}
        <div>{questions[currentQuestions]?.quesLevelTitleEn}</div>
      </div>
      <div className="exam-body">
        <h1
          dir="ltr"
          dangerouslySetInnerHTML={{
            __html: questions[currentQuestions]?.questionTitleEn,
          }}
        ></h1>
        <div className="answers">
          {questions[currentQuestions]?.answers.map(
            // questions[currentQuestions].questionId
            ({ answerId, answerTitleEn, isRightAnswer }, idx) => {
              return (
                <label key={answerId}>
                  <input
                    className="radio-input"
                    type="radio"
                    name="answer"
                    value={answerId}
                    onChange={() => handleAnswerChange(answerId)}
                  />
                  <span className="radio-tile">
                    {/* <span className="radio-icon">{option.icon}</span> */}
                    <span className="radio-label">{answerTitleEn}</span>
                  </span>
                </label>
              );
            }
          )}
        </div>
      </div>
      <div className="exam-footer">
        <button
          disabled={disabled}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
          }}
          onClick={handleNextQuestion}
        >
          {submitLoading && (
            <div className="spinner-border text-light" role="status"></div>
          )}
          {isLast ? "حفظ" : "التالي"}
        </button>{" "}
        {currentQuestions > 0 && (
          <button onClick={handlePreviousQuestion}>السابق</button>
        )}
      </div>
    </div>
  );
};

export default ExamPlayer;
