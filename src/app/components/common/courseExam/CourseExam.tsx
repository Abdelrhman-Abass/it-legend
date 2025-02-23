import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from 'antd';
import GeneralPopup from '../generalPopup/GeneralPopup';
import generalActivePopup from "@/app/store/ActivePopup";
import SuccessPopup from '../generalPopup/successPopup';
import ActiveAnswersPopup from '../generalPopup/activeAnswersPopup';

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
        answers: [
          { answerId: "54264f34-8831-4581-bd0d-6413cc125550", answerTitleAr: "Mobiles apps", answerTitleEn: "Mobiles apps" },
          { answerId: "624ad0e3-3020-4f1c-9169-8078bc9b7740", answerTitleAr: "Desktop apps", answerTitleEn: "Desktop apps" },
          { answerId: "8026776c-1a9f-43eb-bfc7-bd60ea84a116", answerTitleAr: "Web apps", answerTitleEn: "Web apps" },
          { answerId: "c0f11da8-850c-4166-a4fe-f39d4fedb571", answerTitleAr: "All of the above", answerTitleEn: "All of the above" }
        ]
      },
      {
        "questionId": "6f5c5799-670a-48df-b691-bd086395e8b3",
        "questionTitleAr": "What is the extension of a C# language file",
        "questionTitleEn": "What is the extension of a C# language file",
        
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

const QuestionComponent: React.FC = () => {
  // State for tracking the current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [timeLeft, setTimeLeft] = useState(examData.data.examDurationInSeconds); // Timer State
  const { openPopup , openSucPopup ,setSuccess , openActiveDatePopup } = generalActivePopup();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const handleOpenPopup = () => {
      openPopup(); // Pass video URL
  };

  // Get the current question and its details
  const currentQuestion = examData.data.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === examData.data.questions.length - 1;

  
    useEffect(() => {
        if (timeLeft <= 0) {
          alert("Time is up! Submitting exam...");
          return;
        }
    
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
    
        return () => clearInterval(timer); // Cleanup interval
      }, [timeLeft]);
    
      // ⏳ Convert seconds into MM:SS format
      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
    
    // Handle submission of the current question
    const handleSubmit = () => {
        setIsSubmitted(true);
        if (isLastQuestion) {
          openSucPopup()
          setSuccess()
          
        } 
    };
    
    const handleAnswerClick = (questionId: string, answer: any) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: answer, // Store the entire answer object
        }));
        setSelectedAnswer(answer);
  };

  const handlePrevAnswers = ()=>{
    openActiveDatePopup()
  }

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

        if(isLastQuestion){
            handleSubmit();
        }
    };

  return (
    <>
      <Card  className="course_exam">
          <div className="course_exam_header">
              <Text type="secondary" className="course_exam_time">
              {formatTime(timeLeft)}
              </Text>
              <Title level={4} className='course_exam_title'>{currentQuestion.questionTitleEn}</Title>
          </div>
        <div className="line">
          <div className="line-container">
              <span className="line-text">Answer</span>
          </div>
        </div>
        <div className="course_exam_answers_boxs">
          {currentQuestion.answers.map((answer, index) => (
            <div
            key={answer.answerId}
            onClick={() => handleAnswerClick(currentQuestion.questionId, answer)}
              style={{
                padding: '16px',
                margin: '8px 0',
                border: `2px solid ${userAnswers[currentQuestion.questionId]?.answerId === answer.answerId ? '#97EA7F' : '#d9d9d9'}`,              
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: userAnswers[currentQuestion.questionId]?.answerId === answer.answerId ? '#97EA7F' : '#fff',
              }}
            >
              <Text className="course_exam_box_answers">{answer.answerTitleEn}</Text>
            </div>
          ))}
        </div>
        <div className='line_break'></div>
        <div className="navigation-buttons">
              <button className="bt_next" onClick={() => handleNextQuestion()}>
                  {isLastQuestion ? "Submit Answers" : "Next Question"}
              </button>
              <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {examData?.data?.questions.length}</p>
              <button className="bt_prev" onClick={() => handlePreviousQuestion()} disabled={currentQuestionIndex === 0}>
                  Previous Question
              </button>
          </div>

          {isSubmitted && (
            <>
              <div className='line_break' style={{marginTop:"30px"}}></div>
              <div className="navigation-buttons">
                    <button className="bt_again" onClick={() => handleNextQuestion()}>
                        اعادة الامتحان
                    </button>
                    {/* <p className="course_exam_len">Question {currentQuestionIndex + 1} out of {examData?.data?.questions.length}</p> */}
                    <button className="bt_prev_question" onClick={handlePrevAnswers} >
                        الاجابات السابقة
                    </button>
                </div>
            
            </>

          )}


      </Card>

          <div>
              {/* <GeneralPopup isVideo={false} isExam={false} success={true}/> */}
              <SuccessPopup/>
              <ActiveAnswersPopup />
          </div>
    
    </>
  );
};

export default QuestionComponent;