"use client";

import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

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

export default function SrikalahasthiPipesSection({
  data,
  searchParams,
  showYearField = true,
}) {
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
  const groupedSections = groupSectionsBySectionTitle(filteredSections);

  const renderInvestorCards = (results = []) => (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {results.map((item, index) => (
        <InvestorCard key={item?.id || index} post={item} />
      ))}
    </div>
  );

  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {groupedSections.length ? (
          <div className="space-y-10">
            {groupedSections.map((sectionGroup, sectionGroupIndex) => (
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
                          `${
                            sectionGroup.sectionTitle || "section"
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
      </div>
    </section>
  );
}
