import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'
import { createImageSourceURL } from '@/utils'
import FollowUsSocialmedia from '@/components/common/followUsSection'
import SuperiorQualityProductSection from '../../quality/certificate/_components/superiorqQualityProductsSection'
import QualityCertificatesTable from '../../quality/certificate/_components/qualityCertificatesTable'

const page = async() => {
    const homeBanner = await getCommonBanner("assests-certificate");

    const heroData = {
      banner: createImageSourceURL(homeBanner?.data?.image) ?? "/images/board/policies_banner_large.jpg",
      title: homeBanner?.data?.title ?? "Certificate",
    };
  return (
    <>
      <HeroSection data={heroData} />
      <SuperiorQualityProductSection />
      <QualityCertificatesTable />
      <FollowUsSocialmedia />
    </>
  )
}

export default page
