"use server";
import Image from "next/image";
import { Link } from "@/navigation";
import { getCoursesData } from "../../utils/coursesHandler";
import Content from "../components/Content";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";
import { CoursePlayerLatestNode, CoursePlayerLinks , CoursePlayerNode } from "@/hooks/PlayerHandler";
import { latestNodeOpend } from "@/hooks/courseHandler";

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

  const {data} = await CoursePlayerLinks(params.id);
  const links = data
  console.log(links)

  const { latestNode } = await CoursePlayerLatestNode(params.id)
  console.log("latestNode : " + latestNode)
  
  const courseNode = await CoursePlayerNode(params.id)
  // await courseNode.data.map((mode,index)=>{
  //   mode.nodes.map((node, i) =>{
  //     console.log(node.titleAr)
  //   })
  // })


  const mockData = {
    data: {
      nodes: [
        {
          moduleId: "module1",
          title: "Module 1: Introduction",
          nodes: [
            {
              contentId: "video1",
              title: "Welcome Video",
              type: 0, // video type
              playerType: 0, // YouTube player
              index: 0,
              isCompleted: false
            },
            {
              contentId: "pdf1",
              title: "Course Materials",
              type: 4, // PDF type
              path: "https://example.com/sample.pdf",
              index: 1,
              isCompleted: false
            },
            {
              contentId: "exam1",
              title: "Module 1 Quiz",
              type: 1, // exam type
              index: 2,
              isCompleted: false
            }
          ]
        },
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
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImE4YzhlMGQ1LTU5MmYtNDdhZC1hYWIyLTA2OWM2MjEwNmVkOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJhbGFhbXVoYW1lZDk3QGdtYWlsLmNvbSIsImp0aSI6ImYzYjgyMDYxLWM3YzctNDlmZC05MDhlLWUwYWU3NjE4NTJmYyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6InVzZXIiLCJleHAiOjE3MzI5OTAwMzAsImlzcyI6Imh0dHBzOi8vd3d3Lml0bGVnZW5kLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5pdGxlZ2VuZC5uZXQvIn0.cYhXXdXnSqtMBGmxjQSX5PPoOq4NpU74T8TzqROs64c
  // http://localhost:3000/en/course-player/c7f5bfef-8117-4021-b83e-448051bced9a?contentId=video1&type=0&playerType=0  https://ant.design/components/progress
  // console.log("data", mockData);

  return (
    <div className="w-full px-3">
      <Content data={mockData?.data } testData={courseNode.data} courseId={params.id} links={links} />
    </div>
  );
};

export default page;
