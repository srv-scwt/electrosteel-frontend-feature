"use client";

import styles from "@/app/common.module.css";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import commonStyles from "./style.module.css";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import { getFinancialYearOptions } from "@/utils/dropdownOption";
import { createImageSourceURL } from "@/utils";

const DEFAULT_NEWSLETTER_IMAGE = "/images/newsletters/newLetterseptember.jpg";

function resolveAssetUrl(path, fallback = "") {
  const normalizedPath = path?.replaceAll("\\", "/") || "";

  if (!normalizedPath) {
    return fallback;
  }

  if (
    normalizedPath.startsWith("/") ||
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://") ||
    normalizedPath.startsWith("data:")
  ) {
    return normalizedPath;
  }

  return createImageSourceURL(normalizedPath, fallback);
}

const NewslettersListingSection = ({ data, yearData, searchParams }) => {

  const financialYears = data?.financialYears || [];
  const financialsOption = getFinancialYearOptions(yearData);
  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.year)
    ? searchParams.year[0]
    : searchParams?.year;
  const activeYear = selectedYearParam || financialsOption?.[0]?.value || "all";
  const allResults = financialYears.flatMap((item) => item?.results || []);
  const newsletters =
    activeYear === "all"
      ? allResults
      : financialYears.find((item) => String(item?.year) === activeYear)
          ?.results || [];

  const titleYear = activeYear === "all" ? "All" : activeYear;

  const handleYearChange = (event) => {
    appendQueryParam("year", event.target.value);
  };

  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="flex items-center gap-4 justify-between mb-5 flex-wrap sm:flex-nowrap">
            <h2 className="!mb-0">
              Year - <span>{titleYear}</span>
            </h2>
            <div className="flex flex-wrap fontF-secondary sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
              <label className="whitespace-nowrap">Find Newsletters</label>
              <select
                value={activeYear}
                onChange={handleYearChange}
                className="border border-gray-300 p-3 rounded-md focus:outline-none w-full sm:w-auto text-[#545454]"
              >
                {financialsOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {newsletters.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8 lg:gap-12 items-start">
              {newsletters.map((item, index) => {
                const title = item?.title || item?.fileName || "Newsletter";
                const pdfLink = resolveAssetUrl(
                  item?.src || item?.pdf || item?.filelink,
                  "#"
                );
                const imageSrc = resolveAssetUrl(
                  item?.image,
                  DEFAULT_NEWSLETTER_IMAGE
                );

                return (
                  <div
                    key={item?.id || item?.src || item?.filelink || index}
                    className={`${commonStyles.newsLetterCardWrapper} shadow-md`}
                  >
                    <Link
                      href={pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block aspect-square w-full overflow-hidden rounded-[12px] mb-3"
                    >
                      <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    <Link href={pdfLink} target="_blank" rel="noopener noreferrer">
                      <p className="mb-3 !text-[#545454] hover:!text-[#004aa1] transition ease-in-out">
                        {title}
                      </p>
                    </Link>

                    <Link
                      href={pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-text"
                    >
                      <span>Download</span>
                      <FiDownload size={20} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-[#545454]">No newsletters available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewslettersListingSection;
