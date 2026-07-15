import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import { safetyData } from "./safety.data";
import SafetyCommitmentsSection from "./_components/SafetyCommitmentsSection";
import cstyles from "@/app/common.module.css";

const page = () => {
  return (
    <>
      <HeroSection data={safetyData.hero} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24 pt-4 pb-8">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{safetyData.overview.title}</h4>
          <div className="text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)] flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: safetyData.overview.description }} />
        </div>
      </section>

      {/* CERTIFICATION SECTION */}
      <section className="py-8 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ CERTIFICATION</div>
          <GridTwoSection
            data={safetyData.certification}
            gridColsClass="lg:grid-cols-12"
            bannerOrder="order-first lg:order-last lg:col-span-4"
            contentOrder="order-last lg:order-first lg:col-span-8"
            objectPosition="object-contain"
          />
        </div>
      </section>

      {/* ISO PRACTICES TABLE SECTION */}
      <section className="py-8">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{safetyData.isoPracticesTable.title}</h4>
          <CommonTable
            columns={safetyData.isoPracticesTable.columns}
            rows={safetyData.isoPracticesTable.rows}
          />
        </div>
      </section>

      {/* SAFETY CULTURE SECTION */}
      <section className="py-8 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ SAFETY CULTURE</div>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <h2 dangerouslySetInnerHTML={{ __html: safetyData.safetyCulture.title }} />
            <div dangerouslySetInnerHTML={{ __html: safetyData.safetyCulture.description }} />
          </div>
        </div>
      </section>

      {/* COMMITMENTS SECTION */}
      <SafetyCommitmentsSection data={safetyData.commitmentsSection} />

      {/* SOCIAL ACCOUNTABILITY SECTION */}
      <section className="py-8 bg-gray-50 mt-8">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ SOCIAL ACCOUNTABILITY</div>
          <GridTwoSection
            data={safetyData.socialAccountability}
            gridColsClass="lg:grid-cols-12"
            bannerOrder="order-first lg:order-last lg:col-span-4"
            contentOrder="order-last lg:order-first lg:col-span-8"
            objectPosition="object-contain"
          />
        </div>
      </section>

      {/* SA 8000 TABLE SECTION */}
      <section className="py-8">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{safetyData.sa8000Table.title}</h4>
          <CommonTable
            columns={safetyData.sa8000Table.columns}
            rows={safetyData.sa8000Table.rows}
          />
        </div>
      </section>

      {/* CREDENTIALS TABLE SECTION */}
      <section className="py-8 bg-gray-50 mb-8">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{safetyData.credentialsTable.title}</h4>
          <CommonTable
            columns={safetyData.credentialsTable.columns}
            rows={safetyData.credentialsTable.rows}
          />
        </div>
      </section>
    </>
  );
};

export default page;
