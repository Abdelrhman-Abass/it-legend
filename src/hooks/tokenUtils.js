"use server"
import { cookies } from "next/headers";

export const getAccessToken = async() => await cookies().get("token")?.value;
export const getRefreshToken = async () => await cookies().get("refreshToken")?.value;

export const setAccessToken = async(token) => {
  await cookies().set("token", JSON.stringify(token), { httpOnly: true, secure: true, maxAge: 3600 }); // 1 hour
};

export const setRefreshToken = async (refreshToken) => {
  await cookies().set("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 86400 }); // 24 hours
};

export const clearTokens = async() => {
  await cookies().delete("token");
};