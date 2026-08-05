import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import PaintFacilitiesCard from "@/components/common/card/PaintFacilitiesCard";
import HTMLRender from "@/components/ui/HTMLRender";
import cstyles from "@/app/common.module.css";
import TestPerformed from "../_components/TestPerformed";

import CurrentManufacture from "../_components/currentManufacture";
import ComprehensiveProducts from "../_components/comprehensiveProducts";
import ComprehensiveProductRange from "./_components/comprehensiveProductRange";
import BusinessOverview from "../_components/BusinessOverview";
import ApplicationSection from "../_components/applicationSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getPaint } from "@/services/product/paint.api";
import { paintsData } from "./paint.data";
import { stripH2 } from "@/utils";

function safeParseJSONArray(value) {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderContactDesc(desc) {
  if (!desc) return null;
  const lines = desc.split("\n").map((line) => line.trim()).filter(Boolean);

  return (
    <p className="flex flex-col space-y-0.5">
      {lines.map((line, idx) => {
        if (line.includes("@")) {
          return (
            <a key={idx} href={`mailto:${line}`} className="hover:text-[#FDD307] transition-colors inline-block underline underline-offset-4 mt-1">
              {line}
            </a>
          );
        }
        if (/^(www\.|https?:\/\/)/i.test(line)) {
          return (
            <a key={idx} href={line.startsWith("http") ? line : `http://${line}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#FDD307] transition-colors inline-block underline underline-offset-4 mt-1">
              {line}
            </a>
          );
        }
        if (/^\+?[\d\s()-]{7,}$/.test(line)) {
          return (
            <a key={idx} href={`tel:${line.replace(/\s+/g, '')}`} className="hover:text-[#FDD307] transition-colors inline-block">
              {line}
            </a>
          );
        }
        return <span key={idx}>{line}</span>;
      })}
    </p>
  );
}

const Paint = async () => {
  const paintRes = await getPaint();
  const paintData = paintRes?.data;

  if (!paintData) return <SomethingWentWrong />;

  const checklist = safeParseJSONArray(paintData?.whyChooseEclPaintsPaint?.checklist);
  const badges = safeParseJSONArray(paintData?.whyChooseEclPaintsPaint?.badges);

  const productCategories = (paintData?.productCategoriesPaint?.card || []).map((item) => ({
    ...item,
    image: item.icon,
  }));

  return (
    <>
      <HeroSection data={paintData.hero} />

      <ContentSection data={paintData.ElectrosteelLegacyofInnovation} sectionID="overview" />

      <GridTwoSection
        data={{ ...paintData.PaintOverview, title: stripH2(paintData.PaintOverview?.title) }}
        contentOrder={"order-1"}
        bannerOrder={"order-2 "}
        sectionID={"overview-details"}
        className="!pt-0"
        objectPosition="object-cover object-top"
        bannerClassName="max-sm:!min-h-[200px] max-sm:!h-[200px]"
      />

      <CurrentManufacture
        data={paintData.currentManufacturingFacilities}
        paints={paintData.currentManufacturingFacilities?.card}
      />

      <BusinessOverview data={{ ...paintData.whyChooseEclPaintsPaint, card: checklist }} badges={badges} />

      <ComprehensiveProducts
        data={{
          ...paintData.productCategoriesPaint,
          download_link: "/images/paint/Paint-Catalogue-V6-Curved.pdf",
        }}
        productCategories={productCategories}
        alwaysProductCard
      />

      <ApplicationSection
        sectionID="applications"
        data={paintsData.Application}
      />

      <ComprehensiveProductRange data={paintData.comprehensiveProductRange} />

      <ComprehensiveProductRange data={paintData.worldClassRnDLaboratory} isGrey={false} />

      <TestPerformed
        data={{
          ...paintData.testPerformedForPaintsAndPrimers?.tableData,
          title: `<h2>${paintData.testPerformedForPaintsAndPrimers?.tableData?.title || ""}</h2>`,
        }}
      />

      <section id="paint-experts">
        <div className={`${cstyles.containerLg}`}>
          <div className={`${cstyles.sectionContent} ${cstyles.customUlListing} mb-8`}>
            <HTMLRender htmlString={paintData.talkToOurPaintExpertsPaint?.title?.replace("OurPaint", "Our Paint")} />
            <p>{paintData.talkToOurPaintExpertsPaint?.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {paintData.talkToOurPaintExpertsPaint?.card?.map((item) => {
              const cardData = { ...item, desc: renderContactDesc(item.desc) };
              return (
                <PaintFacilitiesCard key={item.title} data={cardData} isDifferent={false} isLegendsTitle={true} />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Paint;
