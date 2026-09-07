import React from 'react'
import LatestElectrosteelListing from './_components/latestElectrosteelListSection'
import HeroSectionVideo from '@/components/common/heroSectionVideo'
import HeroSection from '@/components/common/heroSection'
import SomethingWentWrong from '@/components/common/SomethingWentWrong';
import { getBlogResponseByCategory } from '@/services/blogs/blog.api';
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api';
import { createImageSourceURL } from '@/utils';
import { BLOG_PAGE_SIZE } from '@/services/blogs/blog.client.api';


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/latest-at-electrosteel");
}
const LATEST_AT_ECL_CATEGORY = "latestATECLPage";

const page = async () => {
  const homeBanner = await getCommonBanner("LatestAtElectrosteel");
  const bannerMedia = homeBanner?.data?.image;
  const isVideo = bannerMedia ? bannerMedia.match(/\.(mp4|webm|ogg)$/i) : true;
  
  const heroData = {
    title: homeBanner?.data?.title ?? "Latest @ Electrosteel",
    video: isVideo ? (createImageSourceURL(bannerMedia) ?? "/videos/sliderVideo.mp4") : undefined,
    banner: !isVideo ? createImageSourceURL(bannerMedia) : undefined,
  };

  const LatestEclCardData = await getBlogResponseByCategory({
    category: LATEST_AT_ECL_CATEGORY,
    page: 1,
    limit: BLOG_PAGE_SIZE,
  });
  if (!LatestEclCardData || LatestEclCardData.error) return <SomethingWentWrong />

  return (
    <>
      {isVideo ? (
        <HeroSectionVideo data={heroData} />
      ) : (
        <HeroSection data={heroData} />
      )}
      <LatestElectrosteelListing
        data={LatestEclCardData?.data}
        pagination={LatestEclCardData?.pagination}
        category={LATEST_AT_ECL_CATEGORY}
        pageSize={BLOG_PAGE_SIZE}
      />
    </>
  )
}

export default page