import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import { policyCommitmentsData } from "./policy-commitments.data";
import PolicyFrameworkSection from "./_components/PolicyFrameworkSection.jsx";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getPolicyCommitmentsPageData } from "@/services/policyCommitments.api";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { splitLabelAndTitle } from "@/utils";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const page = async () => {
  const policyRes = await getPolicyCommitmentsPageData();
  const apiData = policyRes?.data;

  if (!apiData) return <SomethingWentWrong />;

  const globalCommitment = splitLabelAndTitle(apiData.globalCommitment?.title);
  const reporting = splitLabelAndTitle(apiData.reportingDisclosure?.title);
  const continuousImprovement = splitLabelAndTitle(apiData.continuousImprovement?.title);

  return (
    <>
      <HeroSection data={apiData.heroSection} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24 pt-4 pb-8">
        <ContentSection data={apiData.introduction} />
      </section>

      {/* GLOBAL COMMITMENT SECTION */}
      <div className="bg-gray-50">
        <GridTwoSection
          preContent={
            <div className={`${cstyles.sectionContentSpanDark} mb-6`}>
              <h2 className="text-[#004aa1]">{globalCommitment.label}</h2>
              <HTMLRender htmlString={`<h2>${globalCommitment.title}</h2>`} />
            </div>
          }
          data={{
            description: apiData.globalCommitment?.description,
            image: apiData.globalCommitment?.image
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
            <HTMLRender htmlString={`<h2>${apiData.tenPrinciples?.table_data?.title || ""}</h2>`} />
          </div>
          <CommonTable
            columns={apiData.tenPrinciples?.table_data?.columns}
            rows={apiData.tenPrinciples?.table_data?.rows}
          />
        </div>
      </section>

      {/* REPORTING & DISCLOSURE SECTION */}
      <div className="bg-gray-50">
        <GridTwoSection
          preContent={
            <div className={`${cstyles.sectionContentSpanDark} mb-6`}>
              <h2 className="text-[#004aa1]">{reporting.label}</h2>
              <HTMLRender htmlString={`<h2>${reporting.title}</h2>`} />
            </div>
          }
          data={{
            description: apiData.reportingDisclosure?.description,
            image: apiData.reportingDisclosure?.image
          }}
          bannerOrder="order-first lg:order-first"
          contentOrder="order-last lg:order-last"
          objectPosition="object-contain object-left"
          gridColsClass="lg:grid-cols-[35%_1fr] !gap-6 !lg:gap-8"
        />
      </div>

      {/* POLICY COMMITMENTS SECTION */}
      <PolicyFrameworkSection
        data={{
          title: policyCommitmentsData.policyFramework.title,
          image: policyCommitmentsData.policyFramework.image,
          policies: apiData.governingPolicyFramework,
        }}
      />

      {/* GOVERNANCE CREDENTIALS TABLE SECTION */}
      <section className="py-4 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark}`}>
            <HTMLRender htmlString={`<h2>${apiData.governanceCredentials?.table_data?.title || ""}</h2>`} />
          </div>
          <CommonTable
            columns={apiData.governanceCredentials?.table_data?.columns}
            rows={apiData.governanceCredentials?.table_data?.rows}
          />
        </div>
      </section>

      {/* CONTINUOUS IMPROVEMENT SECTION */}
      <section className="py-4 mb-4">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <h2 className="text-[#004aa1]">{continuousImprovement.label}</h2>
            <HTMLRender htmlString={`<h2>${continuousImprovement.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.continuousImprovement?.description) }} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
