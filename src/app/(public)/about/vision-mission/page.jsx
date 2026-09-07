import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/vision-mission");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import VisionSection from './_components/visionSection'
import GuidingPrinciples from './_components/guidingPrinciplesSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Vision and Mission", banner: "/images/hero_banner.png" }} />
    <VisionSection />
    <GuidingPrinciples />
    </>
  )
}

export default page