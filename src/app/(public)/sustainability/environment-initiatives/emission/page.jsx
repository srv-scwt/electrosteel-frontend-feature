import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import { emissionData } from "./emission.data";
import EmissionInitiativesSection from "./_components/EmissionInitiativesSection";

const page = () => {
  return (
    <>
      <HeroSection data={emissionData.hero} />
      <ContentSection data={emissionData.introduction} />
      <EmissionInitiativesSection data={emissionData.initiativesSection} />
    </>
  );
};

export default page;
