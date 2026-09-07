import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/twenty-five-years-of-di-pipes/milestones");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import OurMilesstonesSection from './_components/ourMilesstonesSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Milestones", banner: "/images/board/milestones_large.jpg" }} />
    <OurMilesstonesSection />
    </>
  )
}

export default page