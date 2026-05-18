"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for AGM/EGM
const AgmEgmDetails = {
  title1: "AGM /EGM",

  sections: [
    {
      title2: "Chairmans Speech",
      results: [
        {
          title: "Chairman Speech - AGM-Shareholders-29 08 16",
          src: "/files/business-guidelines.pdf",
          date: "2016",
        },
        {
          title: "Chairman speech 2018",
          src: "/files/code-of-ethics.pdf",
          date: "2018",
        },
        {
          title: "Chairman speech 2019",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "Chairman speech 2020",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
      ],
    },

    {
      title2: "Notices",
      results: [
        {
          title: "AGMNotice",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
        {
          title: "AGMNotice-2018",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "AGMNotice-2019",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "AGMNotice-2020",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "AGMNotice-2021",
          src: "/files/operational-policy.pdf",
          date: "2021",
        },
      ],
    },

    {
      title2: "SCRUTINIZERS REPORT",
      results: [
        {
          title: "Scrutinizer Report",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
        {
          title: "ScrutinizerReport-2018",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "ScrutinizerReport-2019",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
      ],
    },

    {
      title2: "Voting Results",
      results: [
        {
          title: "VotingResults",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
        {
          title: "VotingResults-2018",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "VotingResults-2019",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "VotingResults-2020",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
      ],
    },
  ],
};

export default function AgmEgm() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {AgmEgmDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* RENDER ALL SECTIONS (ONLY ONE MAP!) */}
        {AgmEgmDetails.sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-2xl my-4 lg:!mt-10 mt-8">
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
