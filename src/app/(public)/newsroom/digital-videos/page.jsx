import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/digital-videos");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import VideoListingSection from './_components/videoListingSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Videos", banner: "/images/board/events_big.jpg"}}/>
    <VideoListingSection />
    </>
    
  )
}

export default page