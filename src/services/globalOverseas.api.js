import { handleServerFetchError, ServerFetch } from "../../actions/server-fetch";

export async function getGlobalOverseas() {
  try {
    const response = await ServerFetch(`/frontend/global-presence/extra`, { mode: "SSR"});

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
      data: response,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "HOME_SSR_ERROR");
  }
}
