import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import { waterData } from "./water.data";
import WaterInitiativesSection from "./_components/WaterInitiativesSection";

const page = () => {
  return (
    <>
      <HeroSection data={waterData.hero} />
      <ContentSection data={waterData.introduction} />
      <WaterInitiativesSection data={waterData.initiativesSection} />
    </>
  );
};

export default page;
