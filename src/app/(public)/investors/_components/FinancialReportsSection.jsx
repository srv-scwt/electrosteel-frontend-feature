"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import Link from "next/link";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import { getFinancialYearOptions } from "@/utils/dropdownOption";

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
}) {
  const financialYears = data?.financialYears || [];
  const financialsOption = yearFieldDropdown
    ? getFinancialYearOptions(yearData)
    : [];

  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.year)
    ? searchParams.year[0]
    : searchParams?.year;
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
    showYearDropdown && activeYear && activeYear !== "all"
      ? activeYear.replace("FY ", "FY <span>") + "</span>"
      : titleYearExceptional;
  const showArchiveLink = latestFeild && archieveLink;
  const showControls = showYearDropdown || showArchiveLink;
  const showGroupedSections =
    sectionTitle &&
    !latestFeild &&
    financialYears.some((item) => item?.heading);

  const handleYearChange = (option) => {
    appendQueryParam("year", option?.value);
  };

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
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {showTitle && (
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
            {headingField ? (<h2 className="whitespace-nowrap">{heading}</h2>
            ) : (
            <HTMLRender
              htmlString={`<h2 class="whitespace-nowrap">${titleYear}</h2>`}
            />
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
            {financialYears.map((section, sectionIndex) => {
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
          renderInvestorCards(Array.isArray(filteredData) ? filteredData : [])
        )}
      </div>
    </section>
  );
}
