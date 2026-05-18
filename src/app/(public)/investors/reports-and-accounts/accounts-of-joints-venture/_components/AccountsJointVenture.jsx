"use client";

import React from "react";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const financialYears = [
  {
    year: "FY 2025 - 26",
    results: [
      {
        title: "North Dhadhu Mining Company Pvt Ltd.",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "1th April 2026",
      },
    ],
  },
];

const years = [
  { value: "all", label: "All" },
  { value: "FY 2025 - 26", label: "FY 2025-26" },
  { value: "FY 2024 - 25", label: "FY 2024-25" },
  { value: "FY 2023 - 24", label: "FY 2023-24" },
  { value: "FY 2022 - 23", label: "FY 2022-23" },
  { value: "FY 2021 - 22", label: "FY 2021-22" },
  { value: "FY 2020 - 21", label: "FY 2020-21" },
  { value: "FY 2019 - 20", label: "FY 2019-20" },
];

export default function AccountsJointVenture() {
  const current = financialYears?.[0] || {};
  const results = current?.results || [];

  // const titleHTML = current?.year
  //   ? current.year
  //   : "FY <span>2025 - 26</span>";

  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-4">
          {/* <HTMLRender
            htmlString={`<h2 class="!w-full md:!w-[30%] whitespace-nowrap"><span>${titleHTML}</span></h2>`}
          /> */}
          <HTMLRender
          htmlString={`<h2 class="whitespace-nowrap">FY <span> 2025 - 26</span></h2>`}
            />

          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-3 lg:gap-5 w-full lg:w-auto">
            <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
              Find Accounts of Joint Venture
            </span>

            <div className="w-full sm:w-[220px] lg:w-[200px]">
              <DropdownSelect options={years} value={years[1]} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-[26px]">
          {results.map((item, index) => (
            <InvestorCard
              key={index}
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