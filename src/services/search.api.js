/**
 * Client-side search API.
 * Uses NEXT_PUBLIC_API_URL directly because this runs in the browser
 * and cannot use the server-only ServerFetch helper.
 */
export async function fetchSearchResults(query, { page = 1, limit = 5 } = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl || !query?.trim()) return null;

  const params = new URLSearchParams({
    query: query.trim(),
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(`${baseUrl}/frontend/search?${params.toString()}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();
  if (json?.status === false) return null;

  return json;
}
