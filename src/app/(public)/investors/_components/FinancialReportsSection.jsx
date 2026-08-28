"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import Link from "next/link";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import Pagination from "@/components/common/pagination";
import { getFinancialYearOptions } from "@/utils/dropdownOption";
import { useRef } from "react";

/**
 * Keeps the year grouping intact while showing only the results that fall in
 * [start, end) of the flattened list.
 */
function sliceGroupedSections(sections, start, end) {
  let seen = 0;

  return sections
    .map((section) => {
      const results = Array.isArray(section?.results) ? section.results : [];
      const sectionStart = seen;
      seen += results.length;

      const from = Math.max(start - sectionStart, 0);
      const to = Math.min(end - sectionStart, results.length);

      return from >= to ? null : { ...section, results: results.slice(from, to) };
    })
    .filter(Boolean);
}

export default function FinancialReportsSection({
  data,
  yearData,
  searchParams,
  filterTitle = "Find Quarterly Results",
  archieveLink,
  archieveLabel = "View Archive",
  titleYearExceptional = "Financial <span>Results</span>",
  heading,
  yearFieldDropdown = false,
  headingField = false,
  latestFeild = false,
  showTitle = true,
  sectionTitle = false,
  yearQueryKey = "year",
  titleFollowsYear = true,
  containerClassName = styles.containerLg,
  subHeading = "",
  headingLink = null,
  paginate = false,
  currentPage = 1,
  limit = 12,
  totalCount,
}) {
  const sectionRef = useRef(null);
  const financialYears = data?.financialYears || [];
  const financialsOption = yearFieldDropdown
    ? getFinancialYearOptions(yearData)
    : [];

  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.[yearQueryKey])
    ? searchParams[yearQueryKey][0]
    : searchParams?.[yearQueryKey];
  const selectedYear = selectedYearParam || financialsOption?.[0]?.value;
  const selectedOption =
    financialsOption.find((item) => item.value === selectedYear) ||
    financialsOption?.[0] ||
    null;
  const activeYear = selectedOption?.value;
  const allResults = financialYears.flatMap((item) => item?.results || []);
  const showYearDropdown = yearFieldDropdown && financialsOption.length > 1;
  const filteredData = showYearDropdown
    ? activeYear === "all"
      ? allResults
      : financialYears.find((item) => item.year === activeYear)?.results || []
    : allResults;
  const titleYear =
    titleFollowsYear && showYearDropdown && activeYear && activeYear !== "all"
      ? activeYear.replace("FY ", "FY <span>") + "</span>"
      : titleYearExceptional;
  const showArchiveLink = latestFeild && archieveLink;
  const showControls = showYearDropdown || showArchiveLink;
  const showGroupedSections =
    sectionTitle &&
    !latestFeild &&
    financialYears.some((item) => item?.heading);

  // The API is meant to page the results itself. Until it does, it returns
  // everything, so fall back to slicing here -- detected by getting back more
  // rows than we asked for. Both paths agree once the API starts paging.
  const pageSize = Number(limit) > 0 ? Number(limit) : 12;
  const visibleCount = showGroupedSections
    ? financialYears.reduce(
        (sum, item) => sum + (item?.results?.length || 0),
        0
      )
    : filteredData.length;
  const sliceLocally = paginate && visibleCount > pageSize;
  const totalItems = sliceLocally
    ? visibleCount
    : Number(totalCount) > 0
      ? Number(totalCount)
      : visibleCount;
  const totalPages = paginate ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;
  const activePage = Math.min(Math.max(Number(currentPage) || 1, 1), totalPages);
  const sliceStart = (activePage - 1) * pageSize;
  const sliceEnd = sliceStart + pageSize;

  const pagedData = sliceLocally
    ? filteredData.slice(sliceStart, sliceEnd)
    : filteredData;
  const pagedSections = sliceLocally
    ? sliceGroupedSections(financialYears, sliceStart, sliceEnd)
    : financialYears;

  const handleYearChange = (option) => {
    // Reset to the first page: page 4 of the old filter rarely exists in the new one.
    appendQueryParam({ [yearQueryKey]: option?.value, page: null });
  };

  const handlePageChange = (nextPage) => {
    appendQueryParam("page", nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderHeading = () =>
    headingField ? (
      <h2 className="whitespace-nowrap">{heading}</h2>
    ) : (
      <HTMLRender
        htmlString={`<h2 class="whitespace-nowrap">${titleYear}</h2>`}
      />
    );

  const renderInvestorCards = (results = []) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
      {results.map((item, index) => (
        <InvestorCard
          key={item?.id || index}
          post={{
            ...item,
            src: item?.src?.replaceAll("\\", "/"),
          }}
        />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className={containerClassName}>
      <div className={styles.sectionContent}>
        {showTitle && (
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            {subHeading || headingLink?.href ? (
              <div>
                {renderHeading()}

                {headingLink?.href && (
                  <Link
                    href={headingLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit max-w-full flex gap-3 items-center bg-white border border-gray-200 rounded-md p-4 mb-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="relative w-[30px] h-[30px] flex-shrink-0">
                      <Image
                        src="/images/icons/pdf.png"
                        alt="pdf icon"
                        fill
                        className="object-contain"
                      />
                    </span>
                    <p className="text-[#545454] hover:text-[#00418e] transition-colors duration-200">
                      {headingLink.label}
                    </p>
                  </Link>
                )}

                {subHeading && <p className="!font-bold">{subHeading}</p>}
              </div>
            ) : (
              renderHeading()
            )}


          {showControls && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center gap-3 lg:gap-5 w-full lg:w-auto">
              {showYearDropdown && (
                <>
                  <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
                    {filterTitle}
                  </span>

                  <div className="w-full sm:w-[220px] lg:w-[200px]">
                    <DropdownSelect
                      options={financialsOption}
                      value={selectedOption}
                      onChange={handleYearChange}
                    />
                  </div>
                </>
              )}

              {showArchiveLink && (
                <Link
                  href={archieveLink}
                  className="btn-outline-view-archive py-2.5 sm:py-3 text-primaryBlue hover:underline flex items-center gap-2 sm:gap-3 whitespace-nowrap"
                >
                  <Image
                    src="/images/icons/pdf.png"
                    alt="pdf"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <span>{archieveLabel}</span>
                </Link>
              )}
            </div>
          )}
        </div>
                )}

        {showGroupedSections ? (
          <div className="space-y-10">
            {pagedSections.map((section, sectionIndex) => {
              const sectionResults = Array.isArray(section?.results)
                ? section.results
                : [];

              if (!sectionResults.length) return null;

              return (
                <div key={section?.year || section?.heading || sectionIndex}>
                  {sectionTitle && section?.heading && (
                    <h3 className="mb-5 text-2xl font-bold text-primaryBlue">
                      {section.heading}
                    </h3>
                  )}

                  {renderInvestorCards(sectionResults)}
                </div>
              );
            })}
          </div>
        ) : (
          renderInvestorCards(Array.isArray(pagedData) ? pagedData : [])
        )}

        {paginate && (
          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
