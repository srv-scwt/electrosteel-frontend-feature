import HeroSection from "@/components/common/heroSection";
import React from "react";
import CardSectionGrid from "@/components/common/CardSectionGrid";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import { createImageSourceURL } from "@/utils";
import FollowUsSocialmedia from "@/components/common/followUsSection";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/resource-and-download/brochure");
}
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
