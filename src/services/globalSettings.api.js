import { ServerFetch } from "../../actions/server-fetch";

export async function getGlobalSettingsData() {
  try {
    // No explicit revalidate: uses the shared CACHE_TTL and is cleared on
    // demand via /api/revalidate (tag "careers").
    const response = await ServerFetch("/frontend/careers/global-settings");

    return response;
  } catch (error) {
    console.error("Error fetching global settings data:", error);
    return null;
  }
}
