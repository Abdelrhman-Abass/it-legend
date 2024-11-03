"use server";
import ServerHandler from "@/utils/ServerHandler";
import { cookies } from "next/headers";

export const authHandler = async (url, body) => {
  const res = await ServerHandler(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res?.data?.data?.id) {
    const token = await getJWT(body);
    cookies().set("user_id", res.data.data.id);
    cookies().set("token", token);
  }
  return res;
};

const getJWT = async (body) => {
  const toekn = await ServerHandler(`/api/JWTAuthApi/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return toekn.data.data;
};
