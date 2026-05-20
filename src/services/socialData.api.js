import { handleServerFetchError, ServerFetch } from "../../actions/server-fetch";

export async function getSocialData() {
  try {
    const response = await ServerFetch(`/frontend/home/social-data`, { mode: "SSR"});

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

    return {
      data: response.data,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "ONSOCIAL_ERROR");
  }
}
