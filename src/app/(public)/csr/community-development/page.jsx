import HeroSection from '@/components/common/heroSection'
import React from 'react'
import CsrInitiativesSection from './_components/csrInitiatives'
import KeysFocusTabArea from './_components/keysFocusTabArea'

const page = () => {
  return (
    <>
      <HeroSection data={{title: "Community Development",  banner: "/images/board/csr_banner_big.jpg"}}/>
      <CsrInitiativesSection />
      <KeysFocusTabArea />
    </>
  )
}

export default page