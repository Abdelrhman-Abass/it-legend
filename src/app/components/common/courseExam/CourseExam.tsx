import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import GeneralPopup from '../generalPopup/GeneralPopup';
import generalActivePopup from "@/app/store/ActivePopup";
import SuccessPopup from '../generalPopup/successPopup';
import ActiveAnswersPopup from '../generalPopup/activeAnswersPopup';
import Editor, { Monaco } from "@monaco-editor/react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false
});
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import WarningPopup from '../generalPopup/warningPopup';

// const GeneralPopup = React.lazy(() => import("."));
const { Title, Text } = Typography;

// Static JSON data (from the uploaded file)
const examData = {
  success: true,
  data: {
    examId: "74c4d62d-ad40-41cb-ba46-2d607b6824fb",
    examTitleAr: "Get Started",
    examTitleEn: "Get Started",
    examDurationInSeconds: 1140,
    questions: [
      {
        questionId: "61ec5f29-6693-437b-ba29-94ca5fd35289",
        questionTitleAr: "C# is a programming language, developed by?",
        questionTitleEn: "C# is a programming language, developed by?",
        code: false,
        answers: [
          { answerId: "4c1d9943-b1b2-4774-b59a-05d3e24ed5cd", answerTitleAr: "Microsoft", answerTitleEn: "Microsoft" },
          { answerId: "5e354703-0300-42d7-ab7a-2e025c65d347", answerTitleAr: "Oracle", answerTitleEn: "Oracle" },
          { answerId: "cb9195da-f5eb-4a3e-954d-ac67ce2d5873", answerTitleAr: "GNU project", answerTitleEn: "GNU project" },
          { answerId: "208690f5-3f33-44a9-8bb4-d3cc51e8d131", answerTitleAr: "Google", answerTitleEn: "Google" }
        ]
      },
      {
        questionId: "6f8e014e-991a-4d1a-a843-9ba9b6d5f69d",
        questionTitleAr: "C# programming language is used to develop?",
        questionTitleEn: "C# programming language is used to develop?",
        code: false,

        answers: [
          { answerId: "54264f34-8831-4581-bd0d-6413cc125550", answerTitleAr: "Mobiles apps", answerTitleEn: "Mobiles apps" },
          { answerId: "624ad0e3-3020-4f1c-9169-8078bc9b7740", answerTitleAr: "Desktop apps", answerTitleEn: "Desktop apps" },
          { answerId: "8026776c-1a9f-43eb-bfc7-bd60ea84a116", answerTitleAr: "Web apps", answerTitleEn: "Web apps" },
          { answerId: "c0f11da8-850c-4166-a4fe-f39d4fedb571", answerTitleAr: "All of the above", answerTitleEn: "All of the above" }
        ]
      },
      {
        questionId: "6f8e014e-991a-4d1a-a843-9ba9b6d5f698",
        questionTitleAr: "C# programming language is used to develop?",
        questionTitleEn: "C# programming language is used to develop?",
        code: true,

        answers: [
          { answerId: "54264f34-8831-4581-bd0d-6413cc125550", answerTitleAr: "console.log()", answerTitleEn: "Mobiles apps" },
          { answerId: "624ad0e3-3020-4f1c-9169-8078bc9b7740", answerTitleAr: "console.log()", answerTitleEn: "Desktop apps" },
          { answerId: "8026776c-1a9f-43eb-bfc7-bd60ea84a116", answerTitleAr: "console.log()", answerTitleEn: "Web apps" },
          { answerId: "c0f11da8-850c-4166-a4fe-f39d4fedb571", answerTitleAr: "console.log()", answerTitleEn: "All of the above" }
        ]
      },
      {
        questionId: "6f5c5799-670a-48df-b691-bd086395e8b3",
        questionTitleAr: "What is the extension of a C# language file",
        questionTitleEn: "What is the extension of a C# language file",
        code: false,

        "answers": [
          {
            "answerId": "dfc03059-bf97-440d-bc8d-6aea036490ab",
            "answerTitleAr": ".cs  ",
            "answerTitleEn": ".cs  ",
            "answerImage": null,
            "answerOrder": 1,
            "isCodeAnswer": false
          },
          {
            "answerId": "2ff77ea2-468b-4d26-b28f-7bc5e480b86f",
            "answerTitleAr": ".cpp",
            "answerTitleEn": ".cpp",
            "answerImage": null,
            "answerOrder": 2,
            "isCodeAnswer": false
          },
          {
            "answerId": "5868bcde-b917-42e9-b07f-7d32ee00bb55",
            "answerTitleAr": ".csp",
            "answerTitleEn": ".csp",
            "answerImage": null,
            "answerOrder": 3,
            "isCodeAnswer": false
          },
          {
            "answerId": "4d16d67e-5a11-476d-9ff6-911aaf180a36",
            "answerTitleAr": " .c",
            "answerTitleEn": " .c",
            "answerImage": null,
            "answerOrder": 4,
            "isCodeAnswer": false
          }
        ]
      },


    ]
  },
  message: "Exam questions retrieved successfully.",
  errors: []
};
const examDataAnswers = {
  success: true,
  data: {
    examId: "74c4d62d-ad40-41cb-ba46-2d607b6824fb",
    examTitleAr: "Get Started",
    examTitleEn: "Get Started",
    examDurationInSeconds: 1140,
    questions: [
      {
        questionId: "61ec5f29-6693-437b-ba29-94ca5fd35289",
        questionTitleAr: "C# is a programming language, developed by?",
        questionTitleEn: "C# is a programming language, developed by?",
        code: false,
        answers: [
          { answerId: "4c1d9943-b1b2-4774-b59a-05d3e24ed5cd", answerTitleAr: "Microsoft", answerTitleEn: "Microsoft", right: true },
          { answerId: "5e354703-0300-42d7-ab7a-2e025c65d347", answerTitleAr: "Oracle", answerTitleEn: "Oracle", right: false },
          { answerId: "cb9195da-f5eb-4a3e-954d-ac67ce2d5873", answerTitleAr: "GNU project", answerTitleEn: "GNU project", right: false },
          { answerId: "208690f5-3f33-44a9-8bb4-d3cc51e8d131", answerTitleAr: "Google", answerTitleEn: "Google", right: false }
        ]
      },
      {
        questionId: "6f8e014e-991a-4d1a-a843-9ba9b6d5f69d",
        questionTitleAr: "C# programming language is used to develop?",
        questionTitleEn: "C# programming language is used to develop?",
        code: false,

        answers: [
          { answerId: "54264f34-8831-4581-bd0d-6413cc125550", right: false, answerTitleAr: "Mobiles apps", answerTitleEn: "Mobiles apps" },
          { answerId: "624ad0e3-3020-4f1c-9169-8078bc9b7740", right: true, answerTitleAr: "Desktop apps", answerTitleEn: "Desktop apps" },
          { answerId: "8026776c-1a9f-43eb-bfc7-bd60ea84a116", right: false, answerTitleAr: "Web apps", answerTitleEn: "Web apps" },
          { answerId: "c0f11da8-850c-4166-a4fe-f39d4fedb571", right: false, answerTitleAr: "All of the above", answerTitleEn: "All of the above" }
        ]
      },
      {
        questionId: "6f8e014e-991a-4d1a-a843-9ba9b6d5f698",
        questionTitleAr: "C# programming language is used to develop?",
        questionTitleEn: "C# programming language is used to develop?",
        code: true,

        answers: [
          { answerId: "54264f34-8831-4581-bd0d-6413cc125550", right: false, answerTitleAr: "console.log()", answerTitleEn: "Mobiles apps" },
          { answerId: "624ad0e3-3020-4f1c-9169-8078bc9b7740", right: false, answerTitleAr: "console.log()", answerTitleEn: "Desktop apps" },
          { answerId: "8026776c-1a9f-43eb-bfc7-bd60ea84a116", right: true, answerTitleAr: "console.log()", answerTitleEn: "Web apps" },
          { answerId: "c0f11da8-850c-4166-a4fe-f39d4fedb571", right: false, answerTitleAr: "console.log()", answerTitleEn: "All of the above" }
        ]
      },
      {
        questionId: "6f5c5799-670a-48df-b691-bd086395e8b3",
        questionTitleAr: "What is the extension of a C# language file",
        questionTitleEn: "What is the extension of a C# language file",
        code: false,

        "answers": [
          {
            "answerId": "dfc03059-bf97-440d-bc8d-6aea036490ab",
            "answerTitleAr": ".cs  ",
            "answerTitleEn": ".cs  ",
            "answerImage": null,
            "answerOrder": 1,
            "right": true,
            "isCodeAnswer": false
          },
          {
            "answerId": "2ff77ea2-468b-4d26-b28f-7bc5e480b86f",
            "answerTitleAr": ".cpp",
            "answerTitleEn": ".cpp",
            "answerImage": null,
            "answerOrder": 2,
            "right": false,
            "isCodeAnswer": false
          },
          {
            "answerId": "5868bcde-b917-42e9-b07f-7d32ee00bb55",
            "answerTitleAr": ".csp",
            "answerTitleEn": ".csp",
            "answerImage": null,
            "answerOrder": 3,
            "right": false,
            "isCodeAnswer": false
          },
          {
            "answerId": "4d16d67e-5a11-476d-9ff6-911aaf180a36",
            "answerTitleAr": " .c",
            "answerTitleEn": " .c",
            "answerImage": null,
            "answerOrder": 4,
            "right": false,
            "isCodeAnswer": false
          }
        ]
      },


    ]
  },
  message: "Exam questions retrieved successfully.",
  errors: []
};

const CourseExam = ({ examid }: { examid: number }) => {
  // State for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const t = useTranslations();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [examResult, setExamResult] = useState<number>(70);
  const [timeLeft, setTimeLeft] = useState(examData.data.examDurationInSeconds); // Timer State
  const { openPopup, openSucPopup, setSuccess, openActiveDatePopup, openWarningClosePop } = generalActivePopup();
  const { videoNode, videoId, setVideoID } = GenralCoursePlayerId();

  const [code, setCode] = useState<string>(``);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleOpenPopup = () => {
    openPopup(); // Pass video URL
  };


  // Get the current question and its details
  const currentQuestion = examData.data.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examData.data.questions.length - 1;
  const currentQuestionTime = questionTimes[currentQuestion.questionId] || 60;
  const isTimeUp = currentQuestionTime <= 0;
  const examvideo = videoId;


  // useEffect(()=>{
  //   // if(isSubmitted == false && examid != videoId){
  //   if(isSubmitted == false && "74c4d62d-ad40-41cb-ba46-2d607b6824fb" != videoId){
  //     openWarningClosePop()
  //   }
  // },[videoId])


  useEffect(() => {
    const questionId = currentQuestion.questionId;


    // Initialize timer for the current question if it doesn't exist
    if (!questionTimes[questionId]) {
      setQuestionTimes((prev) => ({
        ...prev,
        [questionId]: 60, // 1 minute in seconds
      }));
    }

    // Start the timer for the current question
    const timer = setInterval(() => {
      setQuestionTimes((prev) => {
        const currentTime = prev[questionId];
        if (currentTime > 0) {
          return {
            ...prev,
            [questionId]: currentTime - 1,
          };
        } else {
          clearInterval(timer); // Stop the timer when it reaches 0
          return prev;
        }
      });
    }, 1000);

    // Cleanup interval when the question changes or the component unmounts
    return () => clearInterval(timer);
  }, [currentQuestionIndex, questionTimes]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswerStatus = (questionId: string, answerId: string) => {
    if (!isSubmitted) return null; // No status if not submitted

    const correctAnswer = examDataAnswers.data.questions
      .find((q) => q.questionId === questionId)
      ?.answers.find((a) => a.right);

    const userAnswer = userAnswers[questionId];

    if (answerId === correctAnswer?.answerId) {
      return "correct"; // Correct answer
    } else if (userAnswer?.answerId === answerId && userAnswer?.answerId !== correctAnswer?.answerId) {
      return "incorrect"; // User's wrong answer
    } else {
      return null; // No status
    }
  };

  // Handle submission of the current question
  const handleSubmit = () => {
    setIsSubmitted(true);
    if (isLastQuestion) {
      openSucPopup()
      if (examResult > 50) {
        setSuccess()
      }

    }
  };

  const handleRetake = () => {
    setIsSubmitted(false);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTimeLeft(examData.data.examDurationInSeconds);
  }

  const handleAnswerClick = (questionId: string, answer: any) => {
    if (isSubmitted) return; // Prevent selection if exam is submitted

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    setSelectedAnswer(answer);
  };


  const handlePrevAnswers = () => {
    openActiveDatePopup()
  }
  // examData.data.questions.map((question) => {
  //   const correctAnswers = examDataAnswers.data.questions.find((q) => q.questionId === question.questionId)?.answers || [];})

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null); // Reset selected answer when moving to a new question
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examData?.data?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // Reset selected answer when moving to a new question
    }

    if (isLastQuestion) {
      handleSubmit();
    }
  };

  // useEffect(() => {
  //   console.log(videoId)
  //   console.log(examid)
  // }, [examid])


  useEffect(() => {
    setCode(`
        // - my-code-playground/galaxy
        // - my-code-playground/turtle
        // - my-code-playground/mario

        class class1
        {
          private void Run(string str){
            Console.WriteLine("Hello world");
          }
        }
      `);
  }, []);

  function handleOnChange(value?: string) {
    console.log('value', value)
    setCode(value || '');
  }
  return (
    <>
      <Card className="course_exam">
        {/* <Text type="secondary" className="course_exam_time">
          {formatTime(timeLeft)}
        </Text> */}
        {!isSubmitted && (
          <Text type="secondary" className="course_exam_time">
            {formatTime(currentQuestionTime)}
          </Text>

        )}
        <div className="course_exam_header">
          {currentQuestion.code ? (
            <div style={{ height: "10em", width: "100%", marginBottom: "20px" }}>

              <AceEditor
                mode="csharp"
                theme="dracula"
                onChange={handleOnChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                value={code}
              />
            </div>
          ) : (
            <Title level={4} className='course_exam_title'>{currentQuestion.questionTitleEn}</Title>

          )}
        </div>
        <div className="line">
          <div className="line-container">
            <span className="line-text">{t("courseExam.answer")}</span>
          </div>
        </div>
        <div className="course_exam_answers_boxs">
          {currentQuestion.answers.map((answer) => {
            const answerStatus = getAnswerStatus(currentQuestion.questionId, answer.answerId);

            return (
              <div key={answer.answerId}>
                {currentQuestion.code ? (
                  <div
                    style={{
                      height: "50px",
                      width: "100%",
                      marginBottom: "0.5em",
                      border: `4px solid ${answerStatus === "correct"
                          ? "#97EA7F" // Green for correct answer
                          : answerStatus === "incorrect"
                            ? "#FF4D4F" // Red for incorrect answer
                            : userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                              ? "#97EA7F" // Green for user's selected answer
                              : "#282a36"
                        }`,
                      borderRadius: "8px",
                      cursor: isSubmitted ? "default" : "pointer", // Disable cursor after submission
                      backgroundColor:
                        answerStatus === "correct"
                          ? "#97EA7F" // Green for correct answer
                          : answerStatus === "incorrect"
                            ? "#FF4D4F" // Red for incorrect answer
                            : userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                              ? "#97EA7F" // Green for user's selected answer
                              : "#fff",
                    }}
                    onClick={() => !isSubmitted && handleAnswerClick(currentQuestion.questionId, answer)}
                  >
                    <AceEditor
                      mode="csharp"
                      theme="dracula"
                      name="UNIQUE_ID_OF_DIV"
                      editorProps={{ $blockScrolling: true }}
                      value={answer.answerTitleAr}
                      showGutter={false}
                      highlightActiveLine={false}
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => !isSubmitted && handleAnswerClick(currentQuestion.questionId, answer)}
                    style={{
                      padding: "16px",
                      margin: "8px 0",
                      border: `2px solid ${answerStatus === "correct"
                          ? "#97EA7F" // Green for correct answer
                          : answerStatus === "incorrect"
                            ? "#FF4D4F" // Red for incorrect answer
                            : userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                              ? "#97EA7F" // Green for user's selected answer
                              : "#d9d9d9"
                        }`,
                      borderRadius: "8px",
                      cursor: isSubmitted ? "default" : "pointer", // Disable cursor after submission
                      backgroundColor:
                        answerStatus === "correct"
                          ? "#97EA7F" // Green for correct answer
                          : answerStatus === "incorrect"
                            ? "#FF4D4F" // Red for incorrect answer
                            : userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                              ? "#97EA7F" // Green for user's selected answer
                              : "#fff",
                    }}
                  >
                    <Text className="course_exam_box_answers">{answer.answerTitleEn}</Text>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* <div className="course_exam_answers_boxs">
          {currentQuestion.answers.map((answer, index) => (
            <div key={answer.answerId}>
              {currentQuestion.code ? (
                <div style={{ height: "50px", width: "100%", marginBottom: "20px" , border: `4px solid ${userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                  ? "#97EA7F"
                  : "#d9d9d9"
                }`, borderRadius: "8px",
                cursor: "pointer"}} onClick={() => handleAnswerClick(currentQuestion.questionId, answer)}>
                  <AceEditor
                    mode="csharp"
                    theme="dracula"
                    // onChange={handleOnChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    value={answer.answerTitleAr}
                    showGutter={false}
                    highlightActiveLine={false}
                    // editorProps={{ $blockScrolling: true }}
                    // setOptions={{
                    //   cursorStyle: 'pointer', // This sets the cursor style in the editor
                    // }}
                  />
                </div>
              ) : (
                <div
                onClick={() => handleAnswerClick(currentQuestion.questionId, answer)}
                style={{
                  padding: "16px",
                  margin: "8px 0",
                  border: `2px solid ${userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                      ? "#97EA7F"
                      : "#d9d9d9"
                    }`,
                  borderRadius: "8px",
                  cursor: "pointer", // Prevent clicking after submission

                  backgroundColor:
                    userAnswers[currentQuestion.questionId]?.answerId === answer.answerId
                      ? "#97EA7F"
                      : "#fff",
                }}
              >
                <Text className="course_exam_box_answers">{answer.answerTitleEn}</Text>
              </div>
              )}

              
            </div>
          ))}
        </div> */}

        <div className='line_break'></div>
        <div className="navigation-buttons">
          {isLastQuestion ? (
            <button className="bt_next" onClick={() => handleNextQuestion()} disabled={isSubmitted}>
              {t("courseExam.submitAnswer")}
            </button>

          ) : (
            <button className="bt_next" onClick={() => handleNextQuestion()}>
              {t("courseExam.nextQuestion")}
            </button>

          )}
          <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {examData?.data?.questions.length}</p>
          <button className="bt_prev" onClick={() => handlePreviousQuestion()} disabled={currentQuestionIndex === 0}>
            {t("courseExam.prevQuestion")}
          </button>
        </div>

        {isSubmitted && (
          <>
            <div className='line_break' style={{ marginTop: "30px" }}></div>
            <div className="navigation-buttons">
              <button className="bt_again" onClick={handleRetake}>
                {t("courseExam.reatak")}
              </button>
              {/* <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {examData?.data?.questions.length}</p> */}
              <button className="bt_prev_question" onClick={handlePrevAnswers} >
                {t("courseExam.prevQuestions")}
              </button>
            </div>

          </>

        )}


      </Card>

      <div>
        {/* <GeneralPopup isVideo={false} isExam={false} success={true}/> */}
        <SuccessPopup />
        <ActiveAnswersPopup />
        <WarningPopup />
      </div>

    </>
  );
};

export default CourseExam;



