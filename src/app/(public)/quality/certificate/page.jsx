import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/quality/certificate");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import SuperiorQualityProductSection from './_components/superiorqQualityProductsSection'
import QualityCertificatesTable from './_components/qualityCertificatesTable'

const pages = () => {
  return (
    <>
    <HeroSection data={{title: "Certificate", banner: "/images/board/quality_certificates_big.jpg"}} />
    <SuperiorQualityProductSection />
    <QualityCertificatesTable />
    </>
  )
}

export default pages