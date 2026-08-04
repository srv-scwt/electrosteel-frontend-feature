import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { createImageSourceURL } from '@/utils'
import FollowUsSocialmedia from '@/components/common/followUsSection'
import SuperiorQualityProductSection from '../../quality/certificate/_components/superiorqQualityProductsSection'
import QualityCertificatesTable from '../../quality/certificate/_components/qualityCertificatesTable'
import { getQualityCertificate } from '@/services/qualityCertificate.api'

const page = async() => {
    const apiResponse = await getQualityCertificate();
    
      console.log("apiResponse",apiResponse)
    const data = apiResponse?.data || {};
      console.log("getQualityCertificate",data)
    const heroData = {
      banner: createImageSourceURL(data.heroSection?.image) ?? "/images/board/policies_banner_large.jpg",
      title: data.heroSection?.title ?? "Certificate",
    };
  return (
    <>
      <HeroSection data={heroData} />
      <SuperiorQualityProductSection data={data.introduction?.[0]} />
      <QualityCertificatesTable data={data.certificates} />
      <FollowUsSocialmedia />
    </>
  )
}

export default page
