import React from "react";
import HeroSection from "@/components/common/heroSection";
import { trainingData } from "./training.data";
import TrainingDomainsSection from "./_components/TrainingDomainsSection";
import cstyles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import GridTwoSection from "@/components/common/GridTwoSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getTrainingPageData } from "@/services/training.api";
import { splitLabelAndTitle } from "@/utils";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

const page = async () => {
  const trainingRes = await getTrainingPageData();
  const apiData = trainingRes?.data;
  if (!apiData) return <SomethingWentWrong />;

  const approach = splitLabelAndTitle(apiData.ourApproach?.title);
  const reach = splitLabelAndTitle(apiData.ourReach?.title);
  const commitment = splitLabelAndTitle(apiData.ourCommitment?.title);

  return (
    <>
      <HeroSection data={apiData.heroSection} />

      <section className="scroll-mt-24 pt-4 pb-8">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing}`}>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.introduction?.description) }} />
          </div>
        </div>
      </section>

      {/* OUR APPROACH SECTION */}
      <section className="py-8 bg-gray-50">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <h2 className="text-[#004aa1]">{approach.label}</h2>
            <HTMLRender htmlString={`<h2>${approach.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.ourApproach?.description) }} />
          </div>
        </div>
      </section>

      {/* TRAINING DOMAINS SECTION */}
      <TrainingDomainsSection
        data={{
          title: apiData.whatWeTrain?.sectionData?.title ?? trainingData.domains.title,
          image: apiData.whatWeTrain?.sectionData?.image ?? trainingData.domains.image,
          cards: apiData.whatWeTrain?.items,
        }}
      />

      {/* OUR REACH SECTION */}
      <section className="py-8 bg-gray-50 mt-8">
        <div className={cstyles.containerLg}>
          <div className={`${cstyles.sectionContent} ${cstyles.sectionContentSpanDark} ${cstyles.customUlListing}`}>
            <h2 className="text-[#004aa1]">{reach.label}</h2>
            <HTMLRender htmlString={`<h2>${reach.title}</h2>`} />
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(apiData.ourReach?.description) }} />
          </div>
        </div>
      </section>

      {/* OUR COMMITMENT SECTION */}
      <div className="py-8 mb-8">
        <GridTwoSection
          preContent={
            <div className={`${cstyles.sectionContentSpanDark} mb-6`}>
              <h2 className="text-[#004aa1]">{commitment.label}</h2>
              <HTMLRender htmlString={`<h2>${commitment.title}</h2>`} />
            </div>
          }
          data={{
            description: apiData.ourCommitment?.description,
            image: apiData.ourCommitment?.image,
          }}
          bannerOrder="order-first lg:order-last"
          contentOrder="order-last lg:order-first"
          objectPosition="object-contain"
        />
      </div>
    </>
  );
};

export default page;
