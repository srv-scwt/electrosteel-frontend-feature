"use client"
import Image from "next/image";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import Link from "next/link";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import { getFinancialYearOptions } from "@/utils/dropdownOption";

export default function FinancialResultSection({ data, yearData, searchParams }) {
  const financialYears = data?.financialYears || [];
  const financialsOption = getFinancialYearOptions(yearData);

  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.year) ? searchParams.year[0] : searchParams?.year;
  const selectedYear = selectedYearParam || financialsOption?.[0]?.value;
  const selectedOption =
    financialsOption.find((item) => item.value === selectedYear) ||
    financialsOption?.[0] ||
    null;
  const activeYear = selectedOption?.value;
  const filteredData =
    activeYear === "all"
      ? financialYears.flatMap((item) => item.results || [])
      : financialYears.find((item) => item.year === activeYear)?.results || [];
  const titleYear =
    activeYear && activeYear !== "all"
      ? activeYear.replace("FY ", "FY <span>") + "</span>"
      : "Financial <span>Results</span>";

  const handleYearChange = (option) => {
    appendQueryParam("year", option?.value);
  };

  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-8 lg:mb-10 gap-4">
          <HTMLRender
            htmlString={`<h2 class="whitespace-nowrap">${titleYear}</h2>`}
          />

          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-start sm:items-center gap-3 lg:gap-5 w-full lg:w-auto">
            <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
              Find Quarterly Results
            </span>

            <div className="w-full sm:w-[220px] lg:w-[200px]">
              <DropdownSelect
                options={financialsOption}
                value={selectedOption}
                onChange={handleYearChange}
              />
            </div>

            <Link
              href="/investors/financials/quarterly-results/archive"
              className="btn-outline-view-archive py-2.5 sm:py-3 text-primaryBlue hover:underline flex items-center gap-2 sm:gap-3 whitespace-nowrap"
            >
              <Image
                src="/images/icons/pdf.png"
                alt="pdf"
                width={30}
                height={30}
                className="object-contain"
              />
              <span>View Archive</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {Array.isArray(filteredData) && filteredData?.map((item, index) => (
            <InvestorCard
              key={item?.id || index}
              post={{
                ...item,
                src: item?.src?.replaceAll("\\", "/"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
