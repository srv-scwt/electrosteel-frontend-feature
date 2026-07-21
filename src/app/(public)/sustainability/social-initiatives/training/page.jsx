import React from "react";
import HeroSection from "@/components/common/heroSection";
import { trainingData } from "./training.data";
import TrainingDomainsSection from "./_components/TrainingDomainsSection";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const page = () => {
  return (
    <>
      <HeroSection data={trainingData.hero} />

      <section className="scroll-mt-24 pt-4 pb-8">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: trainingData.overview.description }} />
          </div>
        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section className="py-8 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <div className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">{trainingData.approach.sectionLabel}</div>
            <HTMLRender htmlString={`<h2>${trainingData.approach.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: trainingData.approach.description }} />
          </div>
        </div>
      </section>

      {/* TRAINING DOMAINS SECTION */}
      <TrainingDomainsSection data={trainingData.domains} />

      {/* OUR REACH SECTION */}
      <section className="py-8 bg-gray-50 mt-8">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <div className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">{trainingData.reach.sectionLabel}</div>
            <HTMLRender htmlString={`<h2>${trainingData.reach.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: trainingData.reach.description }} />
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT SECTION */}
      <section className="py-8 mb-8">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <div className="text-2xl md:text-3xl font-bold text-[#004aa1] mb-2 tracking-widest uppercase">{trainingData.commitment.sectionLabel}</div>
            <HTMLRender htmlString={`<h2>${trainingData.commitment.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: trainingData.commitment.description }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
