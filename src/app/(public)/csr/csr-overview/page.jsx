import HeroSection from '@/components/common/heroSection'
import React from 'react'
import OurBusinessPrinciples from './_components/ourBusinessPrinciples'
import CsrObjectives from './_components/csrObjectivesSection'
import KeyFocusAreaSection from './_components/keyFocusArea'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "CSR Overview", banner: "/images/board/csr_overview_banner_big.jpg"}} />
    <OurBusinessPrinciples />
    <CsrObjectives />
    <KeyFocusAreaSection />
    </>
    
  )
}

export default page