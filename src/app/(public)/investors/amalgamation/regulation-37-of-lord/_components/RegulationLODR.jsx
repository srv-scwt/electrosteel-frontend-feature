"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

const regulationData = [
  {
    title: "Further Submission of Documents to Stock Exchanges",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Report on Complaints submitted to BSE",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "4th April 2026",
  },
  {
    title: "NSE Observation Letter",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "3rd April 2026",
  },
  {
    title: "BSE Observation Letter",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Report on Complaints submitted to NSE",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Auditors Certificate",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Detailed Compliance Report",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Draft Scheme of Amalgamation",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Fairness Opinion",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Report from Audit Committee",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
  {
    title: "Valuation Report",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "6th April 2026",
  },
];

export default function RegulationLODR() {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {regulationData.map((post, index) => (
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