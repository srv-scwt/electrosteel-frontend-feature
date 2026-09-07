import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/csr/environment-compliance-reports");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import EnvironmentComplianceReports from './_components'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Environment Compliance Reports" , banner: "/images/board/csr_overview_banner_big.jpg"}} />
    <EnvironmentComplianceReports />
    </>
  )
}

export default page