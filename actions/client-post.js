"use client";

export async function ClientPost() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("Server did not return valid JSON");
  }

  if (!res.ok || json?.status === false) {
    throw new Error(json?.message || "Request failed");
  }

  return json;
}
