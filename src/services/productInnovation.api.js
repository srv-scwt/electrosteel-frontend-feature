import { handleServerFetchError, ServerFetch } from "../../actions/server-fetch";

export async function getProductInnovation() {
  try {
    const response = await ServerFetch(`/frontend/about/all-ProductInnovationData-v2`, { mode: "SSR"});

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
    return handleServerFetchError(error, "PRODUCT_INNOVATION_ERROR");
  }
}
