import React from "react";
import Image from "next/image";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import { policyCommitmentsData } from "./policy-commitments.data";
import PolicyFrameworkSection from "./_components/PolicyFrameworkSection";
import cstyles from "@/app/common.module.css";

const page = () => {
  return (
    <>
      <HeroSection data={policyCommitmentsData.hero} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24 pt-4 pb-8">
        <ContentSection data={policyCommitmentsData.overview} />
      </section>

      {/* GLOBAL COMMITMENT SECTION */}
      <section className="py-4 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ GLOBAL COMMITMENT</div>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{policyCommitmentsData.globalCommitment.title}</h4>
          <GridTwoSection
            data={{
              description: policyCommitmentsData.globalCommitment.description,
              image: policyCommitmentsData.globalCommitment.image
            }}
            bannerOrder="order-first lg:order-last"
            contentOrder="order-last lg:order-first"
            objectPosition="object-contain"
          />
        </div>
      </section>

      {/* TEN PRINCIPLES SECTION */}
      <section className="py-4">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{policyCommitmentsData.principlesTable.title}</h4>
          <CommonTable
            columns={policyCommitmentsData.principlesTable.columns}
            rows={policyCommitmentsData.principlesTable.rows}
          />
        </div>
      </section>

      {/* REPORTING & DISCLOSURE SECTION */}
      <section className="py-4 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ REPORTING & DISCLOSURE</div>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{policyCommitmentsData.reporting.title}</h4>
          <GridTwoSection
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
      </section>

      {/* POLICY COMMITMENTS SECTION */}
      <PolicyFrameworkSection data={policyCommitmentsData.policyFramework} />

      {/* GOVERNANCE CREDENTIALS TABLE SECTION */}
      <section className="py-4 bg-gray-50">
        <div className={cstyles.containerLg}>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{policyCommitmentsData.credentialsTable.title}</h4>
          <CommonTable
            columns={policyCommitmentsData.credentialsTable.columns}
            rows={policyCommitmentsData.credentialsTable.rows}
          />
        </div>
      </section>

      {/* CONTINUOUS IMPROVEMENT SECTION */}
      <section className="py-4 mb-4">
        <div className={cstyles.containerLg}>
          <div className="text-sm font-bold text-[#004aa1] mb-2 tracking-widest uppercase">❯ CONTINUOUS IMPROVEMENT</div>
          <h4 className="text-[#004aa1] font-bold text-xl mb-4">{policyCommitmentsData.continuousImprovement.title}</h4>
          <div className="text-[#545454] font-medium text-[clamp(14px,2.5vw,18px)] flex flex-col gap-4" dangerouslySetInnerHTML={{ __html: policyCommitmentsData.continuousImprovement.description }} />
        </div>
      </section>
    </>
  );
};

export default page;
