"use server";
import Image from "next/image";
import { Link } from "@/navigation";
import { getCoursesData } from "../../utils/coursesHandler";
import Content from "../components/Content";
import { cookies } from "next/headers";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import BreadcrumbTwo from "@/components/breadcrumb/breadcrumb-2";

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

  const data = await getCoursesData(
    `/api/NodesApi/GetCourseNodes?courseId=${params.id}`,
    params.id
  );

  console.log("data", data);

  return (
    <div className="w-full px-3">
      <Content data={data?.data } courseId={params.id} />
    </div>
  );
};

export default page;
