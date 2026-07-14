"use client";
import React from "react";
import styles from "@/app/common.module.css";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import {
  overviewIntroData,
  iso14001Data,
  iso50001Data,
  epdData,
  griData,
  credentialsTableData,
} from "../environment.data";

const OverviewTab = () => {
  return (
    <>
      <div className="pb-8">
        <div className={styles.sectionContent}>
            <h2>{overviewIntroData.title}</h2>
        </div>
        <div className={styles.sectionContent}>
            <div dangerouslySetInnerHTML={{ __html: overviewIntroData.description }} />
        </div>
      </div>

      <div className="pt-8">
        {/* ISO 14001 (Image Left, Content Right) */}
        <GridTwoSection
          data={iso14001Data}
          bannerOrder="order-first lg:order-first"
          contentOrder="order-last lg:order-last"
          className="!px-0 !w-full"
          objectPosition="object-contain"
        />

        {/* ISO 50001 (Content Left, Image Right) */}
        <GridTwoSection
          data={iso50001Data}
          bannerOrder="order-first lg:order-last"
          contentOrder="order-last lg:order-first"
          className="!px-0 !w-full"
          objectPosition="object-contain"
        />
      </div>

      <div className="py-8">
        {/* EPD and GRI (Standard Content Sections) */}
        <div className={styles.sectionContent}>
            <h3>{epdData.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: epdData.description }} className="mb-12" />
            
            <h3>{griData.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: griData.description }} />
        </div>
      </div>

      <div className="py-8">
        {/* Environmental Credentials Table */}
        <CommonTable
          title={credentialsTableData.title}
          columns={credentialsTableData.columns}
          rows={credentialsTableData.rows}
        />
      </div>
    </>
  );
};

export default OverviewTab;
