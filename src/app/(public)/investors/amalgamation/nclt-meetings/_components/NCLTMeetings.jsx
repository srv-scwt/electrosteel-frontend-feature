"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

const meetingData = [
  {
    title: "Declaration of Voting Results of the NCLT Convened Meetings",
    date: "6th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
  {
    title: "Details of Voting Results of the NCLT Convened Meetings",
    date: "6th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
  {
    title: "Scrutinizer Report of the NCLT Convened Meetings",
    date: "4th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
  {
    title: "Notice of Tribunal Convened Meeting of Unsecured Creditors",
    date: "6th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
  {
    title: "Notice of Tribunal Convened Meeting of Secured Creditors",
    date: "6th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
  {
    title: "Notice of Tribunal Convened Meeting of Equity Shareholders",
    date: "6th April 2026",
    src: "/fileLinks/financial-results-june-2025.pdf",
  },
];

export default function NCLTMeetings() {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {meetingData.map((post, index) => (
            <InvestorCard
              key={index}
              post={{
                ...post,
                src: post?.src?.replaceAll("\\", "/"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}