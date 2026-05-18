

import HeroSection from "@/components/common/heroSection";
import React from "react";
import PressClient from "./_components/PressClient";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getBlogResponseByCategory } from "@/services/blogs/blog.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";

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