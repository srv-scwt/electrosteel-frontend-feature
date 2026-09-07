import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/code-of-conduct-and-policies");
}

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