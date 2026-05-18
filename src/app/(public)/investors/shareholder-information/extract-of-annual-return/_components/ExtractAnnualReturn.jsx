

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const annualReturnData = [
  {
    title: "Extract of Annual Return",
    items: [
      {
        title: "Annual Return - Form MGT 7 - 31 March 2024",
        src: "/files/shareholding/Annual-Return-Form-MGT-7-31-March-2024.pdf",
        date: "31st March 2024",
      },
      {
        title: "Annual Return - Form MGT 7 - 31 March 2022",
        src: "/files/shareholding/Annual-Return-Form-MGT-7-31-March-2022.pdf",
        date: "31st March 2022",
      },
      {
        title: "Extract of Annual Return - MGT-9 - 31 March 2020",
        src: "/files/shareholding/Extract-of-Annual-Return-MGT-9-31-March-2020.pdf",
        date: "31st March 2020",
      },
      {
        title: "Annual Return - Form MGT 7 - 31 March 2023",
        src: "/files/shareholding/Annual-Return-Form-MGT-7-31-March-2023.pdf",
        date: "31st March 2023",
      },
      {
        title: "Annual Return - Form MGT 7 - 31 March 2021",
        src: "/files/shareholding/Annual-Return-Form-MGT-7-31-March-2021.pdf",
        date: "31st March 2021",
      },
      {
        title: "Extract of Annual Return - MGT-9 - 31 March 2019",
        src: "/files/shareholding/Extract-of-Annual-Return-MGT-9-31-March-2019.pdf",
        date: "31st March 2019",
      },
    ],
  },
];

const ExtractAnnualReturn = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {annualReturnData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem.title,
              pdf: fileItem.src,
              date: fileItem.date,
            })) || [];

          return (
            <div key={index} className="mb-10">
              <HTMLRender
                htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">Extract <span>of Annual Return</span></h2>`}
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

export default ExtractAnnualReturn;