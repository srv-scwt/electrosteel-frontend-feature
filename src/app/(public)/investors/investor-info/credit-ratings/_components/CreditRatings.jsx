"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const creditRatingData = [
  {
    title: "Credit <span>Ratings</span>",
    items: [
      {
        title: "CRISIL Credit Ratings Letter - 27 January 2025",
        src: "/files/creditrating/sept-2025.pdf",
        date: "27th January 2025",
      },
      {
        title: "CRISIL Credit Rating Letter - 28 June 2024",
        src: "/files/creditrating/sept-2025.pdf",
        date: "28th June 2024",
      },
      {
        title: "CRISIL Credit Rating Letter - 30th June 2023",
        src: "/files/creditrating/sept-2025.pdf",
        date: "30th June 2023",
      },
      {
        title: "CRISIL Ratings Limited Rating Letter - 5 July 2021",
        src: "/files/creditrating/sept-2025.pdf",
        date: "5th July 2021",
      },
      {
        title:
          "India Ratings & Research Private Limited Rating Letter - 13 May 2021",
        src: "/files/creditrating/sept-2025.pdf",
        date: "13th May 2021",
      },
      {
        title:
          "India Ratings & Research Private Limited Rating Letter - 29 March 2019",
        src: "/files/creditrating/sept-2025.pdf",
        date: "29th March 2019",
      },
      {
        title:
          "Brickwork Ratings India Pvt. Ltd Rating Letter - 17 December 2018",
        src: "/files/creditrating/sept-2025.pdf",
        date: "17th December 2018",
      },
      {
        title: "CARE Rating Letter - 14 November 2018",
        src: "/files/creditrating/sept-2025.pdf",
        date: "14th November 2018",
      },
      {
        title: "India Ratings and Research Rating Letter - 3rd September 2024",
        src: "/files/creditrating/sept-2025.pdf",
        date: "3rd September 2024",
      },
      {
        title: "CRISIL Credit Rating Letter - 2nd August 2023",
        src: "/files/creditrating/sept-2025.pdf",
        date: "2nd August 2023",
      },
      {
        title: "CRISIL Ratings Limited Rating Letter - 7 July 2022",
        src: "/files/creditrating/sept-2025.pdf",
        date: "7th July 2022",
      },
      {
        title:
          "India Ratings & Research Private Limited Rating Letter - 5 October 2021",
        src: "/files/creditrating/sept-2025.pdf",
        date: "5th October 2021",
      },
      {
        title:
          "CARE Ratings Limited Rating Withdrawal Letter - 14 January 2020",
        src: "/files/creditrating/sept-2025.pdf",
        date: "14th January 2020",
      },
      {
        title:
          "India Ratings & Research Private Limited Rating Letter - 24 January 2019",
        src: "/files/creditrating/sept-2025.pdf",
        date: "24th January 2019",
      },
      {
        title:
          "Informerics Valuation and Rating Pvt. Ltd Rating Letter - 12 December 2018",
        src: "/files/creditrating/sept-2025.pdf",
        date: "12th December 2018",
      },
      {
        title: "CARE NCD Rating Withdrawal Letter - 14 November 2018",
        src: "/files/creditrating/sept-2025.pdf",
        date: "14th November 2018",
      },
    ],
  },
];

const CreditRatings = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {creditRatingData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem?.title ?? "",
              pdf: fileItem?.src,
              date: fileItem?.date,
            })) || [];

          return (
            <div key={index}>
              <HTMLRender
                htmlString={`<h2>${item?.title ?? "Credit Ratings"}</h2>`}
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

export default CreditRatings;