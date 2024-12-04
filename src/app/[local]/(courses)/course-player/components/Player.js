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
import { selectCourseError, selectCourseLinks, selectCourseStatus,selectCourseComments, UserCoursePlayerComments, UserCoursePlayerLinks } from "@/store/features/player-slice";
import { LatestVideoNode, selectLatestVideo } from "@/store/features/diploma-slice";

const Player = ({ nodes, moduleId , modules, setWatch ,activeNode, typeActiveNode,playerType,  setComments}) => {
  const [node, setNode] = useState(null);
  const [nextNode, setNextNode] = useState(null);
  const [nextNodeId, setNextNodeId] = useState(null);
  const [type , setType] = useState(typeActiveNode)
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const contentId = params.get("contentId");
  // const type = params.get("type");
  const nodeId = params.get("no");
  // const courseId = useParams().id;
  const { replace } = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const courseId = moduleId

  const video = useSelector(selectCourseLinks)
  const status = useSelector(selectCourseStatus)
  const error = useSelector(selectCourseError)
  const comments = useSelector(selectCourseComments)  
  const latest = useSelector(selectLatestVideo)

  useEffect(() => {
    if (activeNode) {
      dispatch(UserCoursePlayerLinks({ courseId, nodeId:activeNode }));
      console.log("Dispatched UserCoursePlayerLinks with activeNode:", activeNode);
      console.log("Dispatched UserCoursePlayerLinks with playerType:", playerType);
    }
  }, [activeNode, type,dispatch]);
 // https://it-legend-rrkg.vercel.app/ar/course-player/c84e7902-1205-426f-a857-922bedd84bdf?type=0  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE4YzhlMGQ1LTU5MmYtNDdhZC1hYWIyLTA2OWM2MjEwNmVkOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhbGFhbXVoYW1lZDk3QGdtYWlsLmNvbSIsImp0aSI6IjZiNTQ3YWQ2LWRlZWMtNDYxMS1hMWM3LThjOWRmZTJlMTRhNiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE3MzMyMjcyMzQsImlzcyI6Imh0dHBzOi8vd3d3Lml0bGVnZW5kLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5pdGxlZ2VuZC5uZXQvIn0.2vkb3XSr9f7GSsrxrqp0hDzVNyJni7Cc7cmjiYoS3mw
  
 useEffect(()=>{
    dispatch(UserCoursePlayerComments({activeNode} ))
  },[dispatch,activeNode])

  
  
  
  useEffect(() => {
    // console.log("video Status:", status);
    // console.log("activeNode Status:", activeNode);
    // console.log("type Status:", type);
    // console.log("video " +JSON.stringify(video))
    // console.log(modules)
    const r = getNextNodeId(JSON.stringify(modules) , activeNode)
    setNextNodeId(r)
    console.log("next node : " + r)
    
    
    setComments(comments)
    // console.log(" comments : "+comments)
    if (status === "failed") {
      console.log("Error:", error);
    }
  }, [status, video, error, activeNode, typeActiveNode,dispatch]);

  const getNextNodeId = (modules, activeNode) => {
    // Find the module that contains the nodes
    const module = modules.find((mod) => mod.nodes);
  
    if (!module) return null; // If no module found, return null
  
    // Find the index of the current node
    const currentNodeIndex = module.nodes.findIndex((node) => node.nodeId === activeNode);
  
    if (currentNodeIndex === -1) return null; // If nodeId is not found, return null eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE4YzhlMGQ1LTU5MmYtNDdhZC1hYWIyLTA2OWM2MjEwNmVkOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhbGFhbXVoYW1lZDk3QGdtYWlsLmNvbSIsImp0aSI6Ijg2OWUxNjhjLTZmYmEtNGM1NC1hYjgzLTU2NWJiMTFhOTM1ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE3MzMzMTYxNTgsImlzcyI6Imh0dHBzOi8vd3d3Lml0bGVnZW5kLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5pdGxlZ2VuZC5uZXQvIn0.lC62snsnl_1uRm-hoAtOqz3JF9xv8VaTT3574KHrz8s
  
    // Get the next node
    const nextNode = module.nodes[currentNodeIndex + 1];
  
    return nextNode ? nextNode.nodeId : null; // Return the nodeId of the next node or null if there's no next node  http://localhost:3000/en/course-player/602d090f-ef57-464a-b724-0bf57ae9cdc3
  };

  useEffect(()=>{
    const r = getNextNodeId(modules , activeNode)
    setNextNodeId(r)
    console.log("active : " + modules)
    console.log("next node : " + r)
 
   },[activeNode])
  
  const handleIsWatched = async () => {
    // console.log("moduleId", moduleId);
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
        playerType == 0 ? (
          <YouTubePlayer
            node={video}
            setWatch={setWatch}
            handleIsVideoEnd={handleIsVideoEnd}
            nextNode={nextNodeId}
          />
         ) 
        : 
        playerType == 1 ? (
          <PublitioPlayer
            node={video}
            handleIsVideoEnd={handleIsVideoEnd}
            nextNode={nextNodeId}

          />
        ) 
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
