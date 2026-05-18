

import React from "react";
import styles from "@/app/common.module.css";
import InvestorCard from "@/components/common/card/InvestorCard";

const orderData = [
  {
    title: "NCLT Final Order 091221",
    src: "/fileLinks/financial-results-june-2025.pdf",
    date: "5th April 2026",
  },
];

export default function NCLTFinalOrder() {
  return (
    <section className={styles.containerLg}>
      <div className={styles.sectionContent}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
          {orderData.map((post, index) => (
            <InvestorCard
              key={index}
              post={{
                ...post,
                src: post?.src?.replaceAll("\\", "/"),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}