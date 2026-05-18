import HeroSection from '@/components/common/heroSection'
import React from 'react'
import BussinessEnquiryForm from '../_components/forms/BussinessEnquiryForm'
import ActiveIndicator from '@/components/ui/ActiveIndicator'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Business Enquiry" , banner:"/images/board/enquiry_banner_big.jpg"}} />
      {/* <ActiveIndicator /> */}
    <BussinessEnquiryForm />
    </>
  )
}

export default page