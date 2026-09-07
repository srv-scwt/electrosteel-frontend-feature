import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/company-profile");
}

import React from 'react'
// import HeroSection from './_components/heroSection'
import {
    GrowingFromStrengthSection,
    ManufacturingFacilities,
    OurPeople,
    TechnologyInnovation
} from "./_components"
import HeroSection from '@/components/common/heroSection'

const page = () => {
  return (
    <>
        <HeroSection data={{ title: "COMPANY PROFILE", banner: "/images/hero_banner.png" }}/>
        <GrowingFromStrengthSection/>
        <TechnologyInnovation/>
        <ManufacturingFacilities/>
        <OurPeople/>
    </>
  )
}

export default page