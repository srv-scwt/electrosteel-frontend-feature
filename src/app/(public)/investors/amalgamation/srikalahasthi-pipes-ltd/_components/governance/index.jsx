"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import { SectionBlock } from "../selectBlockCom";

// Data for Governance Page
const governanceDetails = {
  title1: "Governance",

  sections: [
    {
      title2: "Policies",
      results: [
        {
          title: "Annexure - 2 - QMS Policy",
          src: "/files/business-guidelines.pdf",
          date: "2022",
        },
        {
          title: "Annexure - 3 - EMS Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Annexure - 4 - OHS Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Annexure - 5 - Energy Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Criteria Ned",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "CSR Policy.SPL",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Fair Disclosure",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Familiarisation Policy For Directors",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Nomination and Remuneration Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Related Party Transaction Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "SPL Policy For Preservation Of Documents",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
        {
          title: "Whistle Blower Policy",
          src: "/files/code-of-ethics.pdf",
          date: "2022",
        },
      ],
    },

    {
      title2: "Notices",
      results: [
        {
          title: "BM Notice. Stock Exchange",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
        {
          title: "BM intimation",
          src: "/files/operational-policy.pdf",
          date: "2024",
        },
        {
          title: "BM Notice-May-20",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "BM Notice-Jan-20",
          src: "/files/operational-policy.pdf",
          date: "2020",
        },
        {
          title: "BM Notice-Oct-19",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "BM Notice-Jul-19",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "BM Notice-Apr-19",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "BM Notice-Jan-19",
          src: "/files/operational-policy.pdf",
          date: "2019",
        },
        {
          title: "BM Notice-Oct-18",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "BM Notice-Jul-18",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "BM Intimation-Mar-18",
          src: "/files/operational-policy.pdf",
          date: "2018",
        },
        {
          title: "BM Notice 29-04-17",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "BM NoticeSE-Dec-17",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "BM Noticeto SE-Jun-17",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "BM Notice SE",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "BSE.BM Notice",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "NSEBM Notice",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
        {
          title: "SE Notice",
          src: "/files/operational-policy.pdf",
          date: "2017",
        },
      ],
    },
    {
      title2: "Investors Contact",
      results: [
        {
          title: "Investors details",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Familiarization Programme",
      results: [
        {
          title: "Familiarization Directors",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Directors Resignation",
      results: [
        {
          title: "Directors Resignation",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Commiitee",
      results: [
        {
          title: "Com of Committees",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Code of Conduct of Insiders",
      results: [
        {
          title: "Code of conduct insiders",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Code of Conduct",
      results: [
        {
          title: "Code of Directors",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
    {
      title2: "Appointment Letter",
      results: [
        {
          title: "Independent Director Appointment",
          src: "/files/hr-policy-2024.pdf",
          date: "2024",
        },
      ],
    },
  ],
};

// MAIN PAGE COMPONENT
export default function GovernancePage() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {governanceDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* RENDER ALL SECTIONS (ONLY ONE MAP!) */}
        {governanceDetails.sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-2xl my-4 !mt-10 mt-8">
              <span>{section.title2}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
              {section.results.map((fileItem, idx) => (
                <InvestorCard
                  key={idx}
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
