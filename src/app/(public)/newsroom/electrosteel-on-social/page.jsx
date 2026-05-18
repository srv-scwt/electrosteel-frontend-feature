import HeroSection from '@/components/common/heroSection'
import React from 'react'
import FollowUsSocialmedia from './_components/followUsSection'
import SocialSection from './_components/socialSection'
import { getSocialData } from '@/services/socialData.api'
import SomethingWentWrong from '@/components/common/SomethingWentsWrong'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'
import { createImageSourceURL } from '@/utils'

const page = async () => {
  const homeBanner = await getCommonBanner("ElectrosteelonSocial");

  const heroData = {
    title: homeBanner?.data?.title ?? "Electrosteel on Social",
    video: createImageSourceURL(homeBanner?.data?.image) ?? "/images/board/electrosteel-on-Social_banner_big.jpg"
  };

  const SocialData = await getSocialData();
  if (!SocialData || SocialData?.error) return <SomethingWentWrong />
  return (
    <>
      <HeroSection data={heroData} />
      <FollowUsSocialmedia />
      <SocialSection data={SocialData?.data || []} />
    </>
  )
}

export default page
