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
import { getPaint } from "@/services/product/paint.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";


const Paint = async () => {
  const paintsData = await getPaint();
  if (!paintsData || paintsData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={paintsData?.data?.hero} />
      <ContentSection data={paintsData?.data?.ElectrosteelLegacyofInnovation} sectionID="overview" />
      <GridTwoSection
        data={paintsData?.data?.PaintOverview}
        contentOrder={"order-1"}
        bannerOrder={"order-2 "}
        sectionID={"overview"}
        className={"!my-0 !py-0"}
        objectPosition="object-contain"
      />
      <TechnologyMantra
        data={paintsData?.data?.PaintTechnologyMantra}
        images={paintsData?.data?.PaintTechnologyMantra?.slider_images || []}
      />
      <BusinessOverview data={paintsData?.data?.industrialPaintBusinessOverview} />
      <ComprehensiveProducts
        data={paintsData?.data?.comprehensiveProductRange}
        productCategories={paintsData?.data?.comprehensiveProductRange?.card || []}
      />
      <TestPerformed
        data={paintsData?.data?.testPerformedForPaintsAndPrimers?.tableData}
      />
      <WorldClassSection data={paintsData?.data?.worldClassRawMaterialsAndGlobalApprovals} />
      <WorldClassSection data={paintsData?.data?.worldClassRnDLaboratory} />
      <CurrentManufacture
        data={paintsData?.data?.currentManufacturingFacilities}
        paints={paintsData?.data?.currentManufacturingFacilities?.card || []} />
    </>
  );
};

export default Paint;
