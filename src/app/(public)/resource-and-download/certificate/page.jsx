import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { createImageSourceURL } from '@/utils'
import FollowUsSocialmedia from '@/components/common/followUsSection'
import SuperiorQualityProductSection from '../../quality/certificate/_components/superiorqQualityProductsSection'
import QualityCertificatesTable from '../../quality/certificate/_components/qualityCertificatesTable'
import { getQualityCertificate } from '@/services/qualityCertificate.api'

import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/resource-and-download/certificate");
}


const page = async() => {
    const apiResponse = await getQualityCertificate();
    const data = apiResponse?.data || {};
    const heroData = {
      banner: createImageSourceURL(data.heroSection?.image) ?? "/images/board/policies_banner_large.jpg",
      title: data.heroSection?.title ?? "Certificate",
    };
    console.log("data", data);
  return (
    <>
      <HeroSection data={heroData} />
      <SuperiorQualityProductSection data={data.introduction?.[0]} />
      <QualityCertificatesTable data={data.certificates} />
      {/* <FollowUsSocialmedia /> */}
    </>
  )
}

export default page
