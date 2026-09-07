import HeroSection from '@/components/common/heroSection'
import React from 'react'
import ManufacturingFacilities from '../about/company-profile/_components/manufacturingFacilities'

import { buildMetadataForPathname } from "@/utils/seo";

// Server Component so it can declare its own metadata; the page renders no
// hooks of its own, the interactive parts live in child client components.
export async function generateMetadata() {
  return buildMetadataForPathname("/facilities");
}


const page = () => {
  return (
    <>
    <HeroSection data = {{title: "Facilities" , banner: "/images/hero_banner.png" }} />
    <ManufacturingFacilities />
    </>
  )
}

export default page