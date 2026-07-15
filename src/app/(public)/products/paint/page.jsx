import ContentSection from "@/components/common/contentSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import TechnologyMantra from "../_components/technologyIsMantra";
import TestPerformed from "../_components/TestPerformed";
import WorldClassSection from "../_components/worldClassSection";
import CurrentManufacture from "../_components/currentManufacture";
import ComprehensiveProducts from "../_components/comprehensiveProducts";
import BusinessOverview from "../_components/BusinessOverview";
import { paintsData } from "./paint.data";

const Paint = () => {
  return (
    <>
      <HeroSection data={paintsData.hero} />
      
      <ContentSection data={paintsData.ElectrosteelLegacyofInnovation} sectionID="overview" />
      
      <GridTwoSection
        data={paintsData.PaintOverview}
        contentOrder={"order-1"}
        bannerOrder={"order-2 "}
        sectionID={"overview-details"}
        className={"!my-0 !py-0"}
        objectPosition="object-contain"
      />
      
      <TechnologyMantra
        data={paintsData.PaintTechnologyMantra}
        images={paintsData.PaintTechnologyMantra.slider_images}
      />
      
      <CurrentManufacture
        data={paintsData.ManufacturingExcellence}
        paints={paintsData.ManufacturingExcellence.card} 
      />

      <BusinessOverview data={paintsData.WhyChooseECLPaints} />
      


      <ComprehensiveProducts
        data={paintsData.ApplicationSectors}
        productCategories={paintsData.ApplicationSectors.card}
      />

      <ComprehensiveProducts
        data={paintsData.ProductCategories}
        productCategories={paintsData.ProductCategories.card}
      />

      <WorldClassSection data={paintsData.ComprehensiveProductRange} />

      <WorldClassSection data={paintsData.WorldClassRnDLaboratory} />

      <TestPerformed
        data={paintsData.TestPerformed}
      />

      <ContentSection data={paintsData.TalkToOurPaintExperts} sectionID="paint-experts" />
    </>
  );
};

export default Paint;
