import { CoursePlayerAccordionProps, VideoItem } from "@/app/types/Types";
import { Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { DownOutlined, LockOutlined, MinusOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { useParams } from "next/navigation";
import { FaCheck, FaCheckDouble, FaFileCode } from "react-icons/fa";
import { useCookies } from "react-cookie";
import GenralCoursePlayerId from "@/app/store/GeneralCoursePlayer";
import { MdOndemandVideo } from "react-icons/md";
import { useTranslations } from "next-intl";
import generalActivePopup from "@/app/store/ActivePopup";
import GeneralPopup from "../generalPopup/GeneralPopup";
import ActiveAnswersPopup from "../generalPopup/activeAnswersPopup";
import { getServerRequest, postServerRequest } from "@/app/utils/generalServerRequest";
import { useMutation } from "@tanstack/react-query";

import { IoMdLock } from "react-icons/io";


export default function CoursePlayerAccordion({ videosItems, videoCommentsMutation , slug }: CoursePlayerAccordionProps ) {
  const { setVideoNode, setVideoName, setVideoID, videoNodeExam, setVideoNodeExam, passedIsRequired, setLastVideoData, videoId, videoNode, setFirstNodeModule, setNextNode, setIsSubmitted, isSubmitted, setMemeberExam, memeberExam } = GenralCoursePlayerId();
  const [cookies] = useCookies(["userData"]);
  const { locale } = useParams() as { locale: string };
  const [activeKey, setActiveKey] = useState<string | string[]>([]);
  // const [isVibrating, setIsVibrating] = useState(false); // State to manage vibration
  // const [videoNodeExam, setVideoNodeExam] = useState<string>("");
  const { openPopup, openActiveDatePopup } = generalActivePopup();
  const t = useTranslations()

  const [vibratingNode, setVibratingNode] = useState<string | null>(null);
  const [updatedVideosItems, setUpdatedVideosItems] = useState(videosItems); // ✅ Maintain updated state

  useEffect(() => {
    setUpdatedVideosItems(videosItems); // Update when props change
  }, [videosItems]);
  // console.log(updatedVideosItems)
  const handleClickNot = (nodeId: string) => {
    setVibratingNode(nodeId); // Set the clicked node as vibrating
    setTimeout(() => setVibratingNode(null), 300); // Reset after animation duration
  }
  
  useEffect(() => {
    if (!updatedVideosItems || !videoNode) return;
  
    const updatedModules = updatedVideosItems.map((module:any, index:any, array:any) => {
      const updatedNodes = module.nodes.map((node:any) => {
        // If this node's exam is passed, mark it as passed
        if (passedIsRequired[node.contentId]) {
          return { ...node, isPassed: true };
        }
        return node;
      });
  
      // ✅ If an exam in this module is passed, unlock the next module
      const isExamPassed = module.nodes.some((node:any) => passedIsRequired[node.contentId]);
      if (isExamPassed && array[index + 1]) {
        array[index + 1].nodes = array[index + 1].nodes.map((node:any) => ({
          ...node,
          isAccessible: true,
        }));
      }
  
      return { ...module, nodes: updatedNodes };
    });
  
    setUpdatedVideosItems(updatedModules); // ✅ Correctly update state
  }, [passedIsRequired]);

  const flattenNodes = (updatedVideosItems: any[]) => {
    return updatedVideosItems
      .sort((a, b) => a.moduleOrder - b.moduleOrder)
      .flatMap((item) =>
        item.nodes.sort((a: any, b: any) => a.displayOrder - b.displayOrder)
      );
  };
  const findCurrentNodeIndex = (flattenedNodes: any[], videoNode: string) => {
    return flattenedNodes.findIndex((node) => node.nodeId === videoNode);
  };
  const getNextNode = (flattenedNodes: any[], currentIndex: number) => {
    if (currentIndex < flattenedNodes.length - 1) {
      return flattenedNodes[currentIndex + 1];
    }
    return null; // No next node
  };

  // Flatten all nodes
  const flattenedNodes = flattenNodes(updatedVideosItems || []);

  // Find the current node index
  const currentNodeIndex = findCurrentNodeIndex(flattenedNodes, videoNode);

  // Get next and previous nodes
  const nextNode = getNextNode(flattenedNodes, currentNodeIndex);

  // Log next and previous nodes (for debugging)
  useEffect(() => {
    // console.log("Next Node:", nextNode);
    if (nextNode) {
      setNextNode(nextNode);
      // console.log("Previous Node:", nextNode);
    }
  }, [nextNode]);

  const handleVideoPlayType = async (type: number, nodeID?: string) => {
    if (!nodeID) {
      console.error("Node ID is required");
      return;
    }
  
    switch (type) {
      case 0:
        setVideoNode(nodeID);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        break;
  
      case 1:
        setNextNode(nextNode.nodeId);
        break;
  
      case 4:
        try {
          // ✅ Fetch PDF URL from API
          const { data } = await getServerRequest(`/CourseViewer/${slug}/viewers/${nodeID}`);
          const pdfPath = data?.data?.viewer?.path;
  
          if (!pdfPath) {
            console.error("Failed to fetch PDF URL: Path is undefined");
            return;
          }
  
          // ✅ Mark the node as watched in the backend
          await postServerRequest(`/MemberNode/${nodeID}/view`, {});
  
          // ✅ Update state to mark node as watched
          setUpdatedVideosItems((prevItems: any) =>
            prevItems.map((module: any) => ({
              ...module,
              nodes: module.nodes.map((node: any) =>
                node.nodeId === nodeID ? { ...node, isWatched: true } : node
              ),
            }))
          );
  
          // ✅ Open the PDF in a new tab
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
  

  // Find the active module
  const findActiveModule = () => {
    if (!updatedVideosItems || !videoNode) return null;

    for (const item of updatedVideosItems) {
      const foundNode = item.nodes.find((node: any) => node.nodeId === videoNode);
      if (foundNode) {
        return item.moduleTitleAr || item.moduleTitleEn || null;
      }
    }
    return null;
  };

  // Update activeKey when videoNode changes
  useEffect(() => {
    const activeModule = findActiveModule();
    if (activeModule) {
      setActiveKey([activeModule]);
    }
  }, [videoNode, updatedVideosItems]);

  useEffect(() => {
    if (!updatedVideosItems || !videoNode) return;

    // Find the active module (the one containing the current videoNode)
    const activeModule = updatedVideosItems.find((module: any) =>
      module.nodes.some((node: any) => node.nodeId === videoNode)
    );

    if (activeModule && activeModule.nodes.length >= 0) {
      // const firstNode = activeModule.nodes[0]; // Get the first node in the active module
      const firstNode = activeModule.nodes.find((node: any) => node.type === 0) || activeModule.nodes[0];

      console.log("First Node in Active Module:", firstNode);
      setFirstNodeModule(firstNode);
    }
  }, [videoNode, updatedVideosItems]);

  // Format duration
  const formatDuration = (duration: string): string => {
    if (!duration) return `0  ${t("courseMinuts.minuts")}`;
    const parts = duration.split(":");
    if (parts.length === 3) {
      return ` ${parseInt(parts[1], 10)} ${t("courseMinuts.minuts")}`;
    }
    return "0M";
  };



  // Generate accordion items
  const items =
  updatedVideosItems &&
  updatedVideosItems
      .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder)
      .map((item: any) => ({
        key: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
        label: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
        children: (
          <>
            {item.nodes
              .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
              .map((child: any) => (
                child.isAccessible ?
                  <div
                    onClick={async () => {
                      handleVideoPlayType(child.type, child.nodeId);
                      if (child.type === 1) {
                        if (child.isPassed) {
                          console.log(child.contentId);
                          setVideoID(child.contentId);
                          setVideoNodeExam(child.nodeId)
                          // setVideoNode(child.nodeId)
                          // setVideoNode(videoNodeExam)

                          openActiveDatePopup(); // Open Active Date Popup first
                          // openPopup(); // Directly open if not passed

                        } else {

                          setIsSubmitted(false)
                          openPopup(); // Directly open if not passed
                        }
                        setVideoNodeExam(child.nodeId)
                      }
                      console.log(child.type)
                      setVideoID(child.contentId);

                      window.history.replaceState(null, "", window.location.pathname + window.location.search);
                      setVideoName(`${locale === "ar" ? child.titleAr : child.titleEn}`);
                      videoCommentsMutation.mutate(child.contentId);
                      setLastVideoData(null);
                    }}
                    key={child.nodeId}
                    className={`course_player_accordion_item ${child.isPassed || (child.isWatched && cookies.userData) ? "watched" : ""}`}
                  >
                    <p className="p1">
                      {child.isPassed || child.isWatched ? <FaCheck className="watch_icon" /> : null}
                      {!child.isWatched && child.type === 0 && <MdOndemandVideo className="watch_icon" />}{" "}
                      {locale === "ar" ? child.titleAr : child.titleEn}
                    </p>
                    {child.type == 0 && (cookies.userData ? <span>{formatDuration(child.duration) || <FaFileCode />}</span> : child.isFree ? <span>{child.duration || <FaFileCode />}</span> : <LockOutlined />)}
                  </div>
                  : <div
                  onClick={() => handleClickNot(child.nodeId)}
                    key={child.nodeId}
                    className={`course_player_accordion_item not_accesible ${child.isPassed || (child.isWatched && cookies.userData) ? "watched" : ""}`}
                  >
                    <p className={`p1 ${vibratingNode === child.nodeId ? "vibrate" : ""}`} >
                      {/* {child.isPassed || child.isWatched ? <LockOutlined className="watch_icon" /> : null} */}
                      {/* {!child.isWatched && child.type === 0 && <LockOutlined className="watch_icon" />}{" "} */}
                      <IoMdLock className="watch_icon" />
                      {locale === "ar" ? child.titleAr : child.titleEn}
                    </p>
                    {child.type == 0 && (cookies.userData ? <span>{formatDuration(child.duration) || <FaFileCode />}</span> : child.isFree ? <span>{child.duration || <FaFileCode />}</span> : <LockOutlined />)}
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
      <GeneralPopup isExam={true} videoNodeExam={videoNodeExam} />
    </>
  );
}



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
// import GeneralPopup from "../generalPopup/GeneralPopup";
// import ActiveAnswersPopup from "../generalPopup/activeAnswersPopup";
// import { getServerRequest, postServerRequest } from "@/app/utils/generalServerRequest";
// import { useMutation } from "@tanstack/react-query";

// import { IoMdLock } from "react-icons/io";

// export default function CoursePlayerAccordion({ videosItems, videoCommentsMutation, slug }: CoursePlayerAccordionProps) {
//     const {
//         setVideoNode,
//         setVideoName,
//         setVideoID,
//         videoNodeExam,
//         setVideoNodeExam,
//         passedIsRequired,
//         setLastVideoData,
//         videoId,
//         videoNode,
//         setFirstNodeModule,
//         setNextNode,
//         setIsSubmitted,
//         isSubmitted,
//         setMemeberExam,
//         memeberExam,
//     } = GenralCoursePlayerId();
//     const [cookies] = useCookies(["userData"]);
//     const { locale } = useParams() as { locale: string };
//     const [activeKey, setActiveKey] = useState<string | string[]>([]);
//     // const [isVibrating, setIsVibrating] = useState(false); // State to manage vibration
//     // const [videoNodeExam, setVideoNodeExam] = useState<string>("");
//     const { openPopup, openActiveDatePopup } = generalActivePopup();
//     const t = useTranslations();

//     const [vibratingNode, setVibratingNode] = useState<string | null>(null);
//     const [updatedVideosItems, setUpdatedVideosItems] = useState(videosItems); // ✅ Maintain updated state

//     useEffect(() => {
//         setUpdatedVideosItems(videosItems); // Update when props change
//     }, [videosItems]);
//     // console.log(updatedVideosItems)
//     const handleClickNot = (nodeId: string) => {
//         setVibratingNode(nodeId); // Set the clicked node as vibrating
//         setTimeout(() => setVibratingNode(null), 300); // Reset after animation duration
//     };

//     useEffect(() => {
//         if (!updatedVideosItems || !videoNode) return;

//         const updatedModules = updatedVideosItems.map((module: any, index: any, array: any) => {
//             const updatedNodes = module.nodes.map((node: any) => {
//                 // If this node's exam is passed, mark it as passed
//                 if (passedIsRequired[node.contentId]) {
//                     return { ...node, isPassed: true };
//                 }
//                 return node;
//             });

//             // ✅ If an exam in this module is passed, unlock the next module
//             const isExamPassed = module.nodes.some((node: any) => passedIsRequired[node.contentId]);
//             if (isExamPassed && array[index + 1]) {
//                 array[index + 1].nodes = array[index + 1].nodes.map((node: any) => ({
//                     ...node,
//                     isAccessible: true,
//                 }));
//             }

//             return { ...module, nodes: updatedNodes };
//         });

//         setUpdatedVideosItems(updatedModules); // ✅ Correctly update state
//     }, [passedIsRequired]);

//     const flattenNodes = (updatedVideosItems: any[]) => {
//         return updatedVideosItems.sort((a, b) => a.moduleOrder - b.moduleOrder).flatMap((item) => item.nodes.sort((a: any, b: any) => a.displayOrder - b.displayOrder));
//     };
//     const findCurrentNodeIndex = (flattenedNodes: any[], videoNode: string) => {
//         return flattenedNodes.findIndex((node) => node.nodeId === videoNode);
//     };
//     const getNextNode = (flattenedNodes: any[], currentIndex: number) => {
//         if (currentIndex < flattenedNodes.length - 1) {
//             return flattenedNodes[currentIndex + 1];
//         }
//         return null; // No next node
//     };

//     // Flatten all nodes
//     const flattenedNodes = flattenNodes(updatedVideosItems || []);

//     // Find the current node index
//     const currentNodeIndex = findCurrentNodeIndex(flattenedNodes, videoNode);

//     // Get next and previous nodes
//     const nextNode = getNextNode(flattenedNodes, currentNodeIndex);

//     // Log next and previous nodes (for debugging)
//     useEffect(() => {
//         // console.log("Next Node:", nextNode);
//         if (nextNode) {
//             setNextNode(nextNode);
//             // console.log("Previous Node:", nextNode);
//         }
//     }, [nextNode]);

//     const handleVideoPlayType = async (type: number, nodeID?: string) => {
//         if (!nodeID) {
//             console.error("Node ID is required");
//             return;
//         }

//         switch (type) {
//             case 0:
//                 setVideoNode(nodeID);
//                 window.history.replaceState(null, "", window.location.pathname + window.location.search);
//                 break;

//             case 1:
//                 setNextNode(nextNode.nodeId);
//                 break;

//             case 4:
//                 try {
//                     // ✅ Fetch PDF URL from API
//                     const { data } = await getServerRequest(`/CourseViewer/${slug}/viewers/${nodeID}`);
//                     const pdfPath = data?.data?.viewer?.path;

//                     if (!pdfPath) {
//                         console.error("Failed to fetch PDF URL: Path is undefined");
//                         return;
//                     }

//                     // ✅ Mark the node as watched in the backend
//                     await postServerRequest(`/MemberNode/${nodeID}/view`, {});

//                     // ✅ Update state to mark node as watched
//                     setUpdatedVideosItems((prevItems: any) =>
//                         prevItems.map((module: any) => ({
//                             ...module,
//                             nodes: module.nodes.map((node: any) => (node.nodeId === nodeID ? { ...node, isWatched: true } : node)),
//                         })),
//                     );

//                     // ✅ Open the PDF in a new tab
//                     const pdfUrl = `${process.env.NEXT_PUBLIC_BASE_URL_DEC}/Content/Uploads/ViewerPath/${pdfPath}`;
//                     window.open(pdfUrl, "_blank");
//                 } catch (error) {
//                     console.error("Error fetching or opening PDF:", error);
//                 }
//                 break;

//             default:
//                 console.warn("Unhandled video play type:", type);
//         }
//     };

//     // Find the active module
//     const findActiveModule = () => {
//         if (!updatedVideosItems || !videoNode) return null;

//         for (const item of updatedVideosItems) {
//             const foundNode = item.nodes.find((node: any) => node.nodeId === videoNode);
//             if (foundNode) {
//                 return item.moduleTitleAr || item.moduleTitleEn || null;
//             }
//         }
//         return null;
//     };

//     // Update activeKey when videoNode changes
//     useEffect(() => {
//         const activeModule = findActiveModule();
//         if (activeModule) {
//             setActiveKey([activeModule]);
//         }
//     }, [videoNode, updatedVideosItems]);

//     useEffect(() => {
//         if (!updatedVideosItems || !videoNode) return;

//         // Find the active module (the one containing the current videoNode)
//         const activeModule = updatedVideosItems.find((module: any) => module.nodes.some((node: any) => node.nodeId === videoNode));

//         if (activeModule && activeModule.nodes.length >= 0) {
//             // const firstNode = activeModule.nodes[0]; // Get the first node in the active module
//             const firstNode = activeModule.nodes.find((node: any) => node.type === 0) || activeModule.nodes[0];

//             console.log("First Node in Active Module:", firstNode);
//             setFirstNodeModule(firstNode);
//         }
//     }, [videoNode, updatedVideosItems]);

//     // Format duration
//     const formatDuration = (duration: string): string => {
//         if (!duration) return `0  ${t("courseMinuts.minuts")}`;
//         const parts = duration.split(":");
//         if (parts.length === 3) {
//             return ` ${parseInt(parts[1], 10)} ${t("courseMinuts.minuts")}`;
//         }
//         return "0M";
//     };

//     // Generate accordion items
//     const items =
//         updatedVideosItems &&
//         updatedVideosItems
//             .sort((a: any, b: any) => a.moduleOrder - b.moduleOrder)
//             .map((item: any) => ({
//                 key: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
//                 label: locale === "ar" ? item.moduleTitleAr : item.moduleTitleEn,
//                 children: (
//                     <>
//                         {item.nodes
//                             .sort((a: any, b: any) => a.displayOrder - b.displayOrder)
//                             .map((child: any) =>
//                                 child.isAccessible ? (
//                                     <div
//                                         onClick={async () => {
//                                             handleVideoPlayType(child.type, child.nodeId);
//                                             if (child.type === 1) {
//                                                 if (child.isPassed) {
//                                                     console.log(child.contentId);
//                                                     setVideoID(child.contentId);
//                                                     setVideoNodeExam(child.nodeId);
//                                                     // setVideoNode(child.nodeId)
//                                                     // setVideoNode(videoNodeExam)

//                                                     openActiveDatePopup(); // Open Active Date Popup first
//                                                     // openPopup(); // Directly open if not passed
//                                                 } else {
//                                                     setIsSubmitted(false);
//                                                     openPopup(); // Directly open if not passed
//                                                 }
//                                                 setVideoNodeExam(child.nodeId);
//                                             }
//                                             console.log(child.type);
//                                             setVideoID(child.contentId);
//                                             window.history.pushState(null, "", "/your-target-page");
//                                             window.history.replaceState(null, "", window.location.pathname + window.location.search);

//                                             setVideoName(`${locale === "ar" ? child.titleAr : child.titleEn}`);
//                                             videoCommentsMutation.mutate(child.contentId);
//                                             setLastVideoData(null);
//                                         }}
//                                         key={child.nodeId}
//                                         className={`course_player_accordion_item ${child.isPassed || (child.isWatched && cookies.userData) ? "watched" : ""}`}>
//                                         <p className="p1">
//                                             {child.isPassed || child.isWatched ? <FaCheck className="watch_icon" /> : null}
//                                             {!child.isWatched && child.type === 0 && <MdOndemandVideo className="watch_icon" />} {locale === "ar" ? child.titleAr : child.titleEn}
//                                         </p>
//                                         {child.type == 0 &&
//                                             (cookies.userData ? (
//                                                 <span>{formatDuration(child.duration) || <FaFileCode />}</span>
//                                             ) : child.isFree ? (
//                                                 <span>{child.duration || <FaFileCode />}</span>
//                                             ) : (
//                                                 <LockOutlined />
//                                             ))}
//                                     </div>
//                                 ) : (
//                                     <div
//                                         onClick={() => handleClickNot(child.nodeId)}
//                                         key={child.nodeId}
//                                         className={`course_player_accordion_item not_accesible ${child.isPassed || (child.isWatched && cookies.userData) ? "watched" : ""}`}>
//                                         <p className={`p1 ${vibratingNode === child.nodeId ? "vibrate" : ""}`}>
//                                             {/* {child.isPassed || child.isWatched ? <LockOutlined className="watch_icon" /> : null} */}
//                                             {/* {!child.isWatched && child.type === 0 && <LockOutlined className="watch_icon" />}{" "} */}
//                                             <IoMdLock className="watch_icon" />
//                                             {locale === "ar" ? child.titleAr : child.titleEn}
//                                         </p>
//                                         {child.type == 0 &&
//                                             (cookies.userData ? (
//                                                 <span>{formatDuration(child.duration) || <FaFileCode />}</span>
//                                             ) : child.isFree ? (
//                                                 <span>{child.duration || <FaFileCode />}</span>
//                                             ) : (
//                                                 <LockOutlined />
//                                             ))}
//                                     </div>
//                                 ),
//                             )}
//                     </>
//                 ),
//             }));
// // useEffect(() => {
// //     window.history.replaceState(null, "", window.location.pathname + window.location.search);
// //     console.log("🧹 تنظيف الهيستوري عند تحميل الصفحة");
// // }, []);

//     return (
//         <>
//             <div className="course_player_accordion ltr_direction">
//                 <Collapse
//                     activeKey={activeKey}
//                     expandIcon={({ isActive }) => (isActive ? <DownOutlined /> : <UpOutlined />)}
//                     onChange={(keys) => setActiveKey(keys)}
//                     expandIconPosition="end"
//                     items={items}
//                 />
//             </div>
//             <ActiveAnswersPopup />
//             <GeneralPopup isExam={true} videoNodeExam={videoNodeExam} />
//         </>
//     );
// }