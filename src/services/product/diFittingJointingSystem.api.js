import { handleServerFetchError, ServerFetch } from "../../../actions/server-fetch";

export async function getDiFittingJointingSystem() {
  try {
    const response = await ServerFetch(`/frontend/products/ductileJointingSytem`, { mode: "SSR"});

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
    return handleServerFetchError(error, "JOINTING_SYSTEM_SSR_ERROR");
  }
}
