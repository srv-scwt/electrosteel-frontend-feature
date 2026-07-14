import React from "react";
import HeroSection from "@/components/common/heroSection";
import ContentSection from "@/components/common/contentSection";
import { energyData } from "./energy.data";
import EnergyInitiativesSection from "./_components/EnergyInitiativesSection";

const page = () => {
  return (
    <>
      <HeroSection data={energyData.hero} />
      <ContentSection data={energyData.introduction} />
      <EnergyInitiativesSection data={energyData.initiativesSection} />
    </>
  );
};

export default page;
