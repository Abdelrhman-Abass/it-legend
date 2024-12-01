"use client";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  getCoursesData,
  isWatched,
  revalidateCourses,
} from "../../utils/coursesHandler";
import { usePathname, useRouter } from "@/navigation";
import YouTubePlayer from "./players/YouTubePlayer";
import PublitioPlayer from "./players/PublitioPlayer";
import VdocipherPlayer from "./players/VdocipherPlayer";
import ExamPlayer from "./players/ExamPlayer";
import Problem from "./players/Problem";
import { useDispatch, useSelector } from "react-redux";
import { selectCoursesPlayerVideo ,UserCoursePlayerNode} from "@/store/features/course-slice";
import { CoursePlayerVideo } from "@/hooks/PlayerHandler";
import { selectCourseError, selectCourseLinks, selectCourseStatus, UserCoursePlayerLinks } from "@/store/features/player-slice";

const Player = ({ nodes, moduleId , modules}) => {
  const [node, setNode] = useState(null);
  const [nextNode, setNextNode] = useState(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const contentId = params.get("contentId");
  const type = params.get("type");
  const nodeId = params.get("no");
  // const courseId = useParams().id;
  const { replace } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courseId = moduleId

  const video = useSelector(selectCourseLinks)
  const status = useSelector(selectCourseStatus)
  const error = useSelector(selectCourseError)

  // console.log("type "+type)
  // console.log("node id " +nodeId)
  // console.log(courseId)

  // const res = async(courseId, nodeId) => await CoursePlayerVideo(courseId, nodeId) http://localhost:3000/en/course-player/c7f5bfef-8117-4021-b83e-448051bced9a?type=0&no=8f6f7c08-ed89-4c9e-85aa-a35f744a578d
  // console.log("res " + JSON.stringify(res()))
  
  useEffect(()=>{
    dispatch(UserCoursePlayerLinks({courseId ,nodeId} ))
  },[dispatch])

  useEffect(() => {
    console.log("video Status:", status);
    console.log(modules)
    const r = getNextNodeId(modules , nodeId)
    console.log("next node : " + r)
    // if (status === "succeeded") {
    //   console.log("video Data:", video);
    //   // const { data } = video;  // Assuming `courses` has a `data` property that holds the array
    //   // console.log("Data array:", video);  // Log the actual array
    // }
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, video, error, dispatch]);


  const handleIsWatched = async () => {
    console.log("moduleId", moduleId);
    const body = {
      VideoId: contentId,
      IsEnded: false,
      isWatched: true,
      CourseId: courseId,
      ModuleId: moduleId,
    };
    await isWatched(body)
      .then(async (res) => {
        await revalidateCourses(courseId).then((res) =>
          console.log("is watched res:", res)
        );
      })
      .catch((err) => {
        console.log("isWatched Error", err);
      });
  };

  const handleIsVideoEnd = () => {
    if (nextNode) {
      const { contentId, type, playerType } = nextNode;
      // go to the next video only. not pdf not exam
      if (type == 0) {
        params.set("contentId", contentId);
        params.set("type", type);
        params.set("playerType", playerType);
        replace(`${pathname}?${params.toString()}`);
      }
    }
  };

  const getNextNodeId = (modules, nodeId) => {
    // Find the module that contains the nodes
    const module = modules.find((mod) => mod.nodes);
  
    if (!module) return null; // If no module found, return null
  
    // Find the index of the current node
    const currentNodeIndex = module.nodes.findIndex((node) => node.nodeId === nodeId);
  
    if (currentNodeIndex === -1) return null; // If nodeId is not found, return null
  
    // Get the next node
    const nextNode = module.nodes[currentNodeIndex + 1];
  
    return nextNode ? nextNode.nodeId : null; // Return the nodeId of the next node or null if there's no next node
  };
  
  // get current node
  useEffect(() => {
    // get node if type == 0 (video) or type == 4 (pdf)
    if (contentId) {
      if (type == 0 || type == 4) {
        const getNode = async () => {
          try {
            const node = await getCoursesData(
              `/api/NodesApi/GetNode?contentId=${contentId}&type=${type}&playerType=${playerType}`
            );

            // const currentModules = nodes.find(
            //   ({ nodes }) => nodes.some(({ index }) => index == stoppedIndex) // Find the first parent node where any child node matches stoppedIndex
            // )?.moduleId; // Return the moduleId
            setNode(node);
          } catch (error) {
            console.error("Error fetching node data:", error);
          }
        };
        getNode();
      } else if (type == 1) {
        // type == 1 (exam)
        const getExamNode = async () => {
          try {
            const node = await getCoursesData(
              `/api/VideoExamQuestion/GetMobileExam?examId=${contentId}`
            );
            setNode(node);
            console.log("module", nodes);
          } catch (error) {
            console.error("Error fetching node data:", error);
          }
        };
        getExamNode();
      }
    }
  }, [contentId]);

  // get next node
  useEffect(() => {
    const findNextNodeByContentId = (data = [], targetContentId) => {
      let foundIndex = -1;

      // Iterate through modules and nodes to find the index of the matching node
      for (let module of data) {
        const nodes = module.nodes;
        const index = nodes.findIndex(
          (node) => node.contentId == targetContentId
        );

        if (index != -1) {
          foundIndex = index;
          break;
        }
      }

      // If no node with the given contentId was found, return a specific value
      if (foundIndex == -1) {
        // return "No node found with the given contentId";
        return null;
      }

      // Determine the next node
      for (let module of data) {
        const nodes = module.nodes;

        // Check if the next node exists
        if (foundIndex < nodes.length - 1) {
          return nodes[foundIndex + 1];
        }
      }

      // Return a message if there is no next node
      // return "No next node found";
      return null;
    };
    setNextNode(findNextNodeByContentId(nodes, contentId));
  }, [contentId]);

  return (
    <>
      {/* type == 0 video */}
      {type == 0 ? (
        type == 0 ? (
          <YouTubePlayer
            node={video}
            handleIsWatched={handleIsWatched}
            handleIsVideoEnd={handleIsVideoEnd}
          />
         ) 
        // : type == 0 ? (
        //   <PublitioPlayer
        //     node={video.path}
        //     handleIsWatched={handleIsWatched}
        //     handleIsVideoEnd={handleIsVideoEnd}
        //   />
        // ) 
        : playerType == 2 ? (
          <VdocipherPlayer
            node={node}
            handleIsWatched={handleIsWatched}
            handleIsVideoEnd={handleIsVideoEnd}
          />
        ) : null
      ) : type == 1 && node ? (
        // type == 1 exam
        <ExamPlayer
          content={contentId}
          nodes={nodes}
          exam={node}
          handelIsExamEnd={handleIsVideoEnd}
        />
      ) : // type == 2 problem
      type == 2 && node ? (
        <Problem problem={node} handelIsProblemSubmit={handleIsVideoEnd} />
      ) : (
        // type == 4 pdf
        type == 4 &&
        node && (
          <iframe src={node.path} style={{ width: "100%", height: "100%" }} />
        )
      )}
    </>
  );
};

export default Player;
