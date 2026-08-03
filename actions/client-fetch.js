"use client"
export async function ClientFetch(path, init = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const json = await res.json();

  if (!res.ok || json?.status === false) {
    throw new Error(json?.message || "Request failed");
  }

  return json?.data ?? json;
}
