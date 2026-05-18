"use server"

export async function ServerFetch(  path,
  config,
  init) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!baseUrl) {
    console.error("API_URL is not defined");
    return null;
  }

  try {
    const API_PAGE = `${baseUrl}${path}`
    const res = await fetch(API_PAGE, {
      headers: {
        Accept: "application/json",
        ...(init?.headers || {}),
      },
      ...(config.mode === "SSR"
        ? { cache: "no-store" }
        : { next: { revalidate: config.revalidate } }),
    });
    
    
    if (!res.status) {
      console.error("fetchServer failed:", path, res.status);
      return null;
    }
    const json = await res.json();
    if (json?.status === false) return null;

    // return (json?.data ?? json) as T;
    return (json) ;
  } catch (err) {
    console.error("fetchServer exception:",path, err);
    return null;
  }
}
