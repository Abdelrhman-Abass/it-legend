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

const Content = ({ data, courseId , links}) => {
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
          <UserHeader/>
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
