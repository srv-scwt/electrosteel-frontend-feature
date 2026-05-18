"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for Policies
const policiesDetails = {
  title1: "Policies",

  sections: [
    {
      title2: "Policies",
      results: [
        {
          title: "Fair Disclosure Policy SPL",
          src: "/files/business-guidelines.pdf",
          date: "2022",
        },
        {
          title: "Criteria of making payments to Non-Executive Directors",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Quality Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Environmental Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Occupational Health & Safety Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Energy Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
      ],
    },
  ],
};

export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {policiesDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* RENDER ALL SECTIONS (ONLY ONE MAP!) */}
        {policiesDetails.sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-2xl my-4 !mt-10 mt-8">
              <span>{section.title2}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
              {section.results.map((fileItem, fileIdx) => (
                <InvestorCard
                  key={fileIdx}
                  post={{
                    title: fileItem.title,
                    pdf: fileItem.src,
                    date: fileItem.date,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
