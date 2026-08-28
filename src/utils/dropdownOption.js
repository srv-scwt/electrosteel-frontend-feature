/**
 * Options for the "find by year" dropdowns.
 *
 * Prefers the API's flat `years` list: it holds every year the category has,
 * while `financialYears` only carries the years present in the current page of
 * results, which would shrink the dropdown as you page through.
 */
export const getFinancialYearOptions = (data) => {
  const years =
    Array.isArray(data?.years) && data.years.length
      ? data.years
      : data?.financialYears?.map((item) => item?.year) || [];

  const options = years
    .filter(Boolean)
    .map((year) => ({ label: year, value: year }));

  return [{ label: "ALL", value: "all" }, ...options];
};

 export const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
export const generateYearAndMonthOptions = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      years: [],
      months: [],
    };
  }

  const years = [];
  const months = new Set();

  data.forEach((item) => {
    if (!item?.date) return;

    const date = new Date(item.date);

    // Skip invalid dates
    if (isNaN(date.getTime())) return;

    const year = date.getFullYear().toString();
    const monthNumber = date.getMonth() + 1;
    const monthLabel = monthNames[date.getMonth()];

    // Add unique year
    if (!years.find((y) => y.value === year)) {
      years.push({
        label: year,
        value: year,
      });
    }

    // Add unique month
    months.add(
      JSON.stringify({
        label: monthLabel,
        value: monthNumber,
      })
    );
  });

  return {
    years,
    months: Array.from(months).map((item) => JSON.parse(item)),
  };
};

const NEWSLETTER_YEAR_PATTERN = /\b(?:19|20)\d{2}\b/;

/**
 * Calendar year a newsletter belongs to ("January, 2026" -> "2026"). The API
 * groups these into financial years that straddle two calendar years, so the
 * year comes from the item itself. The title wins over the date because it is
 * what the card displays, and a few records carry a mistyped date.
 */
export const getNewsletterYear = (item) => {
  const match =
    String(item?.title ?? "").match(NEWSLETTER_YEAR_PATTERN) ||
    String(item?.date ?? "").match(NEWSLETTER_YEAR_PATTERN);

  return match ? match[0] : "";
};

/**
 * Newest-first dropdown options built from the calendar years actually
 * present in the newsletters, labelled and valued as "FY 2026" so the
 * selection travels in the query params in that form.
 */
export const getNewsletterYearOptions = (data) => {
  const years = new Set();

  data?.financialYears?.forEach((financialYear) => {
    financialYear?.results?.forEach((item) => {
      const year = getNewsletterYear(item);
      if (year) {
        years.add(year);
      }
    });
  });

  const options = [...years]
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({ label: `FY ${year}`, value: `FY ${year}` }));

  return [{ label: "ALL", value: "all" }, ...options];
};
