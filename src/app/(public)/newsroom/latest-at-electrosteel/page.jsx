import React from 'react'
import LatestElectrosteelListing from './_components/latestElectrosteelListSection'
import HeroSectionVideo from '@/components/common/heroSectionVideo'
import HeroSection from '@/components/common/heroSection'
import SomethingWentWrong from '@/components/common/SomethingWentWrong';
import { getBlogResponseByCategory } from '@/services/blogs/blog.api';
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api';
import { createImageSourceURL } from '@/utils';


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
    category: "latestATECLPage",
  });
  if (!LatestEclCardData || LatestEclCardData.error) return <SomethingWentWrong />

  return (
    <>
      {isVideo ? (
        <HeroSectionVideo data={heroData} />
      ) : (
        <HeroSection data={heroData} />
      )}
      <LatestElectrosteelListing data={LatestEclCardData?.data} />
    </>
  )
}

export default page