import {ServerFetch} from "../../actions/server-fetch";

export async function getCareersData() {
  try {
    const response = await ServerFetch("/frontend/careers", {
      revalidate: 10,
    });
  
    return response;
  } catch (error) {
    console.error("Error fetching careers data:", error);
    return null;
  }
}
