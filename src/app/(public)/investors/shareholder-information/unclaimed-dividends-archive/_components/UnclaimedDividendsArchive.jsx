"use client";

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const unclaimedDetails = {
  sections: [
    {
      title: "As on 31st March, 2023 (End of Financial Year)",
      items: [
        {
          title: "Unclaimed Dividend of ECL Unit 2015-16 to 2021-22",
          src: "/files/ecl-2015-16-to-2021-22.pdf",
          date: "ECL Unit",
        },
        {
          title: "Unclaimed Dividend of SW Unit from 2015-16 to 2021-22",
          src: "/files/sw-2015-16-to-2021-22.pdf",
          date: "SW Unit",
        },
      ],
    },
    {
      title: "As on 31st March, 2022 (End of Financial Year)",
      items: [
        {
          title: "Unclaimed Dividend of ECL Unit 2014-15 to 2020-21",
          src: "/files/business-guidelines.pdf",
          date: "ECL Unit",
        },
        {
          title: "Unclaimed Dividend of SW Unit from 2014-15 to 2020-21",
          src: "/files/business-guidelines.pdf",
          date: "SW Unit",
        },
      ],
    },
  ],
};

const UnclaimedDividendsArchive = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {unclaimedDetails.sections.map((section, index) => (
          <div key={index} className="mb-10">
            <HTMLRender
              htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">${section.title}</h2>`}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
              {section.items.map((post, idx) => (
                <InvestorCard
                  key={idx}
                  post={{
                    title: post.title,
                    src: post?.src?.replaceAll("\\", "/"),
                    date: post.date,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UnclaimedDividendsArchive;