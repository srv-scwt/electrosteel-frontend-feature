"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for Compliance Report
const complianceDetails = {
  title1: "Compliance Report",

  sections: [
    {
      title2: "Share Holding Pattern",
      results: [
        {
          year: "2021-2022",
          items: [
            {
              title: "Shareholding - Pattern - 30-09-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
            {
              title: "Shareholding - Pattern - 30-06-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
          ],
        },
        {
          year: "2020-2021",
          items: [
            {
              title: "Shareholding - Pattern - 31-03-21",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Shareholding - Pattern - 31-12-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Shareholding - Pattern - 30-09-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Shareholding - Pattern - 30-06-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
          ],
        },
        {
          year: "2019-2020",
          items: [
            {
              title: "Shareholding - Pattern - 31-03-20",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "Shareholding - Pattern - 31-12-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "Shareholding - Pattern - 30-09-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "Shareholding - Pattern - 30-06-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
          ],
        },
        {
          year: "2018-2019",
          items: [
            {
              title: "Shareholding - Pattern - 31-03-19",
              src: "/files/business-guidelines.pdf",
              date: "2018",
            },
            {
              title: "Shareholding - Pattern - 31-12-18",
              src: "/files/business-guidelines.pdf",
              date: "2018",
            },
            {
              title: "Shareholding - Pattern - 30-09-18",
              src: "/files/business-guidelines.pdf",
              date: "2018",
            },
          ],
        },
        {
          year: "2017-2018",
          items: [
            {
              title: "Oct-Dec",
              src: "/files/business-guidelines.pdf",
              date: "2017",
            },
            {
              title: "July-Sep",
              src: "/files/business-guidelines.pdf",
              date: "2017",
            },
            {
              title: "April-June",
              src: "/files/business-guidelines.pdf",
              date: "2017",
            },
            {
              title: "Jan-Mar",
              src: "/files/business-guidelines.pdf",
              date: "2017",
            },
          ],
        },
      ],
    },

    {
      title2: "Corporate Governance",
      results: [
        {
          year: "2021-2022",
          items: [
            {
              title: "CG Report 09-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
            {
              title: "CG Report 06-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
          ],
        },
        {
          year: "2020-2021",
          items: [
            {
              title: "CG Report 12-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "CG Report 09-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "CG Report 06-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "CG Report 03-21",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
          ],
        },
        {
          year: "2019-2020",
          items: [
            {
              title: "CG Report 03-20",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "CG Report 12-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "CG Report 09-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
            {
              title: "CG Report 06-19",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
          ],
        },
      ],
    },

    {
      title2: "Annual Return",
      results: [
        {
          year: "",
          items: [
            {
              title: "Annual - Return - 2019-20",
              src: "/files/business-guidelines.pdf",
              date: "2019",
            },
          ],
        },
      ],
    },

    {
      title2: "Financial Results",
      results: [
        {
          year: "2021-2022",
          items: [
            {
              title: "Results - 09-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
            {
              title: "Results - 06-21",
              src: "/files/business-guidelines.pdf",
              date: "2021",
            },
          ],
        },
        {
          year: "2020-2021",
          items: [
            {
              title: "Results - 12-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Results - 09-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Results - 06-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
            {
              title: "Results - 03-20",
              src: "/files/business-guidelines.pdf",
              date: "2020",
            },
          ],
        },
      ],
    },
  ],
};

export default function ComplianceReport() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {complianceDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* SECTION BLOCKS (single map) */}
        {complianceDetails.sections.map((section, index) => (
          <div key={index}>
            <h4 className="text-2xl my-4 !mt-10 mt-8">
              <span>{section.title2}</span>
            </h4>
            {section.results.map((yearItem, idx) => (
              <div key={idx}>
                <h4 className="text-xl my-4">{yearItem.year}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
                  {yearItem.items.map((fileItem, fileIdx) => (
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
        ))}
      </div>
    </div>
  );
}
