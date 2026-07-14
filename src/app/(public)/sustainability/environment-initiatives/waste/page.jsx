import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import { wasteData } from "./waste.data";
import WasteInitiativesSection from "./_components/WasteInitiativesSection";

const page = () => {
  return (
    <>
      <HeroSection data={wasteData.hero} />
      <ContentSection data={wasteData.introduction} />
      <WasteInitiativesSection data={wasteData.initiativesSection} />
    </>
  );
};

export default page;
