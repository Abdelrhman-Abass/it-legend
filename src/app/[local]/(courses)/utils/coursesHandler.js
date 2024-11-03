"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export const getCoursesData = async (url, courseId) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    // if (!token || !userId) {
    //   throw new Error("Missing authentication details.");
    // }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: { tags: [`course-${courseId}`] },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export const isWatched = async (body) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/CourseVideo/PostWatchedVideo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, memberid: userId }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export async function revalidateCourses(courseId) {
  revalidateTag(`course-${courseId}`);
}

export const submitExam = async (body) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/VideoExamQuestion/SaveMobileMemberExamQuestionAnswers`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, memberid: userId }),
      }
    );

    console.log("submit quiz", res);

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export const getAsks = async (courseId) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/VideoConversation/GetMobileVideoConversation?courseId=${courseId}&memberId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export const deleteAsk = async (body) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/VideoConversation/DeleteMobileConversation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export const sendeAsk = async (body) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/VideoConversation/PostMobileConversation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...body, CreatedBy: userId }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};

export const editAsk = async (body) => {
  const token = cookies().get("token")?.value;
  const userId = cookies().get("user_id")?.value;
  try {
    if (!token || !userId) {
      throw new Error("Missing authentication details.");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/VideoConversation/EditMobileConversation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data.");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses data:", error);
    return null;
  }
};
