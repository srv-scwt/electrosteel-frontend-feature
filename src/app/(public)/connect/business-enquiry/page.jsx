import HeroSection from '@/components/common/heroSection'
import React from 'react'
import BussinessEnquiryForm from '../_components/forms/BussinessEnquiryForm'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'

import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/connect/business-enquiry");
}


const page = async () => {
  const heroBanner = await getCommonBanner("business-enquiry");
  return (
    <>
      <HeroSection
        data={{
          title: heroBanner?.data?.title ?? "Business Enquiry",
          image: heroBanner?.data?.image ?? "",
          banner: "/images/board/enquiry_banner_big.jpg",
        }}
      />
      <BussinessEnquiryForm />
    </>
  )
}

export default page