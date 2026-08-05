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
