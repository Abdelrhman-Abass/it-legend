"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  Crown,
  Edit,
  Link,
  MessageCircleMore,
  MessageCircleQuestion,
  MessageSquareX,
  Play,
} from "lucide-react";
// import { Link } from "@/navigation";

import { FilePen, FileText, FileVideo, Paperclip } from "lucide-react";

import { Avatar, Modal, Progress, Tooltip } from "antd";
import { useLocale } from "next-intl";
import CourseAccordion from "./CourseAccordion";
import Player from "./Player";
import { useSearchParams } from "next/navigation";
import CommentFormCourse from "@/components/forms/comment-form-course";
import SingleComment from "@/components/course-details/single-comment";
import {
  getAsks,
  deleteAsk,
  sendeAsk,
  editAsk,
} from "../../utils/coursesHandler";
import { validateYupSchema } from "formik";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import { UserHeader } from "@/layout";
import Test from "./Test"

const Content = ({ data, courseId, links, testData }) => {
  const local = useLocale();
  const [moduleId, setModuleId] = useState(null);
  const [showPlayerSide, setShowPlayerSide] = useState(true);
  const [percent, setPercent] = useState(33);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const type = params.get("type");
  const contentId = params.get("contentId");
  const [board, setBoard] = useState(false);
  const [ask, setAsk] = useState(false);
  const [askData, setAskData] = useState([]);
  const [getAskLoad, setGetAskLoad] = useState(false);
  const [userAsk, setUserAsk] = useState("");
  const [loadSubmitAsk, setLoadSubmitAsk] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const [modules, setModules] = useState([])
  const [openAccordion, setOpenAccordion] = useState(null);

  const nodeModule = [
    {
      "nodeId": "8f6f7c08-ed89-4c9e-85aa-a35f744a578d",
      "titleAr": "introduction",
      "titleEn": "introduction",
      "type": 0,
      "displayOrder": 1,
      "contentId": "7cfa5417-88d9-4f6f-840d-58d349514c97",
      "isFree": false,
      "duration": "00:03:06",
      "isWatched": true,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "d976f2bc-999f-4ec8-a10c-2f7216ca928a",
      "titleAr": "مراجعة ليلة الامتحان",
      "titleEn": "Exam night review",
      "type": 4,
      "displayOrder": 2,
      "contentId": "39a435df-f173-4d03-bc14-9be615b3cf66",
      "isFree": false,
      "duration": false,
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "4fccb9d7-f275-4b1c-88ea-8786e669c16e",
      "titleAr": "2-What-Is-.Net",
      "titleEn": "2-What-Is-.Net",
      "type": 0,
      "displayOrder": 3,
      "contentId": "a71df177-f684-48ef-8d2a-70888e37dc4f",
      "isFree": true,
      "duration": "00:06:08",
      "isWatched": true,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "230e4998-726c-4c74-9a6f-14ae261c1fca",
      "titleAr": "3-History",
      "titleEn": "3-History",
      "type": 0,
      "displayOrder": 4,
      "contentId": "7cdea3c9-999a-4972-b69b-e2ac2c2692a1",
      "isFree": true,
      "duration": "00:06:16",
      "isWatched": true,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "75e739f8-10aa-45ae-b382-4ba72ff220bc",
      "titleAr": "4-Road-Maps",
      "titleEn": "4-Road-Maps",
      "type": 0,
      "displayOrder": 5,
      "contentId": "b81f167a-cbc3-4565-9549-0b5c5eb6a69b",
      "isFree": true,
      "duration": "00:05:56",
      "isWatched": true,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "91c61c01-3732-471d-8560-7183e549502f",
      "titleAr": "5-Install-Visual-Studio-2022",
      "titleEn": "5-Install-Visual-Studio-2022",
      "type": 0,
      "displayOrder": 6,
      "contentId": "88fabac3-7e23-462c-804d-69c5634fc3c4",
      "isFree": false,
      "duration": "00:07:45",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "a632e5fe-024d-47b4-b8e6-8d62c7c76f21",
      "titleAr": "6-Create-First-Project-",
      "titleEn": "6-Create-First-Project-",
      "type": 0,
      "displayOrder": 7,
      "contentId": "796c29f8-c89f-4043-97f2-96077fb7d33c",
      "isFree": false,
      "duration": "00:06:37",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "a3c1b4d6-e41b-4dcc-9174-232703de5413",
      "titleAr": "7-Solution-And-Projects",
      "titleEn": "7-Solution-And-Projects",
      "type": 0,
      "displayOrder": 8,
      "contentId": "83857807-f0ee-4d07-8164-baa48491b8c0",
      "isFree": false,
      "duration": "00:11:58",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "a38aa621-b860-49c2-a894-e1e3c6fdc126",
      "titleAr": "8-Visual-Studio-Environment",
      "titleEn": "8-Visual-Studio-Environment",
      "type": 0,
      "displayOrder": 9,
      "contentId": "cb4ceb8f-aa90-42ea-b666-5b66e84bee7c",
      "isFree": false,
      "duration": "00:14:58",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "966b354a-3c45-4cbc-bf9f-2ccb07c56d7a",
      "titleAr": "9-How-C-Complier-Work",
      "titleEn": "9-How-C-Complier-Work",
      "type": 0,
      "displayOrder": 10,
      "contentId": "e924a18f-dfdf-497e-8b5d-05363ef6f6fe",
      "isFree": false,
      "duration": "00:10:43",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "b64eb830-f1a8-4063-b793-785c04cfece0",
      "titleAr": "10-Namespace-Vs-Class-Vs-Method",
      "titleEn": "10-Namespace-Vs-Class-Vs-Method",
      "type": 0,
      "displayOrder": 11,
      "contentId": "4f1fb911-ddb1-4bb8-88f8-a4a48dd78417",
      "isFree": false,
      "duration": "00:14:29",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "60384133-b3f1-4dd4-8fc8-97a8fdd4cb1f",
      "titleAr": "11-Namespaces-And-Usings",
      "titleEn": "11-Namespaces-And-Usings",
      "type": 0,
      "displayOrder": 12,
      "contentId": "30521351-a7cc-434b-ba1b-10f13eb285b2",
      "isFree": false,
      "duration": "00:14:24",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "d9405ed6-cb00-4600-9b9e-cc6d348b00df",
      "titleAr": "12-Syntax-Basics",
      "titleEn": "12-Syntax-Basics",
      "type": 0,
      "displayOrder": 13,
      "contentId": "efd3d2b3-5cc7-4ebf-89fc-5f4bae7c1060",
      "isFree": false,
      "duration": "00:08:26",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "a8ef3aad-a92e-42ea-9fae-560e644af6c5",
      "titleAr": "13-Comments",
      "titleEn": "13-Comments",
      "type": 0,
      "displayOrder": 14,
      "contentId": "71a64c68-0835-448e-8b6f-7dddec47cd15",
      "isFree": false,
      "duration": "00:08:08",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "b9551eaf-2d90-4309-a6f2-ee3a8697eefb",
      "titleAr": "14-Input-And-Output",
      "titleEn": "14-Input-And-Output",
      "type": 0,
      "displayOrder": 15,
      "contentId": "7cb2c4a4-8980-4271-a231-7ebc45050d6e",
      "isFree": false,
      "duration": "00:09:13",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "de4d81ca-a2f1-4b36-95a0-3bb50bba88bd",
      "titleAr": "15-Debugging",
      "titleEn": "15-Debugging",
      "type": 0,
      "displayOrder": 16,
      "contentId": "55126b6d-a172-4d51-9840-860c09c9c19d",
      "isFree": false,
      "duration": "00:13:15",
      "isWatched": false,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "8bb805b6-be8e-4530-a95d-1749b2bab080",
      "titleAr": "16-Install-C-In-Vs-Code",
      "titleEn": "16-Install-C-In-Vs-Code",
      "type": 0,
      "displayOrder": 17,
      "contentId": "74ed2d94-b2af-4799-9fda-288c816c302e",
      "isFree": false,
      "duration": "00:10:28",
      "isWatched": true,
      "isPassed": false,
      "questionCount": false
    },
    {
      "nodeId": "92756a24-de21-4397-9aab-a376fd3d41f6",
      "titleAr": "Get Started",
      "titleEn": "Get Started",
      "type": 1,
      "displayOrder": 18,
      "contentId": "74c4d62d-ad40-41cb-ba46-2d607b6824fb",
      "isFree": false,
      "duration": false,
      "isWatched": false,
      "isPassed": true,
      "questionCount": 19
    }
  ]

  useEffect(() => {
    setModules(testData)
  })
  // get current contentId
  useEffect(() => {
    const foundModule = data?.nodes.find((module) =>
      module.nodes.some((node) => node.contentId === contentId)
    );
    const moduleId = foundModule?.moduleId || null;
    setModuleId(moduleId);
  }, [data?.nodes, contentId]);

  const getAsksWhenOpenModal = async () => {
    let res = await getAsks(courseId);
    setAskData(res?.data);
  };

  useEffect(() => {
    const getdata = async () => {
      setGetAskLoad(true);
      await getAsksWhenOpenModal();
      setGetAskLoad(false);
    };
    if (ask) {
      getdata();
    }
  }, [ask]);

  // console.log(data)
  const sendAsk = async () => {
    try {
      setLoadSubmitAsk(true);
      const body = {
        Message: userAsk,
        VideoId: contentId,
        VideoMinute: "00:03:20",
      };
      let res = await sendeAsk(body);
      console.log("res", res);
      setUserAsk("");
      setIsEdit(null);
      await getAsksWhenOpenModal();
    } catch (err) {
      console.log("err", err);
    } finally {
      setLoadSubmitAsk(false);
    }
  };

  const editAskUser = async () => {
    if (isEdit) {
      try {
        setLoadSubmitAsk(true);
        const body = {
          Message: userAsk,
          VideoConversationId: isEdit,
        };
        let res = await editAsk(body);
        console.log("res", res);
        await getAsksWhenOpenModal();
        setUserAsk("");
        setIsEdit(null);
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoadSubmitAsk(false);
      }
    }
  };
  return (
    <>
      {/* Leader Board */}
      <Modal
        footer={true}
        width={450}
        onCancel={() => setBoard(false)}
        style={{
          borderRadius: 14,
          padding: "15px 20px 0",
          top: "5vh",
        }}
        open={board}
      >
        <div className="board-head">
          <p>Course Name Shown Here</p>
          <p>Leaderboard</p>
        </div>
        <div className="borad-text">
          <span>💪</span>
          <sapn>
            عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة.. كمّل
            عايز أشوف اسمك في الليدر بورد هنا
          </sapn>
        </div>
        <div className="borad-grid">
          <div className="third">
            <Avatar size={36} />
            <p> Name</p>
            <div className="borad-badge">20k Points</div>{" "}
            <div className="col">3</div>
          </div>
          <div className="first">
            <Avatar size={36} />
            <p> Name</p>
            <div className="borad-badge">36k Points</div>{" "}
            <div className="col">1</div>
          </div>
          <div className="secound">
            <Avatar size={36} />
            <p> Name</p>
            <div className="borad-badge">27k Points</div>
            <div className="col">2</div>
          </div>
        </div>
        <div className="board-table">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Modal>
      {/* Ask */}
      <Modal
        footer={false}
        width={450}
        onCancel={() => setAsk(false)}
        style={{
          borderRadius: 14,
          padding: "15px 20px 0",
          top: "5vh",
        }}
        open={ask}
      >
        <div className="board-head">
          <p>اسأل سؤالك وسوف يتم الرد عليك</p>
          <p>في اسرع وقت</p>
        </div>
        <div className="comment-container">
          {askData?.map(
            ({
              fullName,
              message,
              videoConversationId,
              videoMinute,
              image,
            }) => {
              return (
                <div key={videoConversationId} className="comment">
                  <div className="comment-head">
                    <div>
                      <Avatar size={42} />
                      <div>
                        <p>{fullName} </p>
                        <p>{videoMinute}</p>
                      </div>
                    </div>
                    <div>
                      <Tooltip title="Edit">
                        <button
                          onClick={() => {
                            setIsEdit(videoConversationId);
                            setUserAsk(message);
                          }}
                        >
                          <Edit size={22} />
                        </button>
                      </Tooltip>{" "}
                      <Tooltip title="Remove">
                        <button
                          onClick={async () => {
                            await deleteAsk({ videoConversationId });
                            await getAsksWhenOpenModal();
                          }}
                        >
                          <MessageSquareX size={26} />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                  <p>{message}</p>
                </div>
              );
            }
          )}
        </div>
        <div className="leave-comment">
          <textarea
            value={userAsk}
            onChange={(value) => setUserAsk(value.target.value)}
            rows={3}
          ></textarea>
          <button
            onClick={() => {
              isEdit ? editAskUser() : sendAsk();
            }}
          >
            أسال
          </button>
        </div>
      </Modal>


      <div style={{ position: "relative" }}>
        <div
          className={`${showPlayerSide ? "show" : "hide"} player-side`}
          style={{
            right: local == "ar" ? 0 : "auto",
            left: local == "en" ? 0 : "auto",
            paddingRight: local == "ar" ? 16 : 6,
            paddingLeft: local == "en" ? 16 : 6,
            width: 416,
            paddingTop: 64,
          }}
        >
          <div className="course-curriculam mb--90">
            <h3 className="heading-title">محتوي الكورس</h3>
            <div
              style={{
                position: "relative",
                padding: "20px 0 40px",
                width: "100%",
              }}
            >
              <Tooltip title={"Your Progress"}>
                <Progress
                  percent={percent}
                  strokeColor="#6ABD8A"
                  showInfo={false}
                />
              </Tooltip>
              {/* Custom percentage text below the bar */}
              <div
                className="percent-label"
                style={{
                  position: "absolute",
                  right: local == "ar" ? `${percent - 5}%` : "auto",
                  left: local == "en" ? `${percent - 5}%` : "auto",
                  top: "35px",
                  transition: "all 0.1s",
                }}
              >
                {percent}%
              </div>
            </div>
            <CourseAccordion
              moduleId={moduleId}
              nodes={data?.nodes}
              stoppedIndex={data?.stoppedIndex}
            />
            <div>
              {/* <div className="accordion edu-accordion" id="accordionExample">
                {modules.map((module, idx) => (
                  <div className="accordion-item" key={module.moduleId}>
                    <h3 className="accordion-header" id={`heading-${idx}`}>
                      <button
                        className={`accordion-button ${openAccordion === idx ? "" : "collapsed"}`}
                        type="button"
                        onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                        aria-expanded={openAccordion === idx ? "true" : "false"}
                      >
                        {module.moduleTitleAr} 
                      </button>
                    </h3>
                    <div
                      id={`module-${module.moduleId}`}
                      className={`accordion-collapse collapses ${openAccordion === idx ? "show" : ""}`}
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                          {nodeModule.map((node) => (
                            <li key={node.nodeId} className="d-flex justify-content-between align-items-center">
                              <span className="node-title">{node.titleAr}</span>
                              {node.type === 0 && <span className="duration-node">{node.duration}</span>}
                            </li>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}

              {
                modules.map((course, idx) => (
                  // <CourseAccordion
                  //   key={idx}
                  //   moduleId={moduleId}
                  //   nodes={data?.nodes}
                  //   moduleIdtest={course.moduleId}
                  //   data={course.nodes}
                  // http://localhost:3000/en/course-player/c7f5bfef-8117-4021-b83e-448051bced9a?contentId=video1&type=0&playerType=0
                  // stoppedIndex={data?.stoppedIndex}  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE4YzhlMGQ1LTU5MmYtNDdhZC1hYWIyLTA2OWM2MjEwNmVkOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhbGFhbXVoYW1lZDk3QGdtYWlsLmNvbSIsImp0aSI6IjY3ODEyYzBlLWI1NGYtNGE4Zi1hM2NkLTAxMzEyNjY2MGI1ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE3MzI3MTQyMzYsImlzcyI6Imh0dHBzOi8vd3d3Lml0bGVnZW5kLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5pdGxlZ2VuZC5uZXQvIn0.JS5MS9McA3ZTz9qigyMHZetUBY_xC_iSsYuqqm3gY4c
                  // />
                  // <p>{course.nodes.map((no,i)=>(<p>{no.nodeId}</p>))}</p>
                  // <Test testData={course} key={idx}/>
                  <div className="accordion edu-accordion" id="accordionExample" key={idx}>
                    <div className="accordion-item">
                      <h3 className="accordion-header" id={`heading-${idx}`}>
                        <button
                          className={`accordion-button ${openAccordion === idx ? "" : "collapsed"}`}
                          type="button"
                          onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                          aria-expanded={openAccordion === idx ? "true" : "false"}
                        >
                          <span style={{ textAlign: "start" }}>
                            {course.moduleTitleAr}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`module-${course.moduleId}`}
                        className={`accordion-collapse  ${"show"}`}
                        data-bs-parent="#faq-accordion"
                      >
                        <div className="accordion-body">
                          <div className="course-lesson">
                            <ul>
                              {nodeModule.map(
                                ({
                                  titleAr,
                                  titleEn,
                                  nodeId,
                                  type,
                                  isWatched,
                                  isPassed,
                                  duration,
                                  questionCount,
                                  contentId,
                                }) => {
                                  return (
                                    <li
                                      style={{ color: isWatched && "#6ABD8A" }}
                                      className={
                                        contentId == params.get("contentId") && "active"
                                      }
                                      key={nodeId}
                                    >
                                      <div className="text d-flex align-items-center">
                                        <span style={{ margin: "0 4px 4px" }}>
                                          {isWatched ? (
                                            <svg
                                              width="24"
                                              height="24"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M9 16.172l-4.95-4.95a1.25 1.25 0 0 1 1.768-1.768L9 13.634l8.95-8.95a1.25 1.25 0 0 1 1.768 1.768L9 16.172z"
                                                fill="#6ABD8A"
                                              />
                                            </svg>
                                          ) : type == 1 || type == 2 ? (
                                            <FilePen size={20} />
                                          ) : type == 3 ? (
                                            <Paperclip size={20} />
                                          ) : type == 4 ? (
                                            <FileText size={20} />
                                          ) : (
                                            <FileVideo size={20} />
                                          )}
                                        </span>
                                        
                                          <span><a href={`/ar/course-player/${course.courseId}?type=${type}&no=${nodeId}`}>{titleAr}</a></span>
                                        
                                      </div>
                                      {type == 0 && (
                                        <span className="duration-node">{duration}</span>
                                      )}
                                      {type == 4 && (
                                        <div className="badge-list">
                                          <span className="badge badge-secondary">
                                            {questionCount}{" "}
                                            "أسئلة"
                                          </span>
                                        </div>
                                      )}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div
          className="player-content"
          style={{
            transition: "all 0.5s",
            paddingRight: local == "ar" && showPlayerSide && 405,
            paddingLeft: local == "en" && showPlayerSide && 405,
          }}
        >
          <UserHeader />
          {/* <BreadcrumbTwo subtitle={"تطوير تطبيقات الويب"} /> */}
          <div className={`video-player type-${type}`}>
            <div
              onClick={() => setShowPlayerSide(!showPlayerSide)}
              className="player-arrow"
              style={{
                right: local == "ar" ? "0" : "auto",
                left: local == "en" ? "0" : "auto",
                borderRightColor: local == "ar" && "transparent",
                borderLeftColor: local == "en" && "transparent",
              }}
            >
              {local == "ar" ? (
                <ArrowLeft size={28} />
              ) : (
                <ArrowRight size={28} />
              )}
            </div>
            <Player nodes={data?.nodes} moduleId={moduleId} />
          </div>
          <div className="course-details-content">
            <div className="nav-tab-wrap">
              <ul
                className="nav nav-tabs scroll-tabs"
                id="myTab"
                role="tablist"
              >
                <li
                  style={{ display: showPlayerSide && "none" }}
                  className="nav-item content-md"
                  role="presentation"
                >
                  <button
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                    className={`nav-link ${!showPlayerSide && "active"}`}
                    type="button"
                  >
                    <Play />
                    <span> محتوي الكورس</span>
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                    className={`nav-link ${showPlayerSide && "active"}`}
                    href="#links"
                    type="button"
                  >
                    <Link />
                    <span>روابط مهمة</span>
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    href="#comments"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                    className="nav-link"
                    type="button"
                  >
                    <MessageCircleMore />
                    <span>الكومنتات</span>
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                    onClick={() => setAsk(true)}
                    className="nav-link"
                    type="button"
                  >
                    <MessageCircleQuestion />

                    <span> اسأل سؤال</span>
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => setBoard(true)}
                    className="nav-link"
                    type="button"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyItems: "center",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <Crown />
                    <span> الليدر بورد</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div style={{ maxWidth: 760, margin: "20px auto 0" }}>
            {/* content */}
            <div
              style={{ display: showPlayerSide && "none" }}
              className={`content-md course-curriculam mb--90`}
            >
              <div
                style={{
                  position: "relative",
                  padding: "20px 0 40px",
                  width: "100%",
                }}
              >
                <Tooltip title="Your Progress">
                  <Progress
                    percent={percent}
                    strokeColor="#6ABD8A"
                    showInfo={false}
                  />
                </Tooltip>
                <div
                  className="percent-label"
                  style={{
                    position: "absolute",
                    right: local == "ar" ? `${percent - 5}%` : "auto",
                    left: local == "en" ? `${percent - 5}%` : "auto",
                    top: "35px",
                    transition: "all 0.1s",
                  }}
                >
                  {percent}%
                </div>
              </div>
              <CourseAccordion
                nodes={data?.nodes}
                stoppedIndex={data?.stoppedIndex}
              />
            </div>
            {/* links */}
            {links && (
              <div id="links" className="course-sidebar-3">
                <div className="edu-course-widget widget-course-summery">
                  <div className="inner">
                    <div className="content">
                      <h4 className="widget-title"> روابط مهمة</h4>
                      <ul className="course-item">
                        {/* [data?.courseLinks] */}
                        {links.map(({ path, title }, idx) => {
                          return (
                            <li key={idx}>
                              <a
                                className="label"
                                style={{
                                  width: "100%",
                                  justifyContent: "space-between",
                                }}
                                href={path}
                                target="_blank"
                              >
                                <span>{title}</span>
                                <sapn>
                                  <ArrowUpLeft />
                                </sapn>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* comments */}
            <div id="comments" className="tab-pane">
              <div className="course-tab-content">
                <div className="course-review">
                  <div className="comment-area">
                    <div className="comment-list-wrapper">
                      {[]?.map((review, i) => (
                        <SingleComment key={i} review={review} />
                      ))}
                    </div>
                  </div>

                  <div className="comment-form-area">
                    <h3 className="heading-title">اترك تعليق</h3>
                    <CommentFormCourse />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
