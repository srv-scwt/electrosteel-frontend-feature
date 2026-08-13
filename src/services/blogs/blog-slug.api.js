import { handleServerFetchError, ServerFetch } from "../../../actions/server-fetch";

export async function getBlogDetailsBySlug(slug) {
  try {
    const response = await ServerFetch(`/frontend/blogs/by-slug/${slug}`, { mode: "SSR" });

    if (!response) {
      return { data: null, error: "NO_DATA" };
    }

    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status ?? null,
      };
    }
    console.log(`/frontend/blogs/by-slug/${slug}`,response)

    return {
      data: response.data?.[0] ?? response.data,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "ABOUTUS_SSR_ERROR");
  }
}
