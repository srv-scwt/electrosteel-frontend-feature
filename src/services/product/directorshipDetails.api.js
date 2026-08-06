import { handleServerFetchError, ServerFetch } from "../../../actions/server-fetch";

export async function getDirectorshipDetails() {
  try {
    const response = await ServerFetch(`/frontend/products/product/find-by-category/board-directorship-details`, { mode: "SSR"});

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
console.log(response.data)
    return {
      data: response.data,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "ABOUTUS_SSR_ERROR");
  }
}
