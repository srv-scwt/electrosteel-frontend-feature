import HeroSection from '@/components/common/heroSection'
import React from 'react'
import OurGuidingPrinciplesSection from './_components/ourGuidingPrinciplesSection'
import PdfLinkListSection from './_components/pdfLinkListSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Code of Conduct and Policies", banner: "/images/board/policies_banner_new_large.jpg" }} />
    <OurGuidingPrinciplesSection/>
    <PdfLinkListSection />
    </>
  )
}

export default page