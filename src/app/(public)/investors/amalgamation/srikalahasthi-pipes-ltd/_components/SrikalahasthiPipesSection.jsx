"use client";

import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import Pagination from "@/components/common/pagination";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import { useRef } from "react";

function groupSectionsBySectionTitle(sections) {
  const groupedSections = [];
  const sectionTitleMap = new Map();

  for (const section of sections) {
    const sectionTitle = section?.sectionTitle?.trim() || "";
    const sectionTitleKey = sectionTitle || "__no_section_title__";

    if (!sectionTitleMap.has(sectionTitleKey)) {
      const nextGroup = {
        sectionTitle,
        headings: [],
      };

      sectionTitleMap.set(sectionTitleKey, nextGroup);
      groupedSections.push(nextGroup);
    }

    const currentSectionGroup = sectionTitleMap.get(sectionTitleKey);
    const heading = section?.heading?.trim() || "";
    const headingKey = heading || "__untitled__";
    let currentHeadingGroup = currentSectionGroup.headings.find(
      (headingGroup) => (headingGroup.heading || "__untitled__") === headingKey
    );

    if (!currentHeadingGroup) {
      currentHeadingGroup = {
        heading,
        years: [],
      };
      currentSectionGroup.headings.push(currentHeadingGroup);
    }

    const year = section?.year?.trim() || "";
    const yearKey = year || "__no_year__";
    const existingYearBlock = currentHeadingGroup.years.find(
      (yearBlock) => (yearBlock.year || "__no_year__") === yearKey
    );

    if (existingYearBlock) {
      existingYearBlock.results.push(...section.results);
      continue;
    }

    currentHeadingGroup.years.push({
      year,
      results: [...section.results],
    });
  }

  return groupedSections;
}

/**
 * Keeps the sectionTitle -> heading -> year nesting intact while showing only
 * the documents that fall in [start, end) of the flattened render order. Used
 * when the endpoint returns everything at once instead of a page at a time.
 */
function sliceGroupedTree(sectionGroups, start, end) {
  let seen = 0;

  return sectionGroups
    .map((sectionGroup) => {
      const headings = sectionGroup.headings
        .map((headingGroup) => {
          const years = headingGroup.years
            .map((yearBlock) => {
              const blockStart = seen;
              seen += yearBlock.results.length;

              const from = Math.max(start - blockStart, 0);
              const to = Math.min(end - blockStart, yearBlock.results.length);

              return from >= to
                ? null
                : { ...yearBlock, results: yearBlock.results.slice(from, to) };
            })
            .filter(Boolean);

          return years.length ? { ...headingGroup, years } : null;
        })
        .filter(Boolean);

      return headings.length ? { ...sectionGroup, headings } : null;
    })
    .filter(Boolean);
}

export default function SrikalahasthiPipesSection({
  data,
  searchParams,
  showYearField = true,
  paginate = false,
  currentPage = 1,
  limit = 12,
  totalCount,
}) {
  const sectionRef = useRef(null);
  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.year)
    ? searchParams.year[0]
    : searchParams?.year;
  const activeYear =
    selectedYearParam && selectedYearParam !== "all"
      ? selectedYearParam
      : "all";
  const normalizedSections = (data?.financialYears || [])
    .map((section) => ({
      year: section?.year?.toString().trim() || "",
      heading: section?.heading?.toString().trim() || "",
      sectionTitle: section?.section_title?.toString().trim() || "",
      results: (section?.results || []).map((item) => ({
        ...item,
        src: item?.src?.replaceAll("\\", "/"),
      })),
    }))
    .filter((section) => section.results.length > 0);
  const filteredSections =
    activeYear === "all"
      ? normalizedSections
      : normalizedSections.filter((section) => section.year === activeYear);
  const groupedSections = groupSectionsBySectionTitle(filteredSections).slice().reverse();

  // The API pages these results, so the grouping below just renders whatever
  // the current page contained; totalCount tells us how many pages exist.
  const pageSize = Number(limit) > 0 ? Number(limit) : 12;
  const visibleCount = filteredSections.reduce(
    (sum, section) => sum + section.results.length,
    0
  );
  // When the endpoint pages for us the response already holds one page; when
  // it returns everything (srikalsti-main/all), slice here instead.
  const sliceLocally = paginate && visibleCount > pageSize;
  const totalItems = sliceLocally
    ? visibleCount
    : Number(totalCount) > 0
      ? Number(totalCount)
      : visibleCount;
  const totalPages = paginate
    ? Math.max(1, Math.ceil(totalItems / pageSize))
    : 1;
  const activePage = Math.min(Math.max(Number(currentPage) || 1, 1), totalPages);
  const pagedGroups = sliceLocally
    ? sliceGroupedTree(
        groupedSections,
        (activePage - 1) * pageSize,
        (activePage - 1) * pageSize + pageSize
      )
    : groupedSections;

  const handlePageChange = (nextPage) => {
    appendQueryParam("page", nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderInvestorCards = (results = []) => (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {results.map((item, index) => (
        <InvestorCard key={item?.id || index} post={item} />
      ))}
    </div>
  );

  return (
    <section ref={sectionRef} className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {pagedGroups.length ? (
          <div className="space-y-10">
            {pagedGroups.map((sectionGroup, sectionGroupIndex) => (
              <div
                key={sectionGroup.sectionTitle || `section-${sectionGroupIndex}`}
                className={`space-y-8 ${styles.sectionContent}`}
              >
                {sectionGroup.sectionTitle && (
                  <h3 >
                    <span>{sectionGroup.sectionTitle}</span>
                  </h3>
                )}

                <div className="space-y-10">
                  {sectionGroup.headings.map((headingGroup, headingIndex) => {
                    return (
                      <div
                        key={
                          headingGroup.heading ||
                          `${sectionGroup.sectionTitle || "section"
                          }-${headingIndex}`
                        }
                        className="space-y-6"
                      >
                        {headingGroup.heading && (
                          <h4 >
                            <span>{headingGroup.heading}</span>
                          </h4>
                        )}

                        <div className="space-y-8">
                          {headingGroup.years.map((yearBlock, yearIndex) => (
                            <div
                              key={
                                yearBlock.year ||
                                `${headingGroup.heading || "year"}-${yearIndex}`
                              }
                              className="space-y-5"
                            >
                              {showYearField && yearBlock.year && (
                                <h4>
                                  <span>{yearBlock.year}</span>
                                </h4>
                              )}

                              {renderInvestorCards(yearBlock.results)}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base text-[#545454]">No documents available.</p>
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
