import React, { useCallback, useEffect, useState } from 'react';
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


const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds
// const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes in milliseconds
const WARNING_TIME = 5 * 60 * 1000; // 25 minutes
let warningTimeout: NodeJS.Timeout | null = null;
let inactivityTimeout: NodeJS.Timeout | null = null;

const CourseExam = ({ examid  }: { examid: number ,questions:any }) => {
  // State for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const t = useTranslations();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  // const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [userAnswers, setUserAnswers] = useState<{ questionId: string; answerId: string }[]>([]);
  const [questionHistory, setQuestionHistory] = useState<any>();

  const [examResult, setExamResult] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Timer State
  const { openPopup, openSucPopup, setSuccess, openActiveDatePopup, openCountDownPopup  } = generalActivePopup();
  const { setVideoNode, videoId,videoNode ,setVideoID, nextNode ,setVideoName , setLastVideoData} = GenralCoursePlayerId();

  const [isVibrating, setIsVibrating] = useState(false);
  const [isVibrat, setIsVibrat] = useState(false);
  const [code, setCode] = useState<string>(``);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);
  const [examFailed, setExamFailed] = useState(false);

  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

    const handleSelectExam = (memberExamID: string) => {
        setSelectedExamId(memberExamID);
        // Fetch exam history or perform other actions with the selected memberExamID
        fetchExamHistoryMember(memberExamID);
    };

    const { mutate: fetchExamHistoryMember, isPending: isFetchingHistoryMember } = useMutation({
        mutationFn: async (memberExamID: string) => {
            const response = await getServerRequest(`/MemberExam/${memberExamID}/solution`);
            return response;
        },
        onSuccess: (data) => {
            console.log("Fetched exam history:", data);
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
          enabled:  !!videoId, // Only fetch if nodeType is 1 and examId exists
      });


  const { mutate: fetchExamQuestions, isPending: isFetchingExam } = useMutation({
    mutationFn: async () => {
      const response = await getServerRequest(`/MemberExam/${videoId}/questions`);
      return response;
    },
    onSuccess: (data) => {
      console.log("Fetched new exam questions:", data);
      // if (data?.data?.questions) {
      //   setQuestion(data.data.questions); // ✅ Override questions with new data
      //   setTimeLeft(data.data.examDurationInSeconds || 0); // ✅ Reset timer
      // }
    },
    onError: (error) => {
      console.error("Failed to fetch exam questions:", error);
    }
  });

  const { mutate: fetchExamHistory, isPending: isFetchingHistory } = useMutation({
    mutationFn: async()=> {
      const response = await getServerRequest(`/MemberExam/${videoId}/history`);
      return response;
    },
    onSuccess: (data) => {
      console.log("Fetched new History questions:", data);
      setQuestionHistory(data.data)
      // if (data?.data?.questions) {
      //   setQuestion(data.data.questions); // ✅ Override questions with new data
      //   setTimeLeft(data.data.examDurationInSeconds || 0); // ✅ Reset timer
      // }
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
      
          setExamResult(score);
          console.log("Updated Exam Result:", score);
      
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

  // Reset the inactivity timer when user interacts
  const handleUserActivity = useCallback(() => {
    setLastActivityTime(Date.now());
    setShowWarning(false); // Hide warning popup
    clearTimeout(warningTimeout!);
    clearTimeout(inactivityTimeout!);

    // Restart warning timer
    warningTimeout = setTimeout(() => {
      setShowWarning(true);
    }, WARNING_TIME);

    // Restart auto-fail timer
    inactivityTimeout = setTimeout(() => {
      handleSubmit();
      handleExamFailure();
    }, INACTIVITY_LIMIT);
  }, []);

  // Attach event listeners

  useEffect(()=>{
    console.log("ExamQuestion: ", ExamQuestion?.data.data);

  }, [ExamQuestion?.data.data])
  useEffect(()=>{
    console.log("userAnswers : ", userAnswers);

  }, [userAnswers])


  useEffect(() => {
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("click", handleUserActivity);
    
    // Start the initial timers
    handleUserActivity();

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("click", handleUserActivity);
      clearTimeout(warningTimeout!);
      clearTimeout(inactivityTimeout!);
    };
  }, [handleUserActivity]);
 
 

  const handleExamFailure = () => {
    if (!isSubmitted) {
      handleSubmit(); // Submit the exam before marking failure
    }
    
    setExamFailed(true);
    localStorage.setItem("examFailed", "true"); // Save failure state
    openCountDownPopup();
  };
  // Handle unexpected exit
  const handleUnexpectedExit = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    handleExamFailure();
  };


  // Get the current question and its details
  const currentQuestion = ExamQuestion?.data.data?.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === ExamQuestion?.data.data?.questions?.length - 1;
  const currentQuestionTime = questionTimes[currentQuestion.questionId] || 60;
  const isTimeUp = currentQuestionTime <= 0;
  const examvideo = ExamQuestion?.data.data?.examId;


  // useEffect(()=>{
  //   // if(isSubmitted == false && examid != videoId){
  //   if(isSubmitted == false && "74c4d62d-ad40-41cb-ba46-2d607b6824fb" != videoId){
  //     openWarningClosePop()
  //   }
  // },[videoId])

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

 

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // const getAnswerStatus = (questionId: string, answerId: string) => {
  //   if (!isSubmitted) return null; // No status if not submitted

  //   const correctAnswer = examDataAnswers.data.questions
  //     .find((q) => q.questionId === questionId)
  //     ?.answers.find((a) => a.right);

  //   const userAnswer = userAnswers[questionId];

  //   if (answerId === correctAnswer?.answerId) {
  //     return "correct"; // Correct answer
  //   } else if (userAnswer?.answerId === answerId && userAnswer?.answerId !== correctAnswer?.answerId) {
  //     return "incorrect"; // User's wrong answer
  //   } else {
  //     return null; // No status
  //   }
  // };

  const getAnswerStatus = (questionId: string, answerId: string) => {
    if (!isSubmitted || !questionHistory) return null;

    const correctAnswer = questionHistory.data.data
      .find((q: any) => q.questionId === questionId)
      ?.answers.find((a: any) => a.isRightAnswer);

    const userAnswer = userAnswers.find((answer) => answer.questionId === questionId);

    if (answerId === correctAnswer?.answerId) {
      return "correct";
    } else if (userAnswer?.answerId === answerId && userAnswer?.answerId !== correctAnswer?.answerId) {
      return "incorrect";
    } else {
      return null;
    }
  };


  // const getAnswerStatus = (questionId: string, answerId: string) => {
  //   if (!isSubmitted) return null; // No status if not submitted

  //   const correctAnswer = examDataAnswers.data.questions
  //     .find((q) => q.questionId === questionId)
  //     ?.answers.find((a) => a.right);

  //   // ✅ Find the user's selected answer in the array
  //   const userAnswer = userAnswers.find((answer) => answer.questionId === questionId);

  //   if (answerId === correctAnswer?.answerId) {
  //     return "correct"; // Correct answer
  //   } else if (userAnswer?.answerId === answerId && userAnswer?.answerId !== correctAnswer?.answerId) {
  //     return "incorrect"; // User's wrong answer
  //   } else {
  //     return null; // No status
  //   }
  // };
  const formatUserAnswers = (examId: string, userAnswers: { questionId: string; answerId: string }[]) => {
    return {
        examId: examId,
        userAnswers: userAnswers
    };
  };

  // const formattedData = formatUserAnswers(examId, userAnswers);

  // Handle submission of the current question
  const handleSubmit = () => {
    setIsSubmitted(true);

    if (ExamQuestion?.data.data?.examId) {
      const formattedData = formatUserAnswers(ExamQuestion?.data.data.examId, userAnswers);
      submitExam(formattedData);  // ✅ Now correctly passes formatted data
      } else {
          console.error("Missing examId or answers");
      }
    // submitExam(formatUserAnswers(questions?.examId, userAnswers));
  };


  const handleRetake = () => {
    setIsSubmitted(false);
    setUserAnswers([]); // ✅ Clear previous answers
    setCurrentQuestionIndex(0);
      setTimeLeft(ExamQuestion?.data.data?.examDurationInSeconds);
    
    fetchExamQuestions(); // ✅ Fetch new questions from the API
  };
  // const handleAnswerClick = (questionId: string, answer: any) => {
  //   if (isSubmitted) return; // Prevent selection if exam is submitted

  //   setUserAnswers((prev) => ({
  //     ...prev,
  //     [questionId]: answer.answerId,
  //   }));
  //   setSelectedAnswer(answerId);
  // };


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
  const handleContinueLerning = ()=>{
    // console.log(JSON.stringfy(nextNode))
    if(nextNode){
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

  // const formatUserAnswers = (examId: string, userAnswers: { questionId: string; answerId: string }[]) => {
  //   return {
  //       examId: examId,
  //       userAnswers: userAnswers
  //   };
  // };

  // const formattedData = formatUserAnswers(examId, userAnswers);

  const handleNextQuestion = () => {
    // ✅ Check if the current question is answered correctly
    const hasAnswered = userAnswers.some(answer => answer.questionId === currentQuestion.questionId);
    
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

    // ✅ Move to the next question if possible
    if (currentQuestionIndex < ExamQuestion?.data.data?.questions?.length - 1) {
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
    console.log('value', value)
    setCode(value || '');
  }
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const userSelectedAnswer = userAnswers.find((item) => item.questionId === currentQuestion.questionId)?.answerId;

  return (
    <>
      <Card className="course_exam">
        {!isSubmitted ? (
          <Text type="secondary" className="course_exam_time">
            {formatTime(timeLeft)}
          </Text>
          // <Text type="secondary" className="course_exam_time">
          //   {formatTime(currentQuestionTime)}
          // </Text>

        ):(
          <Space wrap>
            <Select
              defaultValue="جميع اجاباتي"
              style={{ width: 150 }}
              onChange={handleChange}
              options={[
                { value: 'جميع اجاباتي', label: 'جميع اجاباتي' },
                { value: 'الاجابات الصحيحه', label: 'الاجابات الصحيحه' },
                { value: 'الاجابات الخطأ', label: 'الاجابات الخطأ' },
              ]}
            />
          </Space>
        )}
        <div className="course_exam_header">
          {currentQuestion.isCodeQuestion ? (
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
            <Title level={4} className='course_exam_title'  style={{ marginTop: isSubmitted ? 0 : "auto" }}>{currentQuestion.questionTitleEn} </Title>

          )}
        </div>
        <div className="line">
          <div className="line-container">
            <span className="line-text">{t("courseExam.answer")}</span>
          </div>
        </div>
        <div className="course_exam_answers_boxs">
  {currentQuestion?.answers.map((answer: any) => {
    const answerStatus = getAnswerStatus(currentQuestion.questionId, answer.answerId);
    const isSelected = userAnswers.some((item) => item.questionId === currentQuestion.questionId && item.answerId === answer.answerId);

    // Check if questionHistory exists
    const isCorrectAnswer = questionHistory
      ? questionHistory.data.data
          .find((q: any) => q.questionId === currentQuestion.questionId)
          ?.answers.find((a: any) => a.isRightAnswer)?.answerId === answer.answerId
      : answerStatus === "correct"; // Fallback to answerStatus if no questionHistory

    return (
      <div key={answer.answerId}>
        {currentQuestion.isCodeQuestion ? (
          <div
            style={{
              height: "50px",
              width: "100%",
              marginBottom: "0.5em",
              marginTop: "1.5em",
              border: `4px solid ${
                isSubmitted || questionHistory
                  ? isCorrectAnswer
                    ? "#97EA7F" // Green for correct answer in history or submitted exam
                    : "#282a36" // Default border for other answers
                  : isSelected
                  ? "#97EA7F" // Green for user's selected answer
                  : "#282a36"
              }`,
              borderRadius: "8px",
              cursor: isSubmitted || questionHistory ? "default" : "pointer", // Disable cursor after submission or in history
              backgroundColor:
                isSubmitted || questionHistory
                  ? isCorrectAnswer
                    ? "#97EA7F" // Green background for correct answer in history or submitted exam
                    : "#fff" // Default background for other answers
                  : isSelected
                  ? "#97EA7F" // Green background for user's selected answer
                  : "#fff",
            }}
            onClick={() => !isSubmitted && !questionHistory && handleAnswerClick(currentQuestion.questionId, answer)}
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
            onClick={() => !isSubmitted && !questionHistory && handleAnswerClick(currentQuestion.questionId, answer)}
            style={{
              padding: "16px",
              margin: "8px 0",
              border: `2px solid ${
                isSubmitted || questionHistory
                  ? isCorrectAnswer
                    ? "#97EA7F" // Green for correct answer in history or submitted exam
                    : "#FAC3C3" // Default border for other answers
                  : isSelected
                  ? "#97EA7F" // Green for user's selected answer
                  : "#FAC3C3"
              }`,
              borderRadius: "8px",
              cursor: isSubmitted || questionHistory ? "default" : "pointer", // Disable cursor after submission or in history
              backgroundColor:
                isSubmitted || questionHistory
                  ? isCorrectAnswer
                    ? "#97EA7F" // Green background for correct answer in history or submitted exam
                    : "#fff" // Default background for other answers
                  : isSelected
                  ? "#97EA7F" // Green background for user's selected answer
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
        

        <div className='line_break'></div>
        <div className="navigation-buttons">
        {isSubmitted ? (
            <button className="bt_next" onClick={() => handleContinueLerning()} >
              {t("courseExam.next")}
            </button>
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
          <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {ExamQuestion?.data.data?.questions?.length}</p>
          <button className={`bt_prev  ${isVibrat ? "vibrate" : ""} `} onClick={() => handlePreviousQuestion()} >
            {t("courseExam.prevQuestion")}
          </button>
        </div>

        {!isSubmitted && (
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
        {isPending ? <NewLoader loading={isPending} /> : <SuccessPopup result={examResult} retake={handleRetake}/>}

        {/* {isFetchingExam ? <NewLoader loading={isFetchingExam} /> : <SuccessPopup result={examResult} retake={handleRetake} />} */}

        
        {/* <ActiveAnswersPopup /> */}

        {isFetchingHistory ? <NewLoader loading={isFetchingHistory} /> : <ActiveAnswersPopup questionHistory={questionHistory|| []} onSelectExam={handleSelectExam} />}
        
        <WarningPopup />
        <WarningCountDownPopup  handleUserActivity={handleUserActivity} />
      </div>

    </>
  );
};

export default CourseExam;


// return (
//   <div key={answer.answerId}>
//     {currentQuestion.isCodeQuestion ? (
//       <div
//         style={{
//           height: "50px",
//           width: "100%",
//           marginBottom: "0.5em",
//           marginTop:"1.5em",
//           border: `4px solid ${answerStatus === "correct"
//               ? "#97EA7F" // Green for correct answer
//               : answerStatus === "incorrect"
//                 ? "#FAC3C3" // Red for incorrect answer
//                 : isSelected
//                   ? "#97EA7F" // Green for user's selected answer
//                   : "#282a36"
//             }`,
//           borderRadius: "8px",
//           cursor: isSubmitted ? "default" : "pointer", // Disable cursor after submission
//           backgroundColor:
//             answerStatus === "correct"
//               ? "#97EA7F" // Green for correct answer
//               : answerStatus === "incorrect"
//                 ? "#FAC3C3" // Red for incorrect answer
//                 : isSelected
//                   ? "#97EA7F" // Green for user's selected answer
//                   : "#fff",
//         }}
//         onClick={() => !isSubmitted && handleAnswerClick(currentQuestion.questionId, answer)}
//       >
//         <AceEditor
//           mode="csharp"
//           theme="dracula"
//           name="UNIQUE_ID_OF_DIV"
//           editorProps={{ $blockScrolling: true }}
//           value={answer.answerTitleAr}
//           showGutter={false}
//           highlightActiveLine={false}
//         />
//       </div>
//     ) : (
//       <div
//         onClick={() => !isSubmitted && handleAnswerClick(currentQuestion.questionId, answer)}
//         style={{
//           padding: "16px",
//           margin: "8px 0",
//           border: `2px solid ${answerStatus === "correct"
//               ? "#97EA7F" // Green for correct answer
//               : answerStatus === "incorrect"
//                 ? "#FAC3C3" // Red for incorrect answer
//                 : isSelected
//                   ? "#97EA7F" // Green for user's selected answer
//                   : "#FAC3C3"
//             }`,
            
//           borderRadius: "8px",
//           cursor: isSubmitted ? "default" : "pointer", // Disable cursor after submission
//           backgroundColor:
//             answerStatus === "correct"
//               ? "#97EA7F" // Green for correct answer
//               : answerStatus === "incorrect"
//                 ? "#FAC3C3" // Red for incorrect answer
//                 : isSelected
//                   ? "#97EA7F" // Green for user's selected answer
//                   : "#fff",
//         }}
//       >
//         <Text className="course_exam_box_answers">{answer.answerTitleEn}</Text>
//       </div>
//     )}
//   </div>
// );
// })}