import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getCastIronPipes } from "@/services/product/castIronPipes.api";
import React from "react";

const page = async () => {
  const CastIronPipes = await getCastIronPipes();
  if (!CastIronPipes || CastIronPipes.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection
        data={CastIronPipes?.data?.heroSection}
      />
      <GridTwoSection
        data={CastIronPipes?.data?.overview}
        bannerOrder={"order-2 lg:order-1"}
        contentOrder={"order-1 lg:order-2"}
        sectionID={"overview"}
      />
    </>
  );
};

export default page;
