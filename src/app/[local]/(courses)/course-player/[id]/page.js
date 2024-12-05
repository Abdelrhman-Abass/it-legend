"use server";
import Image from "next/image";
import { Link } from "@/navigation";
import { getCoursesData } from "../../utils/coursesHandler";
import Content from "../components/Content";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import { CoursePlayerLatestNode, CoursePlayerLinks, CoursePlayerNode } from "@/hooks/PlayerHandler";
import { latestNodeOpend } from "@/hooks/courseHandler";
import { PlayerLatestNode } from "@/app/[local]/auth/authHandler";
import { NodeIdProvider } from "../context/NodeIdContext"; // Adjust the path as needed

const page = async ({ params }) => {
  // {{itlegend}}/api/NodesApi/GetCourseNodes?courseId=78a34224-b9b3-424b-bd5a-137e891326ca&userId=54d739c2-228e-4f64-8808-678a56a8da45s
  // vdocipher
  // const courseId = "36eee4a7-02df-4b56-b424-8b2d6b0dc346";
  // youtube
  // const courseId = "c84e7902-1205-426f-a857-922bedd84bdf";
  // PublitioPlayer
  // const courseId = "c7f5bfef-8117-4021-b83e-448051bced9a"

  // problem solving
  // const courseId = "78a34224-b9b3-424b-bd5a-137e891326ca"
  // att
  // const courseId = "78a34224-b9b3-424b-bd5a-137e891326ca"
  console.log(params.id)

  const { data } = await CoursePlayerLinks(params.id);
  const links = data
  console.log(links)

  // const { latestNode } = await PlayerLatestNode(params.id)
  // console.log("latestNode : " + latestNode)

  const courseNode = await CoursePlayerNode(params.id)


  const mockData = {
    data: {
      nodes: [
        {
          moduleId: "module2",
          title: "Module 2: Advanced Topics",
          nodes: [
            {
              contentId: "video2",
              title: "Advanced Concepts",
              type: 0, // video type
              playerType: 1, // Publitio player
              index: 3,
              isCompleted: false
            },
            {
              contentId: "problem1",
              title: "Coding Challenge",
              type: 2, // problem type
              index: 4,
              isCompleted: false
            }
          ]
        }
      ],
      stoppedIndex: 0
    }
  };
  // http://localhost:3000/en/course-player/c7f5bfef-8117-4021-b83e-448051bced9a?contentId=video1&type=0&playerType=0  https://ant.design/components/progress
  // console.log("data", mockData); http://localhost:3000/en/course-player/602d090f-ef57-464a-b724-0bf57ae9cdc3

  return (
    <NodeIdProvider>
      <div className="w-full px-3">
        <Content data={mockData?.data} testData={courseNode.data} courseId={params.id} links={links} />
      </div>

    </NodeIdProvider>
  );
};

export default page;
