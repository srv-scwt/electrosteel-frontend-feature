"use client";

import React from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

export default function ProductTextGrid({
  data = [],
  label
}) {
  return (
    <section>
      <div className={cstyles.containerLg}>
        {/* HEADER */}
        <div
          className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-8`}
        >
          <HTMLRender htmlString={`<h2>${label?.title}</h2>`} />
          <HTMLRender htmlString={label?.description} />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-white">
          {Array.isArray(data) && data?.map((item, index) => {
            const isLastCol = (index + 1) % 3 === 0;
            const isLastRow = index >= data.length - 3;
            const borderClasses = [
              !isLastCol ? "border-r" : "",
              !isLastRow ? "border-b" : "",
              "border-white/20",
            ].join(" ");

            return (
              <div
                key={index}
                className={`${borderClasses} ${styles.productBoxContainer}`}
              >
                <div className={styles.cardContent}>
                  <h4>{item?.title}</h4>
                  <p>{item?.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
