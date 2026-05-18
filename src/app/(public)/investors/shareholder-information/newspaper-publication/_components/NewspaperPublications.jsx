
import React from "react";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

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

const FileData = [
  {
    title: "FY 2025 - 26",
    items: [
      {
        title: "Completion of despatch of Postal Ballot Notice - 14 March 2026",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Financial Results - 31.12.2025",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Financial Results - 30.09.2025",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
      {
        title:
          "Completion of despatch of Postal Ballot Notice - 18 October 2025",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Completion of despatch of AGM Notice - 04 August 2025",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Financial Results - 30.06.2025",
        src: "/files/shareholding/june-2025.pdf",
        date: "30th June 2025",
      },
    ],
  },
];

const NewspaperPublications = () => {
  const current = FileData?.[0] || {};
  const results = current?.items || [];

  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <HTMLRender
            htmlString={`<h2 class="!w-full md:!w-[30%] whitespace-nowrap">FY<span> 2025 - 26</span></h2>`}
          />

          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-stretch sm:items-center gap-3 lg:gap-5 w-full lg:w-auto">
            <span className="text-gray-600 text-sm sm:text-base whitespace-nowrap">
              Find Newspaper Publications
            </span>

            <div className="w-full sm:w-[220px] lg:w-[200px]">
              <DropdownSelect options={years} value={years[1]} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {results.map((post, index) => (
            <InvestorCard
              key={index}
              post={{
                title: post.title,
                date: post.date,
                src: post?.src?.replaceAll("\\", "/"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewspaperPublications;