import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/csr/community-development");
}

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