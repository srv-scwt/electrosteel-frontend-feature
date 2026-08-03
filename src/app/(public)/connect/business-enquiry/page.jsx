import HeroSection from '@/components/common/heroSection'
import React from 'react'
import BussinessEnquiryForm from '../_components/forms/BussinessEnquiryForm'
import { getCommonBanner } from '@/services/commonBanner/commonBanner.api'

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