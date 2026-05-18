"use client";

import React from "react";
import Image from "next/image";
import { OutlineButtonLink } from "@/components/ui/Button";
import styles from "@/app/common.module.css";
import DropdownSelect from "@/components/common/dropdown";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for Board Approved Files
const boardDetails = [
  {
    year: "FY 2024-25",
    results: [
      {
        title: "CSR Projects 2024-25",
        src: "/fileLinks/financial-results-june-2025.pdf",
        date: "",
      },
    ],
  },
];

export default function BoardApproved() {
  return (
    <>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          {boardDetails.map((item, index) => (
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

                <div className="flex items-stretch  sm:items-center justify-center gap-4 max-[520px]:flex-col">
                  <p>Find CSR Projects</p>
                  <DropdownSelect />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-2">
                {item.results.map((fileItem, idx) => (
                  <InvestorCard
                    key={idx}
                    post={{
                      title: fileItem.title,
                      pdf: fileItem.src,
                      date: "",
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
