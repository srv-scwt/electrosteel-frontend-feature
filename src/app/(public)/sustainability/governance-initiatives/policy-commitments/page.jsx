import React from "react";
import Image from "next/image";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import { policyCommitmentsData } from "./policy-commitments.data";
import PolicyFrameworkSection from "./_components/PolicyFrameworkSection.jsx";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const page = () => {
  return (
    <>
      <HeroSection data={policyCommitmentsData.hero} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24 pt-4 pb-8">
        <ContentSection data={policyCommitmentsData.overview} />
      </section>

      {/* GLOBAL COMMITMENT SECTION */}
      <div className="bg-gray-50">
        <GridTwoSection
          preContent={
            <div className={`${cstyles.sectionContentSpanDark} mb-6`}>
              <h2 className="text-[#004aa1]">GLOBAL COMMITMENT</h2>
              <HTMLRender htmlString={`<h2>${policyCommitmentsData.globalCommitment.title}</h2>`} />
            </div>
          }
          data={{
            description: policyCommitmentsData.globalCommitment.description,
            image: policyCommitmentsData.globalCommitment.image
          }}
          bannerOrder="order-first lg:order-last"
          contentOrder="order-last lg:order-first"
          objectPosition="object-contain"
        />
      </div>

      {/* TEN PRINCIPLES SECTION */}
      <section className="py-4">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark}`}>
            <HTMLRender htmlString={`<h2>${policyCommitmentsData.principlesTable.title}</h2>`} />
          </div>
          <CommonTable
            columns={policyCommitmentsData.principlesTable.columns}
            rows={policyCommitmentsData.principlesTable.rows}
          />
        </div>
      </section>

      {/* REPORTING & DISCLOSURE SECTION */}
      <div className="bg-gray-50">
        <GridTwoSection
          preContent={
            <div className={`${cstyles.sectionContentSpanDark} mb-6`}>
              <h2 className="text-[#004aa1]">REPORTING &amp; DISCLOSURE</h2>
              <HTMLRender htmlString={`<h2>${policyCommitmentsData.reporting.title}</h2>`} />
            </div>
          }
          data={{
            description: policyCommitmentsData.reporting.description,
            image: policyCommitmentsData.reporting.image
          }}
          bannerOrder="order-first lg:order-first"
          contentOrder="order-last lg:order-last"
          objectPosition="object-contain object-left"
          gridColsClass="lg:grid-cols-[35%_1fr] !gap-6 !lg:gap-8"
        />
      </div>

      {/* POLICY COMMITMENTS SECTION */}
      <PolicyFrameworkSection data={policyCommitmentsData.policyFramework} />

      {/* GOVERNANCE CREDENTIALS TABLE SECTION */}
      <section className="py-4 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark}`}>
            <HTMLRender htmlString={`<h2>${policyCommitmentsData.credentialsTable.title}</h2>`} />
          </div>
          <CommonTable
            columns={policyCommitmentsData.credentialsTable.columns}
            rows={policyCommitmentsData.credentialsTable.rows}
          />
        </div>
      </section>

      {/* CONTINUOUS IMPROVEMENT SECTION */}
      <section className="py-4 mb-4">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <h2 className="text-[#004aa1]">CONTINUOUS IMPROVEMENT</h2>
            <HTMLRender htmlString={`<h2>${policyCommitmentsData.continuousImprovement.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: policyCommitmentsData.continuousImprovement.description }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
