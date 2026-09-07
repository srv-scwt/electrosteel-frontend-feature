import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/subsidiaries");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import PresenceMoreCountriesSection from './_components/presenceMoreCountries'
import SubsidiariesMapSection from './_components/subsidiariesMapSection'

const page = () => {
 
    return (
        <>
        <HeroSection data={{ title: "Subsidiaries", banner: "/images/board/global_dsk_banner.jpg" }}/>
        <PresenceMoreCountriesSection />
        <SubsidiariesMapSection />
        </>
    )
}

export default page