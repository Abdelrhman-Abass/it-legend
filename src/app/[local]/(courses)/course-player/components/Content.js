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
  const [comments, setComments] = useState([]);
  const [percent, setPercent] = useState(33);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const type = params.get("type");
  const contentId = params.get("no");
  const [activeNode , setActiveNode] = useState(contentId)
  const [board, setBoard] = useState(false);
  const [ask, setAsk] = useState(false);
  const [askData, setAskData] = useState([]);
  const [getAskLoad, setGetAskLoad] = useState(false);
  const [userAsk, setUserAsk] = useState("");
  const [loadSubmitAsk, setLoadSubmitAsk] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const [modules, setModules] = useState([])
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    setModules(testData)
  })
  useEffect(() => {
    console.log(activeNode)
  },[activeNode])
  
  const handleDataComments = (fetchedData) => {
    setComments(fetchedData); // Store the fetched data in the parent state
  };

  console.log(" comments from content : "+ comments)

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
  useEffect(() => {
    if (contentId) {
      // Find the module index that contains the target contentId
      const moduleIndex = modules.findIndex((module) =>
        module.nodes.some((node) => node.nodeId === contentId)
      );

      if (moduleIndex !== -1) {
        setOpenAccordion(moduleIndex);
      }
    }
  }, [contentId, modules]);
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
  const handleAccordionToggle = (idx) => {
    setOpenAccordion((prevIndex) => (prevIndex === idx ? null : idx));
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
              {
                modules.map((course, idx) => (

                  // <Test testData={course} key={idx}/> https://it-legend-rrkg.vercel.app/ar/course-player/c84e7902-1205-426f-a857-922bedd84bdf?type=0&no=fef68bd2-7540-44d4-b8fd-c35b9f2dd839
                  <div className="accordion edu-accordion" id="accordionExample" key={idx}>
                    <div className="accordion-item">
                      <h3 className="accordion-header" id={`heading-${idx}`}>
                        <button
                          className={`accordion-button ${openAccordion === idx ? "" : "collapsed"}`}
                          type="button"
                          onClick={() => handleAccordionToggle(idx)}
                          aria-expanded={openAccordion === idx ? "true" : "false"}
                        >
                          <span style={{ textAlign: "start" }}>
                            {course.moduleTitleAr}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`module-${idx}`}
                        className={`accordion-collapse ${openAccordion === idx ? "show" : "collapse"}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="course-lesson">
                            <ul>
                              {course.nodes.map((node, i) => {
                                const {
                                  titleAr = "No Title Available",
                                  titleEn = "No English Title",
                                  nodeId = `node-${i}`,
                                  type = 0,
                                  isWatched = false,
                                  isPassed = false,
                                  duration = "Unknown Duration",
                                  questionCount = 0,
                                  contentId = null,
                                } = node || {}; // Handle null or undefined `node`

                                return (
                                  <li
                                    style={{ color: isWatched ? "#6ABD8A" : undefined }}
                                    className={nodeId == activeNode ? "active" : ""}
                                    key={nodeId}
                                    onClick={() => setActiveNode(nodeId)}
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
                                        ) : type === 1 || type === 2 ? (
                                          <FilePen size={20} />
                                        ) : type === 3 ? (
                                          <Paperclip size={20} />
                                        ) : type === 4 ? (
                                          <FileText size={20} />
                                        ) : (
                                          <FileVideo size={20} />
                                        )}
                                      </span>
                                      <span >
                                        {/* <a href={`/ar/course-player/${course.courseId}?type=${type}&no=${nodeId}`}> */}
                                          {titleAr}
                                        {/* </a> */}
                                      </span>
                                    </div>
                                    {type === 0 && <span className="duration-node">{duration}</span>}
                                    {type === 4 && (
                                      <div className="badge-list">
                                        <span className="badge badge-secondary">
                                          {questionCount} أسئلة
                                        </span>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
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
          <UserHeader player={true}/>
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
            <Player nodes={data?.nodes} moduleId={courseId} modules={modules} activeNode={activeNode} setComments={handleDataComments} />
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
              {
                modules.map((course, idx) => (

                  // <Test testData={course} key={idx}/> https://it-legend-rrkg.vercel.app/ar/course-player/c84e7902-1205-426f-a857-922bedd84bdf?type=0&no=fef68bd2-7540-44d4-b8fd-c35b9f2dd839
                  <div className="accordion edu-accordion" id="accordionExample" key={idx}>
                    <div className="accordion-item">
                      <h3 className="accordion-header" id={`heading-${idx}`}>
                        <button
                          className={`accordion-button ${openAccordion === idx ? "" : "collapsed"}`}
                          type="button"
                          onClick={() => handleAccordionToggle(idx)}
                          aria-expanded={openAccordion === idx ? "true" : "false"}
                        >
                          <span style={{ textAlign: "start" }}>
                            {course.moduleTitleAr}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={`module-${idx}`}
                        className={`accordion-collapse ${openAccordion === idx ? "show" : "collapse"}`}
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <div className="course-lesson">
                            <ul>
                              {course.nodes.map((node, i) => {
                                const {
                                  titleAr = "No Title Available",
                                  titleEn = "No English Title",
                                  nodeId = `node-${i}`,
                                  type = 0,
                                  isWatched = false,
                                  isPassed = false,
                                  duration = "Unknown Duration",
                                  questionCount = 0,
                                  contentId = null,
                                } = node || {}; // Handle null or undefined `node`

                                return (
                                  <li
                                    style={{ color: isWatched ? "#6ABD8A" : undefined }}
                                    className={nodeId == params.get("no") ? "active" : ""}
                                    key={nodeId}
                                    onClick={() => setActiveNode(nodeId)}
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
                                        ) : type === 1 || type === 2 ? (
                                          <FilePen size={20} />
                                        ) : type === 3 ? (
                                          <Paperclip size={20} />
                                        ) : type === 4 ? (
                                          <FileText size={20} />
                                        ) : (
                                          <FileVideo size={20} />
                                        )}
                                      </span>
                                      <span>
                                        <a href={`/ar/course-player/${course.courseId}?type=${type}&no=${nodeId}`}>
                                          {titleAr}
                                        </a>
                                      </span>
                                    </div>
                                    {type === 0 && <span className="duration-node">{duration}</span>}
                                    {type === 4 && (
                                      <div className="badge-list">
                                        <span className="badge badge-secondary">
                                          {questionCount} أسئلة
                                        </span>
                                      </div>
                                    )}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
