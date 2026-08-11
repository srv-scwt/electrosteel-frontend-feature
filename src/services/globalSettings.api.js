import { ServerFetch } from "../../actions/server-fetch";

export async function getGlobalSettingsData() {
  try {
    const response = await ServerFetch("/frontend/careers/global-settings", {
      mode: "SSR",
    });

    return response;
  } catch (error) {
    console.error("Error fetching global settings data:", error);
    return null;
  }
}
