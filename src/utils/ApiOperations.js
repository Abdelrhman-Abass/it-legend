import { revalidatePath, revalidateTag } from "next/cache";
const ApiOperations = async (endpoint, reqOptions) => {
  let api = {
    data: null,
    error: null,
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + endpoint,
      reqOptions
    );

    const data = await response.json();

    if (data && reqOptions?.revalidation) {
      const { tag = "", path = "" } = reqOptions?.revalidation;
      if (tag) {
        revalidateTag(tag);
      }
      if (path) {
        revalidatePath(path);
      }
    }
    api.data = data;
    api.error = null;
  } catch (error) {
    api.data = null;
    api.error = "Fetching Error";
  }
  return api;
};
export default ApiOperations;
