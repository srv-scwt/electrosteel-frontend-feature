import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/stockyards");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import StockListSection from './_components/stockListSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Stockyards", banner: "/images/board/global_dsk_banner.jpg" }} />
    <StockListSection />
    </>
  )
}

export default page