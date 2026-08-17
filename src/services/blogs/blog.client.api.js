/**
 * Client-side blog paging.
 * Kept separate from blog.api.js because that module pulls in ServerFetch,
 * which has no business in the browser bundle.
 */

export const BLOG_PAGE_SIZE = 10;

/** The API sends `hasNext`; fall back to the page counters if it ever stops. */
export function hasNextPage(pagination) {
  if (!pagination) return false;
  if (typeof pagination.hasNext === "boolean") return pagination.hasNext;

  const { page, totalPages } = pagination;
  return Number.isFinite(page) && Number.isFinite(totalPages)
    ? page < totalPages
    : false;
}

export async function fetchBlogsPage({
  category,
  page = 1,
  limit = BLOG_PAGE_SIZE,
} = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  const params = new URLSearchParams();
  if (category) {
    params.set("category", category === "quartely" ? "quarterly" : category);
  }
  params.set("page", String(page));
  params.set("limit", String(limit));

  try {
    const res = await fetch(`${baseUrl}/frontend/blogs?${params.toString()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;

    const json = await res.json();
    if (json?.status === false) return null;

    return {
      data: Array.isArray(json?.data) ? json.data : [],
      pagination: json?.pagination ?? null,
    };
  } catch {
    return null;
  }
}
