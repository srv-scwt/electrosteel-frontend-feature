

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

export default function Page() {
  const data = {
    codeofconducts: {
      title: "Code Of Conduct",
      items: [
        {
          results: [
            {
              title: "Code of Conduct for Directors and Senior Management",
              src: "/files/business-guidelines.pdf",
              date: "6th April 2026",
            },
            {
              title: "Code of Conduct - SEBI PIT Regulations",
              src: "/files/code-of-ethics.pdf",
              date: "6th April 2026",
            },
          ],
        },
      ],
    },

    polices: [
      {
        results: [
          {
            title: "Business Responsibility Policy",
            src: "/files/hr-policy-2024.pdf",
            date: "6th April 2026",
          },
          {
            title: "Environment Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Social Accountability Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Policy for determining Material Subsidiaries",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Nomination and Remuneration Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Corporate Social Responsibility Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Familiarization Programme for the Independent Directors",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Dividend Distribution Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Electrosteel Sustainable Procurement Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Risk Management Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Compensatory Off Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Quality Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Occupational Health & Safety Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Energy Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Related Party Transaction Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Vigil Mechanism/Whistle Blower Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title:
              "Policy for determination of Materiality of Events/Information for disclosures",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Policy for Preservation of Documents and Archival",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Electrosteel AntiCompetition Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Electrosteel Antibribery Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Non-Discrimination Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
          {
            title: "Grievance Handling Policy",
            src: "/files/operational-policy.pdf",
            date: "6th April 2026",
          },
        ],
      },
    ],
  };

  // mapping for InvestorCard
  const codeOfConductCards =
    data?.codeofconducts?.items?.flatMap((item) =>
      item.results.map((fileItem) => ({
        title: fileItem.title,
        pdf: fileItem.src,
        date: fileItem.date,
      })),
    ) || [];

  const policyCards =
    data?.polices?.flatMap((item) =>
      item.results.map((fileItem) => ({
        title: fileItem.title,
        pdf: fileItem.src,
        date: fileItem.date,
      })),
    ) || [];

  return (
    <div className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {/* CODE OF CONDUCT */}
        <section className="mb-14">
          <div className="mb-6">
            <h2>
              {data?.codeofconducts?.title.split(" ").map((word, index) => {
                if (index === 0) return word;
                return <span key={index}> {word}</span>;
              })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 ">
            {codeOfConductCards.map((post, index) => (
              <InvestorCard key={index} post={post} />
            ))}
          </div>
        </section>

        {/* POLICIES */}
        <section>
          <div className="mb-6">
            <h2>
              {"Policies".split(" ").map((word, index) => {
                if (index === 0) return word;
                return <span key={index}> {word}</span>;
              })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-6">
            {policyCards.map((post, index) => (
              <InvestorCard key={index} post={post} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
