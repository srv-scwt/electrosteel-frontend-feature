import { ServerFetch } from "../../actions/server-fetch";

export async function getVisionMisson() {
  try {
    const response = await ServerFetch(`/frontend/about/vision-mission-data`, { mode: "SSR"});

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
    console.error("VISION_MISSION_SSR_ERROR:", error);

    return {
      data: null,
      error: "API_DOWN",
    };
  }
}
