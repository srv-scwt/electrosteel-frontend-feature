import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import HTMLRender from "@/components/ui/HTMLRender";
import { safetyData } from "./safety.data";
import SafetyCommitmentsSection from "./_components/SafetyCommitmentsSection";
import SafetyCredentialsCards from "./_components/SafetyCredentialsCards";
import cstyles from "@/app/common.module.css";

const page = () => {
  return (
    <>
      <HeroSection data={safetyData.hero} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: safetyData.overview.description }} />
          </div>
        </div>
      </section>

      {/* CREDENTIALS CARDS SECTION */}
      <SafetyCredentialsCards />



      {/* ISO PRACTICES TABLE SECTION */}
      <section className="bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${safetyData.isoPracticesTable.title}</h2>`} />
          </div>
          <CommonTable
            columns={safetyData.isoPracticesTable.columns}
            rows={safetyData.isoPracticesTable.rows}
          />
        </div>
      </section>

      {/* SA 8000 TABLE SECTION */}
      <section className="bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${safetyData.sa8000Table.title}</h2>`} />
          </div>
          <CommonTable
            columns={safetyData.sa8000Table.columns}
            rows={safetyData.sa8000Table.rows}
          />
        </div>
      </section>

      {/* SAFETY CULTURE SECTION */}
      <section className="">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ SAFETY CULTURE</div>
            <HTMLRender htmlString={`<h2>${safetyData.safetyCulture.title}</h2>`} />
          </div>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: safetyData.safetyCulture.description }} />
          </div>
        </div>
      </section>

      {/* COMMITMENTS SECTION */}
      <SafetyCommitmentsSection data={safetyData.commitmentsSection} />



    </>
  );
};

export default page;
