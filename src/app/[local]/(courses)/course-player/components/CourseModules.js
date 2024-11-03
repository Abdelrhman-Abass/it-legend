"use client";
import { usePathname, useRouter } from "@/navigation";
import { FilePen, FileText, FileVideo, Paperclip } from "lucide-react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getCoursesData } from "../../utils/coursesHandler";

const CourseModules = ({
  show = false,
  id,
  titleEn,
  titleAr,
  modules,
  stoppedIndex,
  currentExam,
}) => {
  const searchParams = useSearchParams();
  const locale = useLocale();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const examSwal = ({ contentId, playerType, type }) => {
    Swal.fire({
      title: "الامتحان",
      text: "يجب عليكك الان حل الامتحان لتتمكن من الاستمرار في الكورس.",
      showCancelButton: true,
      cancelButtonText: "لا, اريد المراجعة",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, لنبدأ الامتحان",
    }).then((result) => {
      if (result.isConfirmed) {
        params.set("contentId", contentId);
        params.set("type", type);
        params.set("playerType", playerType);
        replace(`${pathname}?${params.toString()}`);
      }
    });
  };

  const handleSearch = ({ contentId, type, playerType }) => {
    const params = new URLSearchParams(searchParams);
    // exam
    if (type == 1) {
      // pdf
      examSwal({ contentId, type, playerType });
    } else if (type == 4) {
      const getPdf = async () => {
        try {
          const node = await getCoursesData(
            `/api/NodesApi/GetNode?contentId=${contentId}&type=${type}&playerType=${playerType}`
          );
          window.open(node?.path, "_blank");
        } catch (error) {
          console.error("Error fetching node data:", error);
        }
      };
      getPdf();
    } else {
      params.set("contentId", contentId);
      params.set("type", type);
      params.set("playerType", playerType);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const getCurrentVideo = () => {
    let data = modules?.find(({ index }) => {
      return index == stoppedIndex;
    });
    if (data) {
      const params = new URLSearchParams(searchParams);
      const { contentId, type, playerType } = data;
      params.set("contentId", contentId);
      params.set("type", type);
      params.set("playerType", playerType);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get("contentId")) {
      getCurrentVideo();
    }
  }, [modules]);

  return (
    <>
      <div className="accordion-item">
        <h3 className="accordion-header" id="headingOne">
          <button
            className={`accordion-button ${show ? "" : "collapsed"}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#module-${id}`}
            aria-expanded={show ? "true" : "false"}
          >
            <span style={{ textAlign: "start" }}>
              {locale == "ar" ? titleAr : titleEn}
            </span>
          </button>
        </h3>

        <div
          id={`module-${id}`}
          className={`accordion-collapse collapse ${show ? "show" : ""}`}
          data-bs-parent="#faq-accordion"
        >
          <div className="accordion-body">
            <div className="course-lesson">
              <ul>
                {modules.map(
                  ({
                    titleAr,
                    titleEn,
                    nodeId,
                    type,
                    isWatched,
                    duration,
                    questionsNumber,
                    contentId,
                    playerType,
                    disable, // if exam not solve
                  }) => {
                    return (
                      <li
                        style={{ color: isWatched && "#6ABD8A" }}
                        className={
                          contentId == params.get("contentId") && "active"
                        }
                        key={nodeId}
                        onClick={() => {
                          if (disable) {
                            const { contentId, type, playerType } = currentExam;
                            examSwal({ contentId, type, playerType });
                          } else {
                            handleSearch({ contentId, type, playerType });
                          }
                        }}
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
                          <span>{locale == "ar" ? titleAr : titleEn}</span>
                        </div>
                        {type == 0 && (
                          <span className="duration-node">{duration}</span>
                        )}
                        {type == 1 && (
                          <div className="badge-list">
                            <span className="badge badge-secondary">
                              {questionsNumber}{" "}
                              {locale == "ar" ? "أسئلة" : "Questions"}
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
    </>
  );
};

export default CourseModules;
