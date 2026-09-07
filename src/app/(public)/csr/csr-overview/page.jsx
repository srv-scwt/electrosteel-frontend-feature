import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/csr/csr-overview");
}

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