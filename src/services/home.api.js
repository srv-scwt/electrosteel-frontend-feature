import { ServerFetch } from "../../actions/server-fetch";

export async function getHomeListing() {
  try {
    const response = await ServerFetch(`/frontend/home`, { mode: "SSR"});

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
    console.error("HOME_SSR_ERROR:", error);

    return {
      data: null,
      error: "API_DOWN",
    };
  }
}
