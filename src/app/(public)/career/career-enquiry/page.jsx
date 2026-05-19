import React from 'react'
import AIChatPage from '../_components/AIChatPage'
import HeroSection from '@/components/common/heroSection'

const page = () => {
  return (
    <>
        <HeroSection data={{title: "Career Enquiry" , banner:"/images/board/enquiry_banner_big.jpg"}} />
        <AIChatPage />
    </>
  )
}

export default page