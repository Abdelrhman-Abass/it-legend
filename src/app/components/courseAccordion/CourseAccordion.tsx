// // import React from "react";
// import { FaPlus } from "react-icons/fa";
// import { MdOutlineOndemandVideo } from "react-icons/md";

// // export default function CourseAccordion() {
// //     return (
// //         <div className="course_accordion">
// //             <div className="course_accordion_header f ac jb">
// //                 <h5>C# Basics</h5>
// //                 <div className="course_accordion_header_icon">
// //                     <FaPlus />
// //                 </div>
// //             </div>
// //             <div className="course_accordion_lectures">
// //                 {new Array(8).fill("").map((item, index) => (
// //                     <div className="course_accordion_lectures_item f ac jb" key={index}>
// //                         <div className="course_accordion_lectures_item_icon f ac">
// //                             <MdOutlineOndemandVideo />
// //                             <h6>Lecture {index + 1}</h6>
// //                         </div>
// //                         <span>20 minutes</span>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     );
// // }

// import { CoursePlayerAccordionProps, VideoItem } from "@/app/types/Types";
// import { Collapse } from "antd";
// import React, { useState, useEffect } from "react";
// import { DownOutlined, LockOutlined, MinusOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
// import { useParams } from "next/navigation";
// import { FaCheck, FaCheckDouble, FaFileCode } from "react-icons/fa";
// import { useCookies } from "react-cookie";
// import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
// import { MdOndemandVideo } from "react-icons/md";
// import { useTranslations } from "next-intl";
// import generalActivePopup from "@/app/store/ActivePopup";
// import ActiveAnswersPopup from "../common/generalPopup/activeAnswersPopup";
// import GeneralPopup from "../common/generalPopup/GeneralPopup";
// import { getServerRequest, postServerRequest } from "@/app/utils/generalServerRequest";
// import { useMutation } from "@tanstack/react-query";

// export default function CourseAccordion({ videosItems, videoCommentsMutation, slug }: CoursePlayerAccordionProps) {
//   const { setVideoNode, setVideoName, setVideoID, videoNodeExam, setVideoNodeExam, passedIsRequired, setLastVideoData, videoId, videoNode, setFirstNodeModule, setNextNode, setIsSubmitted, isSubmitted, setMemeberExam, memeberExam } = GenralCoursePlayerId();
//   const [cookies] = useCookies(["userData"]);
//   const { locale } = useParams() as { locale: string };
//   const [activeKey, setActiveKey] = useState<string | string[]>([]);
//   const [vibratingNode, setVibratingNode] = useState<string | null>(null);
// //   const [videosItems, setvideosItems] = useState(videosItems);
//     const t = useTranslations()
  

//   const handleClickNot = (nodeId: string) => {
//     setVibratingNode(nodeId);
//     setTimeout(() => setVibratingNode(null), 300);
//   };

// //   useEffect(() => {
// //     if (!updatedVideosItems || !videoNode) return;

// //     const updatedModules = updatedVideosItems.map((module: any, index: any, array: any) => {
// //       const updatedNodes = module.nodes.map((node: any) => {
// //         if (passedIsRequired[node.contentId]) {
// //           return { ...node, isPassed: true };
// //         }
// //         return node;
// //       });

// //       const isExamPassed = module.nodes.some((node: any) => passedIsRequired[node.contentId]);
// //       if (isExamPassed && array[index + 1]) {
// //         array[index + 1].nodes = array[index + 1].nodes.map((node: any) => ({
// //           ...node,
// //           isAccessible: true,
// //         }));
// //       }

// //       return { ...module, nodes: updatedNodes };
// //     });

// //     setUpdatedVideosItems(updatedModules);
// //   }, [passedIsRequired]);

//   const flattenNodes = (videosItems: any[]) => {
//     return videosItems
//       .sort((a, b) => a.moduleOrder - b.moduleOrder)
//       .flatMap((item) =>
//         item.nodes.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
//       );
//   };

//   const findCurrentNodeIndex = (flattenedNodes: any[], videoNode: string) => {
//     return flattenedNodes.findIndex((node) => node.nodeId === videoNode);
//   };

// //   const getNextNode = (flattenedNodes: any[], currentIndex: number) => {
// //     if (currentIndex < flattenedNodes.length - 1) {
// //       return flattenedNodes[currentIndex + 1];
// //     }
// //     return null;
// //   };

//   const flattenedNodes = flattenNodes(videosItems || []);
//   const currentNodeIndex = findCurrentNodeIndex(flattenedNodes, videoNode);
// //   const nextNode = getNextNode(flattenedNodes, currentNodeIndex);

// //   useEffect(() => {
// //     if (nextNode) {
// //       setNextNode(nextNode);
// //     }
// //   }, [nextNode]);

//   const handleVideoPlayType = async (type: number, nodeID?: string) => {
    

//     switch (type) {
//       case 0:
//         // setVideoNode(nodeID);
//         window.history.replaceState(null, "", window.location.pathname + window.location.search);
//         break;

//       case 1:
//         // setNextNode(nextNode.nodeId);
//         break;

//       case 4:
//         try {
//           const { data } = await getServerRequest(`/CourseViewer/${slug}/viewers/${nodeID}`);
//           const pdfPath = data?.data?.viewer?.path;

//           if (!pdfPath) {
//             console.error("Failed to fetch PDF URL: Path is undefined");
//             return;
//           }

//         //   await postServerRequest(`/MemberNode/${nodeID}/view`, {});

//         //   setvideosItems((prevItems: any) =>
//         //     prevItems.map((module: any) => ({
//         //       ...module,
//         //       nodes: module.nodes.map((node: any) =>
//         //         node.nodeId === nodeID ? { ...node, isWatched: true } : node
//         //       ),
//         //     }))
//         //   );

//         //   const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL_DEC}/Content/Uploads/ViewerPath/${pdfPath}`;
//         //   window.open(pdfUrl, "_blank");
//         } catch (error) {
//           console.error("Error fetching or opening PDF:", error);
//         }
//         break;

//       default:
//         console.warn("Unhandled video play type:", type);
//     }
//   };

// //   const findActiveModule = () => {
// //     if (!videosItems || !videoNode) return null;

// //     for (const item of videosItems) {
// //       const foundNode = item.nodes.find((node: any) => node.nodeId === videoNode);
// //       if (foundNode) {
// //         return item.moduleTitleAr || item.moduleTitleEn || null;
// //       }
// //     }
// //     return null;
// //   };

// //   useEffect(() => {
// //     const activeModule = findActiveModule();
// //     if (activeModule) {
// //       setActiveKey([activeModule]);
// //     }
// //   }, [videoNode, videosItems]);

  

//   const formatDuration = (duration: string): string => {
//     if (!duration) return `0  ${t("courseMinuts.minuts")}`;
//     const parts = duration.split(":");
//     if (parts.length === 3) {
//       return ` ${parseInt(parts[1], 10)} ${t("courseMinuts.minuts")}`;
//     }
//     return "0M";
//   };

//   const items =
//     videosItems &&
//     videosItems
//       .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder)
//       .map((item: any) => ({
//         key: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
//         label: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
//         children: (
//           <>
//             {item.nodes
//               .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
//               .map((child: any) => (
//                 <div
//                   onClick={async () => {
//                     handleVideoPlayType(child.type, child.nodeId);
                   
//                     setLastVideoData(null);
//                     if(!child.isFree){
//                         handleClickNot(child.nodeId)
//                     }
//                   }}
//                   key={child.nodeId}
//                   className={`course_player_accordion_item ${!child.isFree? "not_accesible" : ""}`}
//                 >
//                   <p className= {`p1 ${vibratingNode === child.nodeId ? "vibrate" : ""}`}>
//                     {/* {child.isPassed || child.isWatched ? <FaCheck className="watch_icon" /> : null} */}
//                     {child.type === 0 && <MdOndemandVideo className="watch_icon" />}{" "}
//                     {locale === "ar" ? child.titleAr : child.titleEn}
//                   </p>
//                   {child.type == 0 && (cookies.userData ? <span>{formatDuration(child.duration) || <FaFileCode />}</span> : child.isFree ? <span>{child.duration || <FaFileCode />}</span> : <LockOutlined />)}
//                 </div>
//               ))}
//           </>
//         ),
//       }));

//   return (
//     <>
//       <div className="course_player_accordion ltr_direction">
//         <Collapse
//           activeKey={activeKey}
//           expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <UpOutlined />)}
//           onChange={(keys) => setActiveKey(keys)}
//           expandIconPosition="end"
//           items={items}
//         />
//       </div>
//       <ActiveAnswersPopup />
//       <GeneralPopup isExam={true} videoNodeExam={videoNodeExam} />
//     </>
//   );
// }

import { CoursePlayerAccordionProps } from "@/app/types/Types";
import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { DownOutlined, LockOutlined, UpOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { FaFileCode } from "react-icons/fa";
import { useCookies } from "react-cookie";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import { MdOndemandVideo } from "react-icons/md";
import { useTranslations } from "next-intl";
import generalActivePopup from "@/app/store/ActivePopup";
import ActiveAnswersPopup from "../common/generalPopup/activeAnswersPopup";
import GeneralPopup from "../common/generalPopup/GeneralPopup";
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useMutation } from "@tanstack/react-query";

export default function CourseAccordion({ videosItems, videoCommentsMutation, slug }: CoursePlayerAccordionProps) {
  const { setVideoNode, setVideoName, setLastVideoData } = GenralCoursePlayerId();
  const [cookies] = useCookies(["userData"]);
  const { locale } = useParams() as { locale: string };
  const [activeKey, setActiveKey] = useState<string | string[]>([]);
  const [vibratingNode, setVibratingNode] = useState<string | null>(null);
  const t = useTranslations();

  // Set the first module as active by default
  useEffect(() => {
    if (videosItems && videosItems.length > 0) {
      const firstModuleKey = locale === "ar" ? videosItems[0].moduleTitleAr : videosItems[0].moduleTitleEn;
      setActiveKey([firstModuleKey]);
    }
  }, [videosItems, locale]);

  // Handle vibration effect for inaccessible nodes
  const handleClickNot = (nodeId: string) => {
    setVibratingNode(nodeId);
    setTimeout(() => setVibratingNode(null), 300);
  };

  // Fetch video data when a node of type 0 is clicked
  const fetchVideoData = useMutation({
    mutationFn: (nodeId: string) => getServerRequest(`/CourseVideo/${slug}/videos/${nodeId}`),
    onSuccess: (data) => {
      // Handle the fetched video data
      console.log("Fetched video data:", data);
    //   setVideoNode(data.data.data.video.nodeId); // Update the video node
    //   setVideoName(locale === "ar" ? data.data.data.video.titleAr : data.data.data.video.titleEn); // Update the video name
    //   setLastVideoData(null); // Reset last video data
    },
    onError: (error) => {
      console.error("Error fetching video data:", error);
    },
  });

  // Handle video play type (video, exam, PDF, etc.)
  const handleVideoPlayType = async (type: number, nodeID?: string) => {
    if (!nodeID) return;

    switch (type) {
      case 0: // Video
        fetchVideoData.mutate(nodeID); // Fetch video data using React Query
        
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        break;

      case 4: // PDF
        try {
          const { data } = await getServerRequest(`/CourseViewer/${slug}/viewers/${nodeID}`);
          const pdfPath = data?.data?.viewer?.path;

          if (!pdfPath) {
            console.error("Failed to fetch PDF URL: Path is undefined");
            return;
          }

          const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL_DEC}/Content/Uploads/ViewerPath/${pdfPath}`;
          window.open(pdfUrl, "_blank");
        } catch (error) {
          console.error("Error fetching or opening PDF:", error);
        }
        break;

      default:
        console.warn("Unhandled video play type:", type);
    }
  };

  // Format duration string (e.g., "00:05:30" -> "5 minutes")
  const formatDuration = (duration: string): string => {
    if (!duration) return `0 ${t("courseMinuts.minuts")}`;
    const parts = duration.split(":");
    if (parts.length === 3) {
      return `${parseInt(parts[1], 10)} ${t("courseMinuts.minuts")}`;
    }
    return "0M";
  };

  // Generate accordion items
  const items =
    videosItems &&
    videosItems
      .sort((a:any, b:any) => a.moduleOrder - b.moduleOrder)
      .map((item:any) => ({
        key: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
        label: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
        children: (
          <>
            {item.nodes
              .sort((a:any, b:any) => a.displayOrder - b.displayOrder)
              .map((child:any) => (
                <div
                  onClick={async () => {
                    // if (child.isFree) {
                      handleVideoPlayType(child.type, child.nodeId);
                    //   videoCommentsMutation.mutate(child.contentId);
                    // } else {
                    //   handleClickNot(child.nodeId);
                    // }
                  }}
                  key={child.nodeId}
                  className={`course_player_accordion_item ${!child.isFree ? "not_accesible" : ""}`}
                //   className={`course_player_accordion_item`}
                >
                  <p className={`p1 ${vibratingNode === child.nodeId ? "vibrate" : ""}`}>
                  {/* <p className={`p1 `}> */}
                    {child.type === 0 && <MdOndemandVideo className="watch_icon" />}{" "}
                    {locale === "ar" ? child.titleAr : child.titleEn}
                  </p>
                  {child.type === 0 && (
                    cookies.userData ? (
                      <span>{formatDuration(child.duration) || <FaFileCode />}</span>
                    ) : child.isFree ? (
                      <span>{child.duration || <FaFileCode />}</span>
                    ) : (
                      <LockOutlined />
                    )
                  )}
                </div>
              ))}
          </>
        ),
      }));

  return (
    <>
      <div className="course_player_accordion ltr_direction">
        <Collapse
          activeKey={activeKey}
          expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <UpOutlined />)}
          onChange={(keys) => setActiveKey(keys)}
          expandIconPosition="end"
          items={items}
        />
      </div>
      <ActiveAnswersPopup />
      {/* <GeneralPopup isExam={true} videoNodeExam={videoNodeExam} /> */}
    </>
  );
}