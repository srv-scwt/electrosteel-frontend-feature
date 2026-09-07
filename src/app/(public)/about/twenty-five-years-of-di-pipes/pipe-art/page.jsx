import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/twenty-five-years-of-di-pipes/pipe-art");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import CelebartingSection from './_components/celebratingSection'
import PipeArtPostSection from './_components/pipeArtPostSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Pipe Art" , banner: "/images/board/pioneering_banner.jpg"}} />
    <CelebartingSection />
    <PipeArtPostSection />
    </>
  )
}

export default page