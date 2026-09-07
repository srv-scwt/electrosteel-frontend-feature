import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/corporate-profile");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import PoinerInDuctileSection from './_components/pioneersInDuctileSection'
import TestimonialSliderSection from './_components/testimonialSliderSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Corporate PROFILE", banner: "/images/growing_section.png" }} />
    <PoinerInDuctileSection />
    <TestimonialSliderSection />
    </>
  )
}

export default page