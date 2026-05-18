"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

// Data for Shareholder Information
const PoshareholderInfoDetails = {
  title1: "Shareholder Information",

  sections: [
    {
      title2: "Credit Rating",
      results: [
        {
          title: "Credit-rating-feb20",
          src: "/files/business-guidelines.pdf",
          date: "2020",
        },
        {
          title: "Credit-ratings2019",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "Credit-ratings2018",
          src: "/files/code-of-ethics.pdf",
          date: "2018",
        },
      ],
    },
    {
      title2: "Investor Presentation",
      results: [
        {
          title: "presenttaion-q3-21",
          src: "/files/business-guidelines.pdf",
          date: "2021",
        },
        {
          title: "presenttaion-q3-21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "presenttaion-q3-21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "PhillipCap-SrikalahasthiPipes-May16-2018 -Final",
          src: "/files/business-guidelines.pdf",
          date: "2018",
        },
        {
          title: "investor-presentation-q4-2017-18",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "Investor presnt.17.5.17",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "ConcallPresentation",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "Analystspresentation",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "SEpresnt",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "spl-Investor Presentation-March1",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
      ],
    },
    {
      title2: "Newspaper Publication",
      results: [
        {
          title: "publication-26oct21",
          src: "/files/business-guidelines.pdf",
          date: "2021",
        },
        {
          title: "publication-27jul21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "publication-24apr21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "publication-21jan21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "publication-27oct20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-20jul20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-4jul20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-4feb20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-23jan20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-2jun20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "publication-1nov19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "publication-22oct19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "publication-10aug19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "publication-23jul19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "board-meeting-12jul19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "board-meeting-12jul19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "board-meeting-29apr19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
      ],
    },
    {
      title2: "Press Releases",
      results: [
        {
          title: "PressReleaseNov21",
          src: "/files/business-guidelines.pdf",
          date: "2021",
        },
        {
          title: "PressReleaseJun21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "PressReleaseMar21",
          src: "/files/code-of-ethics.pdf",
          date: "2021",
        },
        {
          title: "PressReleaseDec20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "pressReleaseSep20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "pressReleaseJul20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "pressReleaseMar20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "pressReleaseFeb20",
          src: "/files/code-of-ethics.pdf",
          date: "2020",
        },
        {
          title: "pressReleaseJul19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "pressReleaseMay19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "pressReleaseJan19",
          src: "/files/code-of-ethics.pdf",
          date: "2019",
        },
        {
          title: "pressReleaseSep18",
          src: "/files/code-of-ethics.pdf",
          date: "2018",
        },
        {
          title: "PressReleaseJun18",
          src: "/files/code-of-ethics.pdf",
          date: "2018",
        },
        {
          title: "pressreleaseApr18",
          src: "/files/code-of-ethics.pdf",
          date: "2018",
        },
        {
          title: "DEC'17 Results",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "Press Release Sep'17",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "Press Release.12.5.17",
          src: "/files/code-of-ethics.pdf",
          date: "2017",
        },
        {
          title: "Press Release Dec'16",
          src: "/files/code-of-ethics.pdf",
          date: "2016",
        },
        {
          title: "Press Release Sep'16",
          src: "/files/code-of-ethics.pdf",
          date: "2016",
        },
        {
          title: "Press Release.2.08.16",
          src: "/files/code-of-ethics.pdf",
          date: "2016",
        },
        {
          title: "Press Relese May'16",
          src: "/files/code-of-ethics.pdf",
          date: "2016",
        },
        {
          title: "press release 31 dec 15",
          src: "/files/code-of-ethics.pdf",
          date: "2015",
        },
        {
          title: "Press Release Oct'15",
          src: "/files/code-of-ethics.pdf",
          date: "2015",
        },
      ],
    },
    {
      title2: "QIP",
      results: [
        {
          title: "Project Atlantis_PD_26122017 v3 - With Disclaimer",
          src: "/files/business-guidelines.pdf",
          date: "2017",
        },
      ],
    },
    {
      title2: "Stock Exchange Disclosures",
      results: [
        {
          title: "bm-notice-sep21",
          src: "/files/bm-notice-sep21.pdf",
          date: "2021",
        },
        {
          title: "tcm-proceedings-july21",
          src: "/files/tcm-proceedings-july21.pdf",
          date: "2021",
        },
        {
          title: "shutdownInt-july21",
          src: "/files/shutdownInt-july21.pdf",
          date: "2021",
        },
        {
          title: "notice-24jul21",
          src: "/files/notice-24jul21.pdf",
          date: "2021",
        },
        {
          title: "book-closure-cutoffdate-jul21",
          src: "/files/book-closure-cutoffdate-jul21.pdf",
          date: "2021",
        },
        {
          title: "agm-noticeInt-jul21",
          src: "/files/agm-noticeInt-jul21.pdf",
          date: "2021",
        },
        {
          title: "notice20jan21",
          src: "/files/notice20jan21.pdf",
          date: "2021",
        },
        {
          title: "bookClosureRecordDate20-21",
          src: "/files/bookClosureRecordDate20-21.pdf",
          date: "2021",
        },
        {
          title: "loss-of-share-cert-1-Oct-20",
          src: "/files/loss-of-share-cert-1-Oct-20.pdf",
          date: "2020",
        },
        {
          title: "rating-withdrawal-11-09-20",
          src: "/files/rating-withdrawal-11-09-20.pdf",
          date: "2020",
        },
        {
          title: "trading-window-merger30-09-20",
          src: "/files/trading-window-merger30-09-20.pdf",
          date: "2020",
        },
        {
          title: "OCBM30-09-2020",
          src: "/files/OCBM30-09-2020.pdf",
          date: "2020",
        },
        {
          title: "id-resignation-10-09-20",
          src: "/files/id-resignation-10-09-20.pdf",
          date: "2020",
        },
        {
          title: "agm-paper-notice-jul21",
          src: "/files/agm-paper-notice-jul21.pdf",
          date: "2021",
        },
        {
          title: "tradingWindowJune20",
          src: "/files/tradingWindowJune20.pdf",
          date: "2020",
        },
        {
          title: "lodr-03jun20",
          src: "/files/lodr-03jun20.pdf",
          date: "2020",
        },
        {
          title: "meet-03jun20",
          src: "/files/meet-03jun20.pdf",
          date: "2020",
        },
        {
          title: "notice-01jun20",
          src: "/files/notice-01jun20.pdf",
          date: "2020",
        },
        {
          title: "notice 23may20",
          src: "/files/notice-23may20.pdf",
          date: "2020",
        },
        {
          title: "reconciliation-30-04-2020",
          src: "/files/reconciliation-30-04-2020.pdf",
          date: "2020",
        },
        {
          title: "reg409-30-04-2020",
          src: "/files/reg409-30-04-2020.pdf",
          date: "2020",
        },
        {
          title: "reg73-23-04-2020",
          src: "/files/reg73-23-04-2020.pdf",
          date: "2020",
        },
        {
          title: "reg745-23-04-2020",
          src: "/files/reg745-23-04-2020.pdf",
          date: "2020",
        },
        {
          title: "intimation-of-closure-of-trading-window-31-03-2020",
          src: "/files/intimation-of-closure-of-trading-window-31-03-2020.pdf",
          date: "2020",
        },
      ],
    },
  ],
};

// MAIN PAGE COMPONENT
export default function PoshareholderInfo() {
  return (
    <div className="mx-auto max-w-[86.67vw] py-[clamp(15px,5.5vw,20px)]">
      <div className={styles.sectionContent}>
        {/* MAIN TITLE */}
        <h2>
          {PoshareholderInfoDetails.title1.split(" ").map((word, index) => {
            if (index === 0) {
              return word;
            }

            return <span key={index}> {word}</span>;
          })}
        </h2>

        {/* RENDER ALL SECTIONS (ONLY ONE MAP!) */}
        {PoshareholderInfoDetails.sections.map((section, index) => (
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
