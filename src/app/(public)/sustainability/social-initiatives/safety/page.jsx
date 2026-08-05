import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import CommonTable from "@/components/common/CommonTable";
import HTMLRender from "@/components/ui/HTMLRender";
import { safetyData } from "./safety.data";
import SafetyCommitmentsSection from "./_components/SafetyCommitmentsSection";
import SafetyCredentialsCards from "./_components/SafetyCredentialsCards";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getSafetyPageData } from "@/services/safety.api";
import { splitLabelAndTitle } from "@/utils";
import cstyles from "@/app/common.module.css";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const page = async () => {
  const safetyRes = await getSafetyPageData();
  const apiData = safetyRes?.data;

  if (!apiData) return <SomethingWentWrong />;

  const safetyCulture = splitLabelAndTitle(apiData.safetyCulture?.title);

  return (
    <>
      <HeroSection data={apiData.heroSection} />

      {/* OVERVIEW SECTION */}
      <section className="scroll-mt-24">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.introduction?.description) }} />
          </div>
        </div>
      </section>

      {/* CREDENTIALS CARDS SECTION */}
      <SafetyCredentialsCards
        title={safetyData.credentialsTable.title}
        cards={apiData.safetyCredentials}
      />

      {/* ISO PRACTICES TABLE SECTION */}
      <section className="bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${apiData.iso45001?.table_data?.title || ""}</h2>`} />
          </div>
          <CommonTable
            columns={apiData.iso45001?.table_data?.columns}
            rows={apiData.iso45001?.table_data?.rows}
          />
        </div>
      </section>

      {/* SA 8000 TABLE SECTION */}
      <section className="bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <HTMLRender htmlString={`<h2>${apiData.sa8000?.table_data?.title || ""}</h2>`} />
          </div>
          <CommonTable
            columns={apiData.sa8000?.table_data?.columns}
            rows={apiData.sa8000?.table_data?.rows}
          />
        </div>
      </section>

      {/* SAFETY CULTURE SECTION */}
      <section className="">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} mb-6`}>
            <h2 className="text-[#004aa1]">{safetyCulture.label}</h2>
            <HTMLRender htmlString={`<h2>${safetyCulture.title}</h2>`} />
          </div>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.safetyCulture?.description) }} />
          </div>
        </div>
      </section>

      {/* COMMITMENTS SECTION */}
      <SafetyCommitmentsSection
        data={{
          title: safetyData.commitmentsSection.title,
          image: safetyData.commitmentsSection.image,
          commitments: apiData.fourCommitments,
        }}
      />
    </>
  );
};

export default page;
