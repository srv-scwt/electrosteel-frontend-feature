import {ServerFetch} from "../../actions/server-fetch";

export async function getCareersData() {
  try {
    const response = await ServerFetch("/frontend/careers", {
      mode: "SSR",
    });
  
    return response;
  } catch (error) {
    console.error("Error fetching careers data:", error);
    return null;
  }
}
