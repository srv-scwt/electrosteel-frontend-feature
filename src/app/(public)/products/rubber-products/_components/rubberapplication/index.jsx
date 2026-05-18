"use client";
import React from "react";
import styles from "./style.module.css";
import cstyle from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const ApplicationRubber = ({ sectionID, data }) => {
  return (
    <section id={sectionID} className={styles.container}>
      <div className={cstyle.containerLg}>
        {/* Title (HTML) */}
        <div className={cstyle.sectionContent}>
          <HTMLRender htmlString={data?.title} />
        </div>

        {/* Description + UL LI (HTML) */}
        <div
          className={`${cstyle.sectionContent} ${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.Listing}`}
        >
          <HTMLRender htmlString={data?.desc} />
        </div>
      </div>
    </section>
  );
};

export default ApplicationRubber;
