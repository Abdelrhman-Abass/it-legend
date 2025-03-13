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
import { getServerRequest } from "@/app/utils/generalServerRequest";
import { useMutation } from "@tanstack/react-query";

import { IoMdLock } from "react-icons/io";


export default function CoursePlayerAccordion({ videosItems, videoCommentsMutation }: CoursePlayerAccordionProps) {
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
  // useEffect(() => {
  //   if (!videosItems || !videoNode) return;

  //   // Find the active module (current module containing the `videoNode`)
  //   const activeModuleIndex = videosItems.findIndex((module: any) =>
  //     module.nodes.some((node: any) => node.nodeId === videoNode)
  //   );

  //   if (activeModuleIndex !== -1) {
  //     const activeModule = videosItems[activeModuleIndex];

  //     // ✅ Check if the module contains an exam of type 1 and requires passing
  //     const isExamType1 = activeModule.nodes.some((node: any) => node.type === 1);
  //     const passedRequired = activeModule.nodes.some((node: any) => node.isRequired && node.isPassed);

  //     if (isExamType1 && passedRequired) {
  //       const nextModule = videosItems[activeModuleIndex + 1]; // ✅ Get the next module

  //       if (nextModule) {
  //         const updatedModules = [...videosItems]; // Clone the array
  //         updatedModules[activeModuleIndex + 1] = {
  //           ...nextModule,
  //           nodes: nextModule.nodes.map((node: any) => ({
  //             ...node,
  //             isAccessible: true, // ✅ Unlock all nodes in the next module
  //           })),
  //         };

  //         // ✅ Update state to trigger re-render
  //         setUpdatedVideosItems(updatedModules);
  //       }
  //     }
  //   }
  // }, [videoNode, videosItems]); 

  useEffect(() => {
    if (!updatedVideosItems || !videoNode) return;

    // Find the active module (current module containing the `videoNode`)
    const activeModuleIndex = updatedVideosItems.findIndex((module: any) =>
      module.nodes.some((node: any) => node.nodeId === videoNode)
    );

    if (activeModuleIndex !== -1) {
      const activeModule = updatedVideosItems[activeModuleIndex];
      console.log(activeModule)
      console.log(videosItems)

      // Check if the module contains an exam (type === 1) and if it's required and passed
      // const examNode = activeModule.nodes.find(
      //   (node: any) =>
      //     node.type === 1 &&
      //     node.isRequired === true &&
      //     passedIsRequired[node.nodeId] === true 
      // );
      const examNode = activeModule.nodes.find(
        (node: any) =>
          node.type === 1 &&
          node.isRequired === true 
          // passedIsRequired[node.nodeId] === false 
      );

      if (examNode) {
        const nextModule = updatedVideosItems[activeModuleIndex +1]; // Get the next module
        console.log(nextModule)
        if (nextModule) {
          const updatedModules = [...updatedVideosItems]; // Clone the array
          updatedModules[activeModuleIndex + 1] = {
            ...nextModule,
            nodes: nextModule.nodes.map((node: any) => ({
              ...node,
              isAccessible: true, // Unlock all nodes in the next module
            })),
          };

          // Update state to trigger re-render
          setUpdatedVideosItems(updatedModules);
        }
      }
    }
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

  const getPreviousNode = (flattenedNodes: any[], currentIndex: number) => {
    if (currentIndex > 0) {
      return flattenedNodes[currentIndex - 1];
    }
    return null; // No previous node
  };
  // Flatten all nodes
  const flattenedNodes = flattenNodes(updatedVideosItems || []);

  // Find the current node index
  const currentNodeIndex = findCurrentNodeIndex(flattenedNodes, videoNode);

  // Get next and previous nodes
  const nextNode = getNextNode(flattenedNodes, currentNodeIndex);
  const previousNode = getPreviousNode(flattenedNodes, currentNodeIndex);

  // Log next and previous nodes (for debugging)
  useEffect(() => {
    // console.log("Next Node:", nextNode);
    if (nextNode) {
      setNextNode(nextNode);
      // console.log("Previous Node:", nextNode);
    }
  }, [nextNode]);

  // Handle video play
  const handleVideoPlayType = (type: number, nodeID?: string) => {
    if (type == 0) {
      setVideoNode(nodeID || "");
      // console.log(type)
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } else if (type == 1) {
      // Handle download logic
      setNextNode(nextNode.nodeId);

      // console.log(videoId)
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
      const firstNode = activeModule.nodes[0]; // Get the first node in the active module
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
      <div className="course_player_accordion">
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

