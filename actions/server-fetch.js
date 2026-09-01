function isDynamicServerUsageError(error) {
  return (
    error?.digest === "DYNAMIC_SERVER_USAGE" ||
    error?.description?.includes("Dynamic server usage") ||
    error?.message?.includes("Dynamic server usage")
  );
}

export function handleServerFetchError(error, label = "SERVER_FETCH_ERROR") {
  if (isDynamicServerUsageError(error)) {
    throw error;
  }

  console.error(`${label}:`, error);

  return {
    data: null,
    error: "API_DOWN",
  };
}

export async function ServerFetch(path, config = {}, init) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("API_URL is not defined");
    return null;
  }

  try {
    const API_PAGE = `${baseUrl}${path}`;

    // Logs every outbound API URL to the terminal running `next dev`.
    // Stripped from production builds by `compiler.removeConsole`.
    console.log(`[API] ${API_PAGE}`);

    const res = await fetch(API_PAGE, {
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
      ...(config.mode === "SSR"
        ? { cache: "no-store" }
        : { next: { revalidate: config.revalidate } }),
    });

    // res.status is always a number, so the previous `!res.status` check never
    // fired and error responses fell through to be parsed as data.
    if (!res.ok) {
      console.error("fetchServer failed:", path, res.status);
      return null;
    }
    const json = await res.json();
    if (json?.status === false) return null;

    // return (json?.data ?? json) as T;
    return json;
  } catch (err) {
    if (isDynamicServerUsageError(err)) {
      throw err;
    }

    console.error("fetchServer exception:",path, err);
    return null;
  }
}
