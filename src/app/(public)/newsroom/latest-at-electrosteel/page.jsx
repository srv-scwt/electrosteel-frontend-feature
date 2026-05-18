import React from 'react'
import LatestElectrosteelListing from './_components/latestElectrosteelListSection'
import HeroSectionVideo from '@/components/common/heroSectionVideo'
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';
import { getBlogResponseByCategory } from '@/services/blogs/blog.api';
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api';
import { createImageSourceURL } from '@/utils';


const page = async () => {
  const homeBanner = await getCommonBanner("LatestAtElectrosteel");
  
  const heroData = {
    title: homeBanner?.data?.title ?? "Latest @ Electrosteel",
    video: createImageSourceURL(homeBanner?.data?.image) ?? "/videos/sliderVideo.mp4"
  };
  const LatestEclCardData = await getBlogResponseByCategory({
    category: "latestATECLPage",
  });
  if (!LatestEclCardData || LatestEclCardData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSectionVideo data={heroData} />
      <LatestElectrosteelListing data={LatestEclCardData?.data} />
    </>
  )
}

export default page