import React from "react";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const financialYears = [
  {
    year: "FY 2024 - 25",
    results: [
      {
        title: "Electrosteel USA LLC and subsidiary",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Europe S.A.",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Castings (UK) Ltd",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Trading S.A.",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Brasil Tubos e Conexoes Duteis",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Castings Gulf FZE",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Doha for Trading LLC",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Bahrain Holding W.L.L",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Electrosteel Algerie SPA",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
      },
      {
        title: "Singardo International Pte Ltd",
        src: "/filelinks/financial-results-june-2025.pdf",
        date: "6th April 2026",
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

const AccountsSubsidiaries = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {financialYears.map((item, index) => (
          <div key={index}>
            <div className="w-full flex flex-col md:flex-row gap-[16px] justify-between">
              <h2 className="w-full md:!w-[30%] text-left">
                {item.year.split(" ").map((word, index) => {
                  if (index === 0) {
                    return word;
                  }

                  return <span key={index}> {word}</span>;
                })}
              </h2>


              <div className="flex items-stretch sm:items-center justify-center gap-4 max-[520px]:flex-col">
                <p>Find Accounts of Subsidiaries</p>

                <DropdownSelect
                  options={years}
                  placeholder="Select Year"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-[26px]">
              {item.results.map((item, index) => (
                <InvestorCard key={index} post={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccountsSubsidiaries;