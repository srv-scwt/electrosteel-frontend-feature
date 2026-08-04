import HeroSection from '@/components/common/heroSection'
import React from 'react'
import SocialSection from './_components/socialSection'
import { getSocialData } from '@/services/socialData.api'
import SomethingWentWrong from '@/components/common/SomethingWentsWrong'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'
import FollowUsSocialmedia from '@/components/common/followUsSection'

const page = async () => {
  const homeBanner = await getCommonBanner("ElectrosteelonSocial");
 
  const heroData = {
    title: homeBanner?.data?.title ?? "Electrosteel on Social",
    image: homeBanner?.data?.image ?? "",
    banner: "/images/newsletters/eclonsocial/Electrosteel-on-Social (4).webp"
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
