import React, { useCallback, useEffect, useRef, useMemo, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import GeneralPopup from '../generalPopup/GeneralPopup';
import generalActivePopup from "@/app/store/ActivePopup";
import SuccessPopup from '../generalPopup/successPopup';
import ActiveAnswersPopup from '../generalPopup/activeAnswersPopup';
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import WarningPopup from '../generalPopup/warningPopup';
import WarningCountDownPopup from '../warningCountDown/WarningCountDown';
import type { MenuProps } from 'antd';
import { Select, Space } from 'antd';// const GeneralPopup = React.lazy(() => import("."));
import { getServerRequest, postServerRequest } from '@/app/utils/generalServerRequest';
import { useMutation, useQuery } from '@tanstack/react-query';
import NewLoader from '../newLoader/NewLoader';
import AnswerReason from '../generalPopup/AnswerPopup';
const { Title, Text } = Typography;



const INACTIVITY_LIMIT = 35 * 60 * 1000; // 30 minutes in milliseconds
// const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds
const WARNING_TIME = 5 * 60 * 1000; // 25 minutes
let warningTimeout: NodeJS.Timeout | null = null;
let inactivityTimeout: NodeJS.Timeout | null = null;

const CourseExam = ({ examid }: { examid: number}) => {
  // State for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const t = useTranslations();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answerId: string }[]>([]);
  const [questionHistory, setQuestionHistory] = useState<any>();
  const [filter, setFilter] = useState("incorrect"); // "all", "correct", or "incorrect"

  // const [memeberExam, setMemeberExam] = useState<any>();

  const defaultExamResult = {
    score: 0,
    hasPassed: false,
    courseScore: 0,
    degreeScore: 0,
    successRate: 0,
    timeScore: 0,
    medal: 0,
    isLevelUp: false,
    newLevel: 0,
    memberExamId: "",
  };

  // ✅ State to hold the exam result object 
  const [examResult, setExamResult] = useState(defaultExamResult);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Timer State
  const { openPopup, openSucPopup, setSuccess, openActiveDatePopup,closeCountDownPopup, openCountDownPopup,closeSucPopup ,openAnswerReasonPop} = generalActivePopup();
  const { setVideoNode, videoId, setIsSubmitted,isSubmitted, videoNode, setVideoID, nextNode, setVideoName, setMemeberExam, memeberExam, setLastVideoData } = GenralCoursePlayerId();

  const [isVibrating, setIsVibrating] = useState(false);
  const [isVibrat, setIsVibrat] = useState(false);
  const [code, setCode] = useState<string>(``);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  // const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  // const filteredQuestions = useMemo(() => getFilteredQuestions(), [memeberExam, filter]);



  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [examFailed, setExamFailed] = useState(false);

  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  // const warningTimeout = useRef(null);
  // const inactivityTimeout = useRef(null);

  // const handleSelectExam = (memberExamID: string) => {
  //   setSelectedExamId(memberExamID);
  //   // Fetch exam history or perform other actions with the selected memberExamID
  //   fetchExamHistoryMember(memberExamID);
  // };

  const { mutate: fetchExamHistoryMember, isPending: isFetchingHistoryMember } = useMutation({
    mutationFn: async (memberExamID: string) => {
      const response = await getServerRequest(`/MemberExam/${memberExamID}/solution`);
      return response;
    },
    onSuccess: (data) => {
      console.log("Fetched exam history:", data.data.data);
      setMemeberExam(data.data.data)
      // Handle the fetched history data
    },
    onError: (error) => {
      console.error("Failed to fetch exam history:", error);
    }
  });


  const {
    data: ExamQuestion,
    refetch: refetchExamQuestion,
    isLoading: isLoadingExam,  // Renamed to avoid conflict
    isFetching, // Indicates if data is being refetched
  } = useQuery({
    queryKey: ["examQuestion", { videoId }],
    queryFn: () => getServerRequest(`/MemberExam/${videoId}/questions`),
    enabled: !!videoId && isSubmitted === false, // Only fetch if nodeType is 1 and examId exists
  });

  const { mutate: fetchExamHistory, isPending: isFetchingHistory } = useMutation({
    mutationFn: async () => {
      const response = await getServerRequest(`/MemberExam/${videoId}/history`);
      return response;
    },
    onSuccess: (data) => {
      console.log("Fetched new History questions:", data);
      setQuestionHistory(data.data)
    },
    onError: (error) => {
      console.error("Failed to fetch exam questions:", error);
    }
  });


  const { mutate: submitExam, isPending, isError: isSubmitError } = useMutation({
    mutationFn: (examData: { examId: string; userAnswers: { questionId: string; answerId: string }[] }) =>
      postServerRequest("/MemberExam/submit", examData),
    onSuccess: (data) => {
      console.log("Full API Response:", data);

      const score = data?.data?.data?.score;
      const hasPassed = data?.data?.data?.hasPassed;
      const courseScore = data?.data?.data?.courseScore;
      const degreeScore = data?.data?.data?.degreeScore;
      const timeScore = data?.data?.data?.timeScore;


      // setExamResult(score);
      setExamResult({
        score: data?.data?.data?.score ?? 0,
        hasPassed: data?.data?.data?.hasPassed ?? false,
        courseScore: data?.data?.data?.courseScore ?? 0,
        degreeScore: data?.data?.data?.degreeScore ?? 0,
        successRate: data?.data?.data?.successRate ?? 0,
        timeScore: data?.data?.data?.timeScore ?? 0,
        medal: data?.data?.data?.medal ?? 0,
        isLevelUp: data?.data?.data?.isLevelUp ?? false,
        newLevel: data?.data?.data?.newLevel ?? 0,
        memberExamId: data?.data?.data?.memberExamId ?? "",
      });
      // console.log("Updated Exam Result:", score);

      if (hasPassed) {
        console.log("Exam Passed! Setting Success State.");
        setSuccess(true);
      } else {
        console.log("Exam Failed!");
      }

      openSucPopup();
      
    },
    onError: (error) => {
      console.error("Submission failed:", error);
    },
  });

  useEffect(()=>{
    console.log("is submitted : " + isSubmitted)
  },[isSubmitted])

  const handleReviewMyAnswer = () => {
    if (examResult.memberExamId) {
      fetchExamHistoryMember(examResult.memberExamId);
      closeSucPopup()
    } else {
      console.error("memberExamId is missing in examResult");
    }
  };

  // Reset the inactivity timer when user interacts
  const handleUserActivity = useCallback(() => {
    setLastActivityTime(Date.now());
    setShowWarning(false); // Hide warning popup
    clearTimeout(warningTimeout!);
    clearTimeout(inactivityTimeout!);

    // Restart warning timer
    warningTimeout = setTimeout(() => {
      setShowWarning(true);
      if (!isSubmitted) {
              openCountDownPopup(); // Show the countdown popup
            }
    }, WARNING_TIME);

    // Restart auto-fail timer
    inactivityTimeout = setTimeout(() => {
      // handleSubmit();

      handleExamFailure();
    }, INACTIVITY_LIMIT);
  }, []);

  // const warningTimeout = useRef<number | undefined>(undefined);
  // const inactivityTimeout = useRef<number | undefined>(undefined);

  // Handle user activity (mouse move, key press, etc.)
  // const handleUserActivity = useCallback(() => {
  //   setLastActivityTime(Date.now());
  //   closeCountDownPopup(); // Hide the countdown popup
  //   clearTimeout(warningTimeout.current);
  //   clearTimeout(inactivityTimeout.current);

  //   // Start warning timer
  //   warningTimeout.current = setTimeout(() => {
  //     if (!isSubmitted) {
  //       openCountDownPopup(); // Show the countdown popup
  //     }
  //   }, WARNING_TIME);

  //   // Start auto-fail timer
  //   inactivityTimeout.current = setTimeout(() => {
  //     handleExamFailure();
  //   }, INACTIVITY_LIMIT);
  // }, [closeCountDownPopup, openCountDownPopup, isSubmitted]);

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!isSubmitted) {
      event.preventDefault(); // Show the confirmation dialog
      event.returnValue = "Are you sure you want to leave? Your exam progress will be lost."; // Message for the dialog
      // Do NOT call handleSubmit() here to avoid auto-submission
    }
  };

  // Optional: Handle unload event to detect page leave (less reliable)
  const handleUnload = () => {
    if (!isSubmitted) {
      // Optionally submit here if you want to force submission on leave
      handleSubmit(); // Uncomment if you want to submit on unload
      // console.log("Page unloaded, exam not submitted due to user choice.");
    }
  };

  // useEffect(() => {
  //   if(isSubmitted === false){
  //     document.addEventListener("mousemove", handleUserActivity);
  //     document.addEventListener("keydown", handleUserActivity);
  //     document.addEventListener("click", handleUserActivity);
  
  //     // Start the initial timers
  //     handleUserActivity();
  
      
  //   }
  //   return () => {
  //     document.removeEventListener("mousemove", handleUserActivity);
  //     document.removeEventListener("keydown", handleUserActivity);
  //     document.removeEventListener("click", handleUserActivity);
  //     clearTimeout(warningTimeout!);
  //     clearTimeout(inactivityTimeout!);
  //   };
  // }, [handleUserActivity]);

  useEffect(() => {
    if (!isSubmitted) {
      // Activity listeners
      document.addEventListener("mousemove", handleUserActivity);
      document.addEventListener("keydown", handleUserActivity);
      document.addEventListener("click", handleUserActivity);

      // Page exit/refresh listener
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("unload", handleUnload)

      // Start the initial timers
      handleUserActivity();
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("click", handleUserActivity);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
      clearTimeout(warningTimeout!);
      clearTimeout(inactivityTimeout!);
    };
  }, [handleUserActivity, isSubmitted]);


  // const handleReviewMyAnswer= () => {
  //   fetchExamHistoryMember(examResult.memberExamId)
  // }
  // const handleExamFailure = () => {
  //   if (!isSubmitted) {
  //     // handleSubmit(); // Submit the exam before marking failure
  //   }

  //   setExamFailed(true);
  //   localStorage.setItem("examFailed", "true"); // Save failure state
  //   openCountDownPopup();
  // };
  const handleExamFailure = () => {
    if (!isSubmitted) {
      handleSubmit(); // Submit the exam before marking failure
    }
    setExamFailed(true);
    localStorage.setItem("examFailed", "true");
    closeCountDownPopup(); // Ensure popup is closed after failure
  };
  // Handle unexpected exit
  const handleUnexpectedExit = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    handleExamFailure();
  };

  // let questions;
  useEffect(()=>{
    if(isSubmitted){
      if(filteredQuestions){
        console.log(filteredQuestions)
        setQuestions(filteredQuestions)
      }else{
        
        setQuestions(memeberExam)
      }
    }
    else{
      setQuestions(ExamQuestion?.data.data?.questions)
    }
  },[isSubmitted , ExamQuestion , memeberExam ,filteredQuestions])
  // let questions = filteredQuestions || ExamQuestion?.data.data?.questions || memeberExam || [];

   const getFilteredQuestions = () => {
    if (!memeberExam) return [];
  
    return memeberExam.filter((question: any) => {
      if (filter === "all") return true; // ✅ Show all questions
      if (filter === "correct") return question.isCorrect; // ✅ Show only correctly answered questions
      if (filter === "incorrect") return !question.isCorrect; // ❌ Show only incorrectly answered questions
      return true; // Default case (should not be needed)
    });
  };

  // const filteredQuestions = getFilteredQuestions();
  // setFilteredQuestions(getFilteredQuestions())

  let currentQuestion = questions[currentQuestionIndex] || {
    questionId: 'default-id',
    questionTitleEn: 'No question available',
    answers: [],
    isCodeQuestion: false,
  };
  
  let isLastQuestion = currentQuestionIndex === questions.length - 1;
  // let isLastQuestion = currentQuestionIndex === ExamQuestion?.data.data?.questions?.length - 1;
  const currentQuestionTime = questionTimes[currentQuestion.questionId] || 60;
  // const isTimeUp = currentQuestionTime <= 0;
  // const examvideo = ExamQuestion?.data.data?.examId;

  // if (isLoadingExam || isFetchingHistoryMember) {
  //   return <NewLoader loading={isLoadingExam || isFetchingHistoryMember}/>;
  // }

  useEffect(() => {
    if (ExamQuestion?.data.data?.examDurationInSeconds) {
      setTimeLeft(ExamQuestion?.data.data.examDurationInSeconds);
    }
  }, [ExamQuestion?.data.data]);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when timer reaches zero

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(()=>{
    if(memeberExam){
      currentQuestion = memeberExam[currentQuestionIndex]
      isLastQuestion = currentQuestionIndex == memeberExam.length - 1
    }
  },[memeberExam])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAnswerStatus = (questionId: string, answerId: string) => {
    if (!isSubmitted || !memeberExam) return null;

    const question = memeberExam.find((q: any) => q.questionId === questionId);
    if (!question) return null;

    const answer = question.answers.find((a: any) => a.answerId === answerId);
    if (!answer) return null;

    if (answer.isRightAnswer) {
      return "correct"; // Green: Correct answer
    } else if (answer.isStudentAnswer && !answer.isRightAnswer) {
      return "incorrect"; // Red: User selected an incorrect answer
    } else {
      return null; // No highlight
    }
  };
  const formatUserAnswers = (examId: string, userAnswers: { questionId: string; answerId: string }[]) => {
    return {
      examId: examId,
      userAnswers: userAnswers
    };
  };

  // const formattedData = formatUserAnswers(examId, userAnswers);

  // Handle submission of the current question
  const handleSubmit = () => {
    if(!isSubmitted){
      if (ExamQuestion?.data.data?.examId) {
        const formattedData = formatUserAnswers(ExamQuestion?.data.data.examId, userAnswers);
        submitExam(formattedData);  // ✅ Now correctly passes formatted data
        // console.error("Missing examId or answers");
      } else {
        console.error("Missing examId or answers");
      }
      setIsSubmitted(true);
    }
    // submitExam(formatUserAnswers(questions?.examId, userAnswers));
  };


  const handleRetake = () => {
    setIsSubmitted(false);
    setUserAnswers([]); // ✅ Clear previous answers
    setCurrentQuestionIndex(0);
    setTimeLeft(ExamQuestion?.data.data?.examDurationInSeconds);
    closeSucPopup()
    refetchExamQuestion(); // ✅ Fetch new questions from the API
  };


  const handleAnswerClick = (questionId: string, answer: any) => {
    if (isSubmitted) return; // Prevent selection if the exam is submitted

    setUserAnswers((prev) => {
      // Remove existing entry for the question
      const updatedAnswers = prev.filter((item) => item.questionId !== questionId);

      // Add the new answer
      return [...updatedAnswers, { questionId, answerId: answer.answerId }];
    });

    setSelectedAnswer(answer.answerId);
  };

  const handlePrevAnswers = () => {
    openActiveDatePopup()
    fetchExamHistory()
  }
  // examData.data.questions.map((question) => {
  //   const correctAnswers = examDataAnswers.data.questions.find((q) => q.questionId === question.questionId)?.answers || [];})
  const handleContinueLerning = () => {
    // console.log(JSON.stringfy(nextNode))
    if (nextNode) {
      setVideoNode(nextNode.nodeId)
      setVideoID(nextNode.contentId)
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      setVideoName(`${nextNode.titleEn}`);
      // videoCommentsMutation.mutate(nextNode.contentId);
      setLastVideoData(null);
    }
  }
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex == 0) {
      // console.log("Answer this question before proceeding.");
      if ("vibrate" in navigator) {
        navigator.vibrate(100); // Vibrate for 100ms
      }

      // Trigger CSS animation
      setIsVibrat(true);
      setTimeout(() => setIsVibrat(false), 600); // Remove class after animation

      return; // Stop execution if the question hasn't been answered
    }
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null); // Reset selected answer when moving to a new question
    }
  };


  const handleNextQuestion = () => {
    // ✅ Check if the current question is answered correctly
    const hasAnswered = userAnswers.some(answer => answer.questionId === currentQuestion.questionId);

    if(isSubmitted == false){
      if (!hasAnswered) {
        // 🚨 Vibrate to indicate missing answer
        if ("vibrate" in navigator) {
          navigator.vibrate(100);
        }
  
        // 🚨 Trigger CSS animation for warning effect
        setIsVibrating(true);
        setTimeout(() => setIsVibrating(false), 600);
  
        return; // ⛔ Stop execution if the question hasn't been answered
  
      }
    }


    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null); // Reset selected answer when moving to a new question
    }

    // ✅ Submit the exam if it's the last question
    if (isLastQuestion) {
      handleSubmit();
    }
  };

  useEffect(() => {
    setCode(`
        // - my-code-playground/galaxy
        class class1
        {
          private void Run(string str){
            Console.WriteLine("Hello world");
          }
        }
      `);
  }, []);

  function handleOnChange(value?: string) {
    // console.log('value', value)
    setCode(value || '');
  }
  const handleChange = (value: string) => {
    setFilter(value);
    setFilteredQuestions(getFilteredQuestions()); // ✅ Recalculate filtered questions on change
    // console.log(filteredQuestions)
    // questions = filteredQuestions
    // currentQuestion = getFilteredQuestions()
    // questions = getFilteredQuestions()
  };


  // const getFilteredQuestions = () => {
  //   if (!memeberExam) return [];
  
  //   return memeberExam.filter((question: any) => {
  //     if (filter === "all") return true; // ✅ Show all questions
  //     if (filter === "correct") return question.isCorrect; // ✅ Show only correctly answered questions
  //     if (filter === "incorrect") return !question.isCorrect; // ❌ Show only incorrectly answered questions
  //     return true; // Default case (should not be needed)
  //   });
  // };

  useEffect(() => {
    // Update filtered questions whenever memeberExam or filter changes
    if (memeberExam) {
      setFilteredQuestions(getFilteredQuestions());
      setCurrentQuestionIndex(0); // Reset to the first question when the filter changes
      // console.log(memeberExam)
      // currentQuestion = memeberExam[currentQuestionIndex]
    }
  }, [memeberExam, filter]);

  // Get the current question from the filtered list

  const userSelectedAnswer = userAnswers.find((item) => item.questionId === currentQuestion.questionId)?.answerId;
  const displayedQuestions = isSubmitted ? getFilteredQuestions() : [currentQuestion];
  const displayedQuestion = getFilteredQuestions()[currentQuestionIndex];
  return (
    <>
      <Card className="course_exam">
        {!isSubmitted ? (
          <Text type="secondary" className="course_exam_time">
            {formatTime(timeLeft)}
          </Text>

        ) : (
          <Space wrap>
            <Select
              defaultValue="incorrect"
              style={{ width: 150 }}
              onChange={handleChange}
              options={[
                { value: 'all', label: 'جميع اجاباتي' },
                { value: 'correct', label: 'الاجابات الصحيحه' },
                { value: 'incorrect', label: 'الاجابات الخطأ' },
              ]}
            />
          </Space>
        )}
        <div className="course_exam_header">
          {currentQuestion.isCodeQuestion ? (
            <div style={{ height: "12em", width: "100%", marginBottom: "20px" }}>

              <AceEditor
                mode="csharp"
                theme="dracula"
                onChange={handleOnChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                // value={isSubmitted ?currentQuestion.titleEn :currentQuestion.questionTitleEn}
                value={currentQuestion.questionTitleEn || currentQuestion.titleEn }
              />
            </div>
          ) : (
            // style={{ marginTop: isSubmitted ? 0 : "auto" }}

            <Title level={4} className='course_exam_title' >{isSubmitted ?currentQuestion.titleEn: currentQuestion.questionTitleEn } </Title>
          )}
        </div>
        <div className="line">
          <div className="line-container">
            <span className="line-text">{t("courseExam.answer")}</span>
          </div>
        </div>
        <div className="course_exam_answers_boxs">

          {currentQuestion.answers.map((answer: any) => {
            const answerStatus = getAnswerStatus(currentQuestion.questionId, answer.answerId);
            const isSelected = userSelectedAnswer === answer.answerId;

            return (
              <div key={answer.answerId}>
                {answer.isCodeAnswer ? (
                  <div
                    style={{
                      height: "50px",
                      width: "100%",
                      marginBottom: "0.5em",
                      marginTop: "1.5em",
                      border: `4px solid ${answerStatus === "correct"
                        ? "#97EA7F" // ✅ Green for correct answer
                        : answerStatus === "incorrect"
                          ? "#FAC3C3" // ❌ Red for incorrect answer
                          : isSelected
                            ? "#97EA7F" // ✅ Green for user's selected answer
                            : "#282a36"
                        }`,
                      borderRadius: "8px",
                      cursor: isSubmitted ? "default" : "pointer",
                      backgroundColor:
                        answerStatus === "correct"
                          ? "#97EA7F"
                          : answerStatus === "incorrect"
                            ? "#FAC3C3"
                            : isSelected
                              ? "#97EA7F"
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
                        ? "#97EA7F"
                        : answerStatus === "incorrect"
                          ? "#FAC3C3"
                          : isSelected
                            ? "#97EA7F"
                            : "#E8E8E8"
                        }`,
                      borderRadius: "8px",
                      cursor: isSubmitted ? "default" : "pointer",
                      backgroundColor:
                        answerStatus === "correct"
                          ? "#97EA7F"
                          : answerStatus === "incorrect"
                            ? "#FAC3C3"
                            : isSelected
                              ? "#97EA7F"
                              : "#fff",
                    }}
                  >
                    <div className='why_answer_box'>
                      <Text className="course_exam_box_answers">{answer.answerTitleEn}</Text>

                      {answerStatus === "correct" && answer.answerReason && (
                        <>
                          <button 
                            style={{
                              padding: "4px 8px",
                              borderRadius: "4px",
                              cursor: "pointer"
                            }}
                            onClick={(e) => {
                              // e.stopPropagation(); // Prevent triggering answer selection
                              openAnswerReasonPop()
                            }}
                          >
                            ? Why
                          </button>
                        
                        </>
                          )}
                    </div>
                          <AnswerReason reason={answer.answerReason} />
                  </div>
                )}
              </div>
            );
          })}

        </div>


        <div className='line_break'></div>
        <div className="navigation-buttons">
          {isSubmitted ? (
            isLastQuestion ? (
              <button className="bt_next" onClick={() => handleContinueLerning()} >
                {t("courseExam.next")}
              </button>
            ) : (
              <button className={`bt_next`} onClick={() => handleNextQuestion()}>
                {t("courseExam.nextQuestion")}
              </button>
            )

          ) :
            isLastQuestion ? (
              <button className="bt_next" onClick={() => handleNextQuestion()} disabled={isSubmitted}>
                {t("courseExam.submitAnswer")}
              </button>
            ) : (
              <button className={`bt_next ${isVibrating ? "vibrate" : ""} `} onClick={() => handleNextQuestion()}>
                {t("courseExam.nextQuestion")}
              </button>
            )
          }
          <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {questions.length || ExamQuestion?.data.data?.questions?.length }</p>
          <button className={`bt_prev  ${isVibrat ? "vibrate" : ""} `} onClick={() => handlePreviousQuestion()} >
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
        {/* isPending */}
        {isPending ? <NewLoader loading={isPending} /> : <SuccessPopup result={examResult.degreeScore} timeScore={examResult.timeScore} successRate={examResult.successRate} isLevelUp={examResult.isLevelUp} courseScore={examResult.courseScore} retake={handleRetake} handleReviewMyAnswer={handleReviewMyAnswer} />}

        {/* {isFetchingExam ? <NewLoader loading={isFetchingExam} /> : <SuccessPopup result={examResult} retake={handleRetake} />} */}


        {/* <ActiveAnswersPopup /> */}

        {/* {isFetchingHistory ? <NewLoader loading={isFetchingHistory} /> : <ActiveAnswersPopup questionHistory={questionHistory|| []} onSelectExam={handleSelectExam} />} */}
        {isFetchingHistory ? <NewLoader loading={isFetchingHistory} /> : <ActiveAnswersPopup />}

        <WarningPopup />
        <WarningCountDownPopup handleUserActivity={handleUserActivity} />
      </div>

    </>
  );
};

export default CourseExam;


