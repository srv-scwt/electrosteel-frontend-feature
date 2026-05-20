// import { ServerFetch } from "../../actions/server-fetch";

import { handleServerFetchError, ServerFetch } from "../../../actions/server-fetch";

export async function getBlogResponseByCategory({
  category,
  year,
  month,
  keywords,
  search_by,
} = {}) {
  try {
    const normalizeParam = (value) =>
      Array.isArray(value) ? value[0] : value;

    const params = new URLSearchParams();
    const normalizedCategory = category === "quartely" ? "quarterly" : category;
    const normalizedYear = normalizeParam(year);
    const normalizedMonth = normalizeParam(month);
    const normalizedKeywords = normalizeParam(keywords ?? search_by)?.trim();

    if (normalizedCategory) {
      params.set("category", normalizedCategory);
    }

    if (normalizedYear) {
      params.set("year", normalizedYear);
    }

    if (normalizedMonth) {
      params.set("month", normalizedMonth);
    }

    if (normalizedKeywords) {
      params.set("keywords", normalizedKeywords);
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `/frontend/blogs?${queryString}`
      : `/frontend/blogs/blogListPage`;

    const response = await ServerFetch(endpoint, { mode: "SSR" });
    if (!response) {
      return { data: null, error: "NO_DATA" };
    }

    if (response.error) {
      return {
        data: null,
        error: response.error,
        status: response.status ?? null,
      };
    }

    return {
      data: response?.data,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "getBlogResponseByCategory");
  }
}
