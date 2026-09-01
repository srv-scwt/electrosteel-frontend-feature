/**
 * Maps the /extra-investors/all payload onto the shape FinancialReportsSection
 * already renders, so the page looks and behaves like the other investor pages
 * without touching that shared component.
 *
 * From:  [{ section_title, data: [{ year, data: [document, ...] }] }]
 * To:    { financialYears: [{ year, heading, section_title, results }], years, totalCount }
 */
export function normalizeExtraInvestors(sections = [], pagination = null) {
  const financialYears = [];
  const years = [];

  sections.forEach((section) => {
    const sectionTitle = section?.section_title?.toString().trim() || "";
    const yearGroups = Array.isArray(section?.data) ? section.data : [];

    yearGroups.forEach((yearGroup) => {
      const year = yearGroup?.year?.toString().trim() || "";
      const results = Array.isArray(yearGroup?.data) ? yearGroup.data : [];

      if (!results.length) return;

      if (year && !years.includes(year)) {
        years.push(year);
      }

      financialYears.push({
        year,
        // A section can span several years, and each year is its own block.
        // Without the year in the heading the same title repeats with no way
        // to tell the blocks apart.
        heading: year ? `${sectionTitle} - ${year}` : sectionTitle,
        section_title: sectionTitle,
        results: results.map((item) => ({
          ...item,
          src: item?.src?.replaceAll("\\", "/"),
        })),
      });
    });
  });

  return {
    financialYears,
    // Newest first, matching the other investor dropdowns.
    years: years.sort((a, b) => b.localeCompare(a)),
    totalCount: Number(pagination?.total) || financialYears.reduce(
      (sum, item) => sum + item.results.length,
      0
    ),
  };
}
