import HeroSection from "@/components/common/heroSection";
import React from "react";
import CardSectionGrid from "@/components/common/CardSectionGrid";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import { createImageSourceURL } from "@/utils";
import FollowUsSocialmedia from "@/components/common/followUsSection";

const page = async () => {
  // Independent requests, run concurrently instead of as a serial waterfall.
  const [homeBanner, data] = await Promise.all([
    getCommonBanner("assets-brouchers"),
    getCommonProductsCategory("assestsbrouchers"),
  ]);

  const heroData = {
    banner:
      createImageSourceURL(homeBanner?.data?.image) ??
      "/images/board/policies_banner_large.jpg",
    title: homeBanner?.data?.title ?? "Brochure",
  };
  return (
    <>
      <HeroSection data={heroData} />
      {/* <FollowUsSocialmedia /> */}
      <CardSectionGrid data={data} />
    </>
  );
};

export default page;
