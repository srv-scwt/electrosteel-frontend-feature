"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for Amalgamation
const amalgamationDetails = {
  title1: "Amalgamation",

  sections: [
    {
      title2: "NCTL Meetings",
      results: [
        {
          title: "NCTL Meetings",
          src: "/files/business-guidelines.pdf",
          date: "2021",
        },
        {
          title: "nclt crsc 25jul,21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "nclt cruc 25jul,21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "Notice secured creditors 14may,21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "Notice shareholders 14may,21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "Notice unsecured creditors 14may,21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
      ],
    },

    {
      title2: "Regulation 37",
      results: [
        {
          title: "Audit committee report",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
        {
          title: "Auditor certificate",
          src: "/files/operational-policy.pdf",
          date: "2024",
        },
        {
          title: "Bse observation letter",
          src: "/files/operational-policy.pdf",
          date: "2024",
        },
        {
          title: "Complaint report",
          src: "/files/operational-policy.pdf",
          date: "2024",
        },
        {
          title: "Complaint report nse bse 18dec,20",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "Compliance report",
          src: "/files/operational-policy.pdf",
          date: "2024",
        },
        {
          title: "Documents to bse 27nov,20",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "Draft scheme",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "Lodr 24Nov,20",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "Nse observation letter",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "Regulation37 18nov,21",
          src: "/files/operational-policy.pdf",
          date: "2021",
        },
        {
          title: "Spl fairness opinion",
          src: "/files/operational-policy.pdf",
          date: "2021",
        },
        {
          title: "Valuation report",
          src: "/files/operational-policy.pdf",
          date: "2021",
        },
      ],
    },
  ],
};

export default function AmalgamationPage() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {amalgamationDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* RENDER ALL SECTIONS (ONLY ONE MAP!) */}
        {amalgamationDetails.sections.map((section, index) => (
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
