import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import OverviewTab from "./_components/OverviewTab";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getEnvironmentInitiativesPageData } from "@/services/environmentInitiatives.api";
import { splitLabelTitleAndIntro, stripH2 } from "@/utils";

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

const page = async () => {
  const envRes = await getEnvironmentInitiativesPageData();
  const apiData = envRes?.data;

  if (!apiData) return <SomethingWentWrong />;

  const emission = splitLabelTitleAndIntro(apiData.emission?.title);
  const water = splitLabelTitleAndIntro(apiData.water?.title);
  const waste = splitLabelTitleAndIntro(apiData.waste?.title);
  const energy = splitLabelTitleAndIntro(apiData.energy?.title);

  return (
    <>
      {/* Overview Section */}
      <HeroSection data={apiData.heroSection} />
      <section className="pb-8 pt-8">
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <OverviewTab
              introTitle={stripH2(apiData.introduction?.title)}
              introDescription={apiData.introduction?.description}
              cards={apiData.environmentalCredentials}
            />
          </div>
        </div>
      </section>

      {/* Emission Section */}
      <div id="emission" className="scroll-mt-24 py-8 bg-gray-50 relative z-0">
        <section className="">
          <div className={styles.containerLg}>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
              <h2 className="text-[#004aa1]">{emission.label}</h2>
              <HTMLRender htmlString={`<h2>${emission.title}</h2>`} />
            </div>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} ${styles.customUlListing}`}>
              <HTMLRender htmlString={`<h3 class="!text-black [&>span]:!text-black">${emission.intro}</h3>`} />
              <HTMLRender htmlString={apiData.emission?.description} />
            </div>
          </div>
        </section>
        <EmissionInitiativesSection
          data={{
            title: emissionData.initiativesSection.title,
            image: emissionData.initiativesSection.image,
            initiatives: apiData.emissionCards,
          }}
        />
      </div>

      {/* Water Section */}
      <div id="water" className="scroll-mt-24 py-8 relative z-0">
        <section className="">
          <div className={styles.containerLg}>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
              <h2 className="text-[#004aa1]">{water.label}</h2>
              <HTMLRender htmlString={`<h2>${water.title}</h2>`} />
            </div>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} ${styles.customUlListing}`}>
              <HTMLRender htmlString={`<h3 class="!text-black [&>span]:!text-black">${water.intro}</h3>`} />
              <HTMLRender htmlString={apiData.water?.description} />
            </div>
          </div>
        </section>
        <WaterInitiativesSection
          data={{
            title: waterData.initiativesSection.title,
            image: waterData.initiativesSection.image,
            initiatives: apiData.waterCards,
          }}
        />
      </div>

      {/* Waste Section */}
      <div id="waste" className="scroll-mt-24 py-8 bg-gray-50 relative z-0">
        <section className="">
          <div className={styles.containerLg}>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
              <h2 className="text-[#004aa1]">{waste.label}</h2>
              <HTMLRender htmlString={`<h2>${waste.title}</h2>`} />
            </div>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} ${styles.customUlListing}`}>
              <HTMLRender htmlString={`<h3 class="!text-black [&>span]:!text-black">${waste.intro}</h3>`} />
              <HTMLRender htmlString={apiData.waste?.description} />
            </div>
          </div>
        </section>
        <WasteInitiativesSection
          data={{
            title: wasteData.initiativesSection.title,
            image: wasteData.initiativesSection.image,
            initiatives: apiData.wasteCards,
          }}
        />
      </div>

      {/* Energy Section */}
      <div id="energy" className="scroll-mt-24 py-8 mb-12 relative z-0">
        <section className="">
          <div className={styles.containerLg}>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}>
              <h2 className="text-[#004aa1]">{energy.label}</h2>
              <HTMLRender htmlString={`<h2>${energy.title}</h2>`} />
            </div>
            <div className={`${styles.sectionContent} ${styles.sectionContentSpanDark} ${styles.customUlListing}`}>
              <HTMLRender htmlString={`<h3 class="!text-black [&>span]:!text-black">${energy.intro}</h3>`} />
              <HTMLRender htmlString={apiData.energy?.description} />
            </div>
          </div>
        </section>
        <EnergyInitiativesSection
          data={{
            title: energyData.initiativesSection.title,
            image: energyData.initiativesSection.image,
            initiatives: apiData.energyCards,
          }}
        />
      </div>
    </>
  );
};

export default page;
