import HeroSection from '@/components/common/heroSection'
import React from 'react'
import FollowUsSocialmedia from '../../digital/electrosteel-on-social/_components/followUsSection'
import CardSectionGrid from '@/components/common/CardSectionGrid'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'
import { getCommonProductsCategory } from '@/services/commonP/commonProductsCat'
import { createImageSourceURL } from '@/utils'

const page = async() => {
    const homeBanner = await getCommonBanner("assests-certificate");
    const data = await getCommonProductsCategory("assestscertificate");

  
    const heroData = {
      banner: createImageSourceURL(homeBanner?.data?.image) ?? "/images/board/policies_banner_large.jpg",
      title: homeBanner?.data?.title ?? "Certificate",
    };
  return (
    <>
    <HeroSection data={heroData} />
    <FollowUsSocialmedia />
    <CardSectionGrid data={data} CardTitle='Certificates'/> 
    </>
  )
}

export default page
