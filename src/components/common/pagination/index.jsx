"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Builds the list of pages to show, collapsing long runs into ellipses:
 * 1 … 4 5 [6] 7 8 … 20
 */
function buildPageList(currentPage, totalPages, siblings = 1) {
  const totalSlots = siblings * 2 + 5;

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const left = Math.max(currentPage - siblings, 1);
  const right = Math.min(currentPage + siblings, totalPages);
  const showLeftGap = left > 2;
  const showRightGap = right < totalPages - 1;

  const pages = [1];

  if (showLeftGap) pages.push("left-gap");

  for (let page = showLeftGap ? left : 2; page <= (showRightGap ? right : totalPages - 1); page += 1) {
    pages.push(page);
  }

  if (showRightGap) pages.push("right-gap");

  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  className = "",
}) {
  if (!Number.isFinite(totalPages) || totalPages <= 1) return null;

  const page = Math.min(Math.max(Number(currentPage) || 1, 1), totalPages);
  const pages = buildPageList(page, totalPages);

  const go = (next) => {
    if (next < 1 || next > totalPages || next === page) return;
    onPageChange?.(next);
  };

  const baseButton =
    "min-w-[40px] h-[40px] px-3 flex items-center justify-center rounded-md border text-sm transition-colors duration-200";

  return (
    <nav
      aria-label="Pagination"
      className={`flex flex-wrap items-center justify-center gap-2 mt-8 ${className}`}
    >
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={`${baseButton} gap-1 border-gray-300 text-[#545454] hover:border-[#004aa1] hover:text-[#004aa1] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-[#545454]`}
      >
        <FiChevronLeft size={18} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {pages.map((item) =>
        typeof item === "number" ? (
          <button
            key={item}
            type="button"
            onClick={() => go(item)}
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            className={
              item === page
                ? `${baseButton} border-[#004aa1] bg-[#004aa1] text-white font-semibold`
                : `${baseButton} border-gray-300 text-[#545454] hover:border-[#004aa1] hover:text-[#004aa1]`
            }
          >
            {item}
          </button>
        ) : (
          <span
            key={item}
            aria-hidden="true"
            className="min-w-[24px] h-[40px] flex items-end justify-center text-[#545454]"
          >
            &hellip;
          </span>
        )
      )}

      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={`${baseButton} gap-1 border-gray-300 text-[#545454] hover:border-[#004aa1] hover:text-[#004aa1] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:text-[#545454]`}
      >
        <span className="hidden sm:inline">Next</span>
        <FiChevronRight size={18} />
      </button>
    </nav>
  );
}
