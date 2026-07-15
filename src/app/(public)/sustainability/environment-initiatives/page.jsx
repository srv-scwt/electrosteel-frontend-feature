"use client";
import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import OverviewTab from "./_components/OverviewTab";
import { environmentHeroData } from "./environment.data";

// Emission
import { emissionData } from "./emission/emission.data";
import EmissionInitiativesSection from "./emission/_components/EmissionInitiativesSection";

// Water
import { waterData } from "./water/water.data";
import WaterInitiativesSection from "./water/_components/WaterInitiativesSection";

// Waste
import { wasteData } from "./waste/waste.data";
import WasteInitiativesSection from "./waste/_components/WasteInitiativesSection";

// Energy
import { energyData } from "./energy/energy.data";
import EnergyInitiativesSection from "./energy/_components/EnergyInitiativesSection";

const page = () => {
  return (
    <>
      {/* Overview Section */}
      <HeroSection data={environmentHeroData} />
      <section className="bg-gray-50 pb-8 pt-8">
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <OverviewTab />
          </div>
        </div>
      </section>

      {/* Emission Section */}
      <div id="emission" className="scroll-mt-24 pt-8 border-t border-gray-200 mt-8">
        <section className="">
          <div className={styles.containerLg}>
            <div className="py-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ {emissionData.hero.title}</h3>
              <h4 className="text-[#004aa1] font-bold text-xl">{emissionData.hero.subtitle}</h4>
            </div>
            <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={emissionData.introduction?.title} />
              <HTMLRender htmlString={emissionData.introduction?.description} />
            </div>
          </div>
        </section>
        <EmissionInitiativesSection data={emissionData.initiativesSection} />
      </div>

      {/* Water Section */}
      <div id="water" className="scroll-mt-24 pt-8 border-t border-gray-200 mt-8">
        <section className="">
          <div className={styles.containerLg}>
            <div className="py-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ {waterData.hero.title}</h3>
              <h4 className="text-[#004aa1] font-bold text-xl">{waterData.hero.subtitle}</h4>
            </div>
            <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={waterData.introduction?.title} />
              <HTMLRender htmlString={waterData.introduction?.description} />
            </div>
          </div>
        </section>
        <WaterInitiativesSection data={waterData.initiativesSection} />
      </div>

      {/* Waste Section */}
      <div id="waste" className="scroll-mt-24 pt-8 border-t border-gray-200 mt-8">
        <section className="">
          <div className={styles.containerLg}>
            <div className="py-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ {wasteData.hero.title}</h3>
              <h4 className="text-[#004aa1] font-bold text-xl">{wasteData.hero.subtitle}</h4>
            </div>
            <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={wasteData.introduction?.title} />
              <HTMLRender htmlString={wasteData.introduction?.description} />
            </div>
          </div>
        </section>
        <WasteInitiativesSection data={wasteData.initiativesSection} />
      </div>

      {/* Energy Section */}
      <div id="energy" className="scroll-mt-24 pt-8 border-t border-gray-200 mt-8 mb-12">
        <section className="">
          <div className={styles.containerLg}>
            <div className="py-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ {energyData.hero.title}</h3>
              <h4 className="text-[#004aa1] font-bold text-xl">{energyData.hero.subtitle}</h4>
            </div>
            <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
              <HTMLRender htmlString={energyData.introduction?.title} />
              <HTMLRender htmlString={energyData.introduction?.description} />
            </div>
          </div>
        </section>
        <EnergyInitiativesSection data={energyData.initiativesSection} />
      </div>
    </>
  );
};

export default page;
