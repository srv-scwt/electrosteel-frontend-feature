"use client";

import styles from "@/app/common.module.css";
import Image from "next/image";
import Link from "next/link";
import { FiDownload } from "react-icons/fi";
import commonStyles from "./style.module.css";
import useAppendQueryParam from "@/hooks/useAppendQueryParam";
import Pagination from "@/components/common/pagination";
import DropdownSelect from "@/components/common/dropdown";
import { useRef } from "react";
import {
  getNewsletterYear,
  getNewsletterYearOptions,
} from "@/utils/dropdownOption";
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

const PAGE_SIZE = 12;

const NewslettersListingSection = ({ data, searchParams }) => {
  const sectionRef = useRef(null);
  const financialYears = data?.financialYears || [];
  const financialsOption = getNewsletterYearOptions(data);
  const appendQueryParam = useAppendQueryParam();
  const selectedYearParam = Array.isArray(searchParams?.year)
    ? searchParams.year[0]
    : searchParams?.year;
  const isKnownYear = financialsOption.some(
    (option) => option.value === selectedYearParam
  );
  const activeYear = isKnownYear ? selectedYearParam : "all";
  const selectedOption =
    financialsOption.find((option) => option.value === activeYear) ||
    financialsOption[0] ||
    null;
  const allResults = financialYears.flatMap((item) => item?.results || []);
  const filteredNewsletters =
    activeYear === "all"
      ? allResults
      : allResults.filter(
          (item) => `FY ${getNewsletterYear(item)}` === activeYear
        );

  // The API pages by financial year, which does not line up with the calendar
  // years shown here, so the filtered list is paged locally instead.
  const rawPage = Array.isArray(searchParams?.page)
    ? searchParams.page[0]
    : searchParams?.page;
  const requestedPage =
    Number(rawPage) > 0 ? Math.floor(Number(rawPage)) : 1;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredNewsletters.length / PAGE_SIZE)
  );
  const activePage = Math.min(requestedPage, totalPages);
  const newsletters = filteredNewsletters.slice(
    (activePage - 1) * PAGE_SIZE,
    activePage * PAGE_SIZE
  );

  const titleYear = activeYear === "all" ? "All" : activeYear;

  const handleYearChange = (option) => {
    // Drop the page too: page 4 of the old filter rarely exists in the new one.
    appendQueryParam({ year: option?.value, page: null });
  };

  const handlePageChange = (nextPage) => {
    appendQueryParam("page", nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section ref={sectionRef}>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="flex items-center gap-4 justify-between mb-5 flex-wrap sm:flex-nowrap">
            <h2 className="!mb-0">
              Year - <span>{titleYear}</span>
            </h2>
            <div className="flex flex-wrap fontF-secondary sm:flex-nowrap items-center gap-4 w-full sm:w-auto">
              <label className="whitespace-nowrap">Find Newsletters</label>
              <div className="w-full sm:w-[220px]">
                <DropdownSelect
                  options={financialsOption}
                  value={selectedOption}
                  onChange={handleYearChange}
                />
              </div>
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

          <Pagination
            currentPage={activePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
};

export default NewslettersListingSection;
