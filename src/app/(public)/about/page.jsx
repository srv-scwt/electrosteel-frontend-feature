import React from "react";
import {
  GrowingFromStrengthSection,
  ManufacturingFacilities,
  OurPeople,
  TechnologyInnovation,
  TestimonialSliderSection,
  PoinerInDuctileSection,
} from "./company-profile/_components";
import HeroSection from "@/components/common/heroSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getAboutUs } from "@/services/aboutUs.api";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about");
}
const page = async () => {
  const AboutUsData = await getAboutUs();
  if (!AboutUsData || AboutUsData?.error) return <SomethingWentWrong />
  return (
    <>
      <HeroSection data={AboutUsData?.data?.aboutMain?.[0]} />
      <GrowingFromStrengthSection data={AboutUsData?.data?.growingStrength} />
      <GridTwoSection data={AboutUsData?.data?.ductileIronPipes?.[0]} bannerOrder={"order-2 lg:order-1"} contentOrder={"order-1 lg:order-2"} />
      <TechnologyInnovation data={AboutUsData?.data?.technologyInnovations?.[0]} />
      <ManufacturingFacilities
        data={AboutUsData?.data?.manufacturingFacilities?.heading}
        facilities={AboutUsData?.data?.manufacturingFacilities?.facilities}
      />
      <OurPeople data={AboutUsData?.data?.peopleData?.[0]} />
    </>
  );
};

export default page;
