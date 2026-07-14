"use client";
import React from "react";
import HeroSection from "@/components/common/heroSection";
import CommonTab from "@/components/common/CommonTab";
import styles from "@/app/common.module.css";
import OverviewTab from "./_components/OverviewTab";
import { environmentHeroData } from "./environment.data";

const page = () => {
  const tabsData = [
    {
      id: "overview",
      title: "Overview",
      content: <OverviewTab />,
    },
    // Future tabs can be added here
  ];

  return (
    <>
      <HeroSection data={environmentHeroData} />
      <section className="bg-gray-50 min-h-screen">
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <CommonTab tabsData={tabsData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
