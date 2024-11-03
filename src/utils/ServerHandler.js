"use server";
import ApiOperations from "./ApiOperations";

const ServerHandler = async (endpoint, reqOptions) => {
  return await ApiOperations(endpoint, reqOptions);
};
export default ServerHandler;
