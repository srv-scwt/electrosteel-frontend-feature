// import { ServerFetch } from "../../actions/server-fetch";

import { handleServerFetchError, ServerFetch } from "../../../actions/server-fetch";

export async function getInvestorResponse({
  category,
  year,
  is_latest,
  page,
  limit,
} = {}) {
  try {
    const params = new URLSearchParams();
    const normalizedCategory = category === "quartely" ? "quarterly" : category;
    const normalizedYear = Array.isArray(year) ? year[0] : year;
    const normalizedIsLatest = Array.isArray(is_latest)
      ? is_latest[0]
      : is_latest;
    const normalizedPage = Array.isArray(page) ? page[0] : page;
    const normalizedLimit = Array.isArray(limit) ? limit[0] : limit;

    if (normalizedCategory) {
      params.set("category", normalizedCategory);
    }

    if (normalizedYear) {
      params.set("year", normalizedYear);
    }

    if (
      normalizedIsLatest !== undefined &&
      normalizedIsLatest !== null &&
      normalizedIsLatest !== ""
    ) {
      params.set("is_latest", String(normalizedIsLatest));
    }

    if (Number(normalizedPage) > 0) {
      params.set("page", String(Number(normalizedPage)));
    }

    if (Number(normalizedLimit) > 0) {
      params.set("limit", String(Number(normalizedLimit)));
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `/frontend/investor/investors?${queryString}`
      : `/frontend/investor/investors`;

    const response = await ServerFetch(endpoint, { mode: "SSR"});

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
      data: response,
      error: null,
      status: response.statusCode===200 ? true : false,
    };
  } catch (error) {
    return handleServerFetchError(error, "getInvestorResponse");
  }
}

/**
 * "Extra" investor sections, e.g. the Compliance Report page.
 *
 * /frontend/investor/extra-investors/all?category=...&page=&limit=
 * Responds with { data: [sections], pagination: { total, page, limit, totalPages } },
 * where each section nests year groups which in turn nest the documents.
 */
export async function getExtraInvestorResponse({ category, page, limit } = {}) {
  try {
    if (!category) {
      return { data: null, error: "NO_CATEGORY" };
    }

    const params = new URLSearchParams({ category });

    if (Number(page) > 0) {
      params.set("page", String(Number(page)));
    }

    if (Number(limit) > 0) {
      params.set("limit", String(Number(limit)));
    }

    const response = await ServerFetch(
      `/frontend/investor/extra-investors/all?${params.toString()}`,
      { mode: "SSR" }
    );

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
      data: {
        sections: Array.isArray(response?.data) ? response.data : [],
        pagination: response?.pagination ?? null,
      },
      error: null,
      status: true,
    };
  } catch (error) {
    return handleServerFetchError(error, "getExtraInvestorResponse");
  }
}

export async function getSrikalahasthiMainResponse() {
  try {
    const response = await ServerFetch(`/frontend/investor/srikalsti-main/all`, {
      mode: "SSR",
    });

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

    const responseData = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    return {
      data: responseData,
      error: null,
      status: response?.statusCode === 200 || Array.isArray(response),
    };
  } catch (error) {
    return handleServerFetchError(error, "getSrikalahasthiMainResponse");
  }
}

export async function getNodalOfficerResponse() {
  try {
    const response = await ServerFetch(`/frontend/investor/nodal-officer`, {
      mode: "SSR",
    });

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
      data: response.data,
      error: null,
      status: response.statusCode === 200,
    };
  } catch (error) {
    return handleServerFetchError(error, "getNodalOfficerResponse");
  }
}

export async function getUnclaimedDividendsResponse() {
  try {
    const response = await ServerFetch(
      `/frontend/investor/unclaimed-dividends`,
      {
        mode: "SSR",
      }
    );

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
      data: response.data,
      error: null,
      status: response.statusCode === 200,
    };
  } catch (error) {
    return handleServerFetchError(error, "getUnclaimedDividendsResponse");
  }
}
