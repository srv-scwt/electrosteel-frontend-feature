"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

// const disclosureData = [
//   {
//     title: "Disclosures to Stock Exchange",
//     items: [
//       {
//         title: "Receipt of final Compensation Order - 21 November 2025",
//         src: "/files/shareholding/Receipt-of-final-Compensation-Order-21-November-2025.pdf",
//         date: "21st November 2025",
//       },
//       {
//         title: "Postal Ballot Voting Results - 17 November 2025",
//         src: "/files/shareholding/Postal-Ballot-Voting-Results-17-November-2025.pdf",
//         date: "17th November 2025",
//       },
//       {
//         title: "Audio Link of Concall - 10 November 2025",
//         src: "/files/shareholding/Audio-Link-of-Concall-10-November-2025.mp3",
//         date: "10th November 2025",
//       },
//       {
//         title: "Investor Presentation for Concall - 10 November 2025",
//         src: "/files/shareholding/Investor-Presentation-for-Concall-10-November-2025.pdf",
//         date: "10th November 2025",
//       },
//       {
//         title:
//           "Press Release on Financial Results as on Sep 2025 Quarter - 10 November 2025",
//         src: "/files/shareholding/Press-Release-on-Financial-Results-as-on-Sep-2025-Quarter-10-November-2025.pdf",
//         date: "10th November 2025",
//       },
//       {
//         title: "Intimation for Conference Call - 4 November, 2025",
//         src: "/files/shareholding/Intimation-for-Conference-Call-4-November-2025.pdf",
//         date: "4th November 2025",
//       },
//       {
//         title: "Board Meeting Intimation - 03 November, 2025",
//         src: "/files/shareholding/Board-Meeting-Intimation-03-November-2025.pdf",
//         date: "3rd November 2025",
//       },
//       {
//         title: "CFO Certificate quarter ended 30 Sept 2025",
//         src: "/files/shareholding/CFO-Certificate-quarter-ended-30-Sept-2025.pdf",
//         date: "30th September 2025",
//       },
//     ],
//   },
// ];

 const disclosureData = [
  {
    title: "Disclosures to Stock Exchange",
    items: [
      {
        title: "Receipt of final Compensation Order - 21 November 2025",
        src: "/files/shareholding/Receipt-of-final-Compensation-Order-21-November-2025.pdf",
        date: "21st November 2025",
      },
      {
        title: "Postal Ballot Voting Results - 17 November 2025",
        src: "/files/shareholding/Postal-Ballot-Voting-Results-17-November-2025.pdf",
        date: "17th November 2025",
      },
      {
        title: "Audio Link of Concall - 10 November 2025",
        src: "/files/shareholding/Audio-Link-of-Concall-10-November-2025.mp3",
        date: "10th November 2025",
      },
      {
        title: "Investor Presentation for Concall - 10 November 2025",
        src: "/files/shareholding/Investor-Presentation-for-Concall-10-November-2025.pdf",
        date: "10th November 2025",
      },
      {
        title:
          "Press Release on Financial Results as on Sep 2025 Quarter - 10 November 2025",
        src: "/files/shareholding/Press-Release-on-Financial-Results-as-on-Sep-2025-Quarter-10-November-2025.pdf",
        date: "10th November 2025",
      },
      {
        title: "Intimation for Conference Call - 4 November, 2025",
        src: "/files/shareholding/Intimation-for-Conference-Call-4-November-2025.pdf",
        date: "4th November 2025",
      },
      {
        title: "Board Meeting Intimation - 03 November, 2025",
        src: "/files/shareholding/Board-Meeting-Intimation-03-November-2025.pdf",
        date: "3rd November 2025",
      },
      {
        title: "CFO Certificate quarter ended 30 Sept 2025",
        src: "/files/shareholding/CFO-Certificate-quarter-ended-30-Sept-2025.pdf",
        date: "30th September 2025",
      },
      {
        title: "Appointment of Mr. Bikranjit Ghosh - 30.08.2025",
        src: "/files/shareholding/Appointment-of-Mr-Bikranjit-Ghosh-30-August-2025.pdf",
        date: "30th August 2025",
      },
      {
        title: "AGM Voting Results - 28.08.2025",
        src: "/files/shareholding/AGM-Voting-Results-28-August-2025.pdf",
        date: "28th August 2025",
      },
      {
        title: "AGM Proceedings - 27.08.2025",
        src: "/files/shareholding/AGM-Proceedings-27-August-2025.pdf",
        date: "27th August 2025",
      },
      {
        title: "Audio Recording Link - Conference Call",
        src: "/files/shareholding/Audio-Recording-Link-Conference-Call.pdf",
        date: "August 2025",
      },
      {
        title: "Analyst Call Presentation - 06.08.2025",
        src: "/files/shareholding/Analyst-Call-Presentation-06-August-2025.pdf",
        date: "6th August 2025",
      },
      {
        title: "Press Release - Financial Results 30.06.2025",
        src: "/files/shareholding/Press-Release-Financial-Results-30-June-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Outcome of Board Meeting -06.08.2025",
        src: "/files/shareholding/Outcome-of-Board-Meeting-06-August-2025.pdf",
        date: "6th August 2025",
      },
      {
        title: "Disclosure under Regulation 30 - 30.07.2025",
        src: "/files/shareholding/Disclosure-under-Regulation-30-30-July-2025.pdf",
        date: "30th July 2025",
      },
      {
        title: "Board Meeting Intimation - 30.07.2025",
        src: "/files/shareholding/Board-Meeting-Intimation-30-July-2025.pdf",
        date: "30th July 2025",
      },
      {
        title:
          "Compliance under Regulation 74(5) for the Quarter ended 30.06.2025",
        src: "/files/shareholding/Compliance-under-Regulation-74-5-for-the-Quarter-ended-30-June-2025.pdf",
        date: "30th June 2025",
      },
      {
        title: "Closure of Trading Window - 27 June 2025",
        src: "/files/shareholding/Closure-of-Trading-Window-27-June-2025.pdf",
        date: "27th June 2025",
      },
      {
        title: "Shutdown of MBF Production Facility at Khardah - 17 June, 2025",
        src: "/files/shareholding/Shutdown-of-MBF-Production-Facility-at-Khardah-17-June-2025.pdf",
        date: "17th June 2025",
      },
      {
        title: "Annual Secretarial Compliance Report - 30 May, 2025",
        src: "/files/shareholding/Annual-Secretarial-Compliance-Report-30-May-2025.pdf",
        date: "30th May 2025",
      },
      {
        title:
          "Execution of Share Purchase Agreement with T.I.S Services - 29 May, 2025",
        src: "/files/shareholding/Execution-of-Share-Purchase-Agreement-with-TIS-Services-29-May-2025.pdf",
        date: "29th May 2025",
      },
      {
        title: "Outcome Of Board Meeting - 28th May, 2025",
        src: "/files/shareholding/Outcome-Of-Board-Meeting-28-May-2025.pdf",
        date: "28th May 2025",
      },
      {
        title: "Regulation_30_Intimation_ECL",
        src: "/files/shareholding/Regulation_30_Intimation_ECL.pdf",
        date: "May 2025",
      },
      {
        title: "Receipt of Provisional Compensation Order - 16 May, 2025",
        src: "/files/shareholding/Receipt-of-Provisional-Compensation-Order-16-May-2025.pdf",
        date: "16th May 2025",
      },
      {
        title: "Disclosure under Regulation 30 of SEBI LODR - 16 May 2025",
        src: "/files/shareholding/Disclosure-under-Regulation-30-of-SEBI-LODR-16-May-2025.pdf",
        date: "16th May 2025",
      },
      {
        title: "Press Release on Financial Results - 31 March 2025",
        src: "/files/shareholding/Press-Release-Financial-Results-31-March-2025.pdf",
        date: "31st March 2025",
      },
      {
        title: "Newspaper Publication - Financial Result Q4 2024-25",
        src: "/files/shareholding/Newspaper-Publication-Financial-Result-Q4-2024-25.pdf",
        date: "Q4 2024-25",
      },
      {
        title: "Outcome Of Board Meeting - 10th May, 2025",
        src: "/files/shareholding/Outcome-Of-Board-Meeting-10-May-2025.pdf",
        date: "10th May 2025",
      },
      {
        title: "Intimation for Conference Call - 6 May, 2025",
        src: "/files/shareholding/Intimation-for-Conference-Call-6-May-2025.pdf",
        date: "6th May 2025",
      },
      {
        title: "Board Meeting Intimation - 2 May, 2025",
        src: "/files/shareholding/Board-Meeting-Intimation-2-May-2025.pdf",
        date: "2nd May 2025",
      },
      {
        title:
          "Intitial Disclosure for Large Corporate entity - 28 April, 2025",
        src: "/files/shareholding/Intitial-Disclosure-for-Large-Corporate-entity-28-April-2025.pdf",
        date: "28th April 2025",
      },
      {
        title: "Certificate under Regulation 74(5) - 12 April, 2025",
        src: "/files/shareholding/Certificate-under-Regulation-74-5-12-April-2025.pdf",
        date: "12th April 2025",
      },
    ],
  },
];


const DisclosuresToStockExchange = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {disclosureData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem.title,
              pdf: fileItem.src,
              date: fileItem.date,
            })) || [];

          return (
            <div key={index} className="mb-10">
              <HTMLRender
                htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">Disclosures <span>to Stock Exchange</span></h2>`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
                {cardData.map((post, idx) => (
                  <InvestorCard
                    key={idx}
                    post={{
                      ...post,
                      pdf: post?.pdf?.replaceAll("\\", "/"),
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DisclosuresToStockExchange;