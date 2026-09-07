

import HeroSection from "@/components/common/heroSection";
import React from "react";
import PressClient from "./_components/PressClient";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/press-and-media");
}
const page = async () => {
  const homeBanner = await getCommonBanner("pressAndMediaPage");

  const heroData = {
    title: homeBanner?.data?.title || "Press and Media",
    video: homeBanner?.data?.image
      ? createImageSourceURL(homeBanner.data.image)
      : "/images/board/newsletters_banner_large.jpg",
  };

  const pressMediaData = await getBlogResponseByCategory({
    category: "pressAndMediaPage",
  });

  if (!pressMediaData || pressMediaData?.error) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <HeroSection data={heroData} />
      <PressClient data={pressMediaData?.data || []} />
    </>
  );
};

export default page;