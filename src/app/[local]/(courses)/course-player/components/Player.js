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

const Player = ({ nodes, moduleId }) => {
  const [node, setNode] = useState(null);
  const [nextNode, setNextNode] = useState(null);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const contentId = params.get("contentId");
  const type = params.get("type");
  const playerType = params.get("playerType");
  const courseId = useParams().id;
  const { replace } = useRouter();
  const pathname = usePathname();

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
      {type == 0 && node ? (
        playerType == 0 ? (
          <YouTubePlayer
            node={node}
            handleIsWatched={handleIsWatched}
            handleIsVideoEnd={handleIsVideoEnd}
          />
        ) : playerType == 1 ? (
          <PublitioPlayer
            node={node}
            handleIsWatched={handleIsWatched}
            handleIsVideoEnd={handleIsVideoEnd}
          />
        ) : playerType == 2 ? (
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
