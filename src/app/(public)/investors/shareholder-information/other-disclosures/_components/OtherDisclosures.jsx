

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";
import HTMLRender from "@/components/ui/HTMLRender";

const otherDisclosureData = [
  {
    title: "Other Disclosures",
    items: [
      {
        title:
          "Disclosure under Regulation 31(1) of SEBI SAST - 4 October 2019",
        src: "/files/shareholding/Disclosure-under-Regulation-31-1-of-SEBI-SAST-4-October-2019.pdf",
        date: "4th October 2019",
      },
      {
        title: "Revised Memorandum and Articles of Association",
        src: "/files/shareholding/Revised-Memorandum-and-Articles-of-Association.pdf",
        date: "",
      },
    ],
  },
];

const OtherDisclosures = () => {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        {otherDisclosureData.map((item, index) => {
          const cardData =
            item.items?.map((fileItem) => ({
              title: fileItem.title,
              pdf: fileItem.src,
              date: fileItem.date,
            })) || [];

          return (
            <div key={index} className="mb-10">
              <HTMLRender
                htmlString={`<h2 class="text-left text-2xl sm:text-3xl font-semibold text-primaryBlue mb-6">Other<span> Disclosures</span></h2>`}
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

export default OtherDisclosures;