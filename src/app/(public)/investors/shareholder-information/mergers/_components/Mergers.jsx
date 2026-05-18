

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const mergerData = [
  {
    title: "Mergers",
    items: [
      {
        title: "BSE Observation Letter",
        src: "/files/shareholding/bseObservationLetter.pdf",
        date: "1st November 2014",
      },
      {
        title: "Further submission of documents to SEBI",
        src: "/files/shareholding/SEBI.pdf",
        date: "1st November 2014",
      },
      {
        title:
          "Scheme of Amalgamation of Mahadev Vyapaar Private Limited with the Company",
        src: "/files/shareholding/scheme-amalgamation-22nov14.pdf",
        date: "22nd November 2014",
      },
      {
        title: "NSE Observation Letter",
        src: "/files/shareholding/observationLetter.pdf",
        date: "1st November 2014",
      },
      {
        title: "Complaints Report",
        src: "/files/shareholding/complaintsreport01012014.pdf",
        date: "1st January 2014",
      },
    ],
  },
];

const Mergers = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {mergerData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem.title,
              pdf: fileItem.src,
              date: fileItem.date,
            })) || [];

          return (
            <div key={index}>
              <HTMLRender
                htmlString={`<h2 class="text-2xl sm:text-3xl font-semibold text-primaryBlue">${item.title}</h2>`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6 mt-6">
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

export default Mergers;