import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/connect/offices");
}

import HeroSection from '@/components/common/heroSection'
import React from 'react'
import RegisteredAndCorporateOffice from './_components/registeredAndCorporateOffice'
import OfficeInIndia from './_components/officeInIndia'
import ManufacturingUnits from './_components/manufacturingUnits'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Offices" , banner: "/images/board/office-banner_new.jpg"}} />
    <RegisteredAndCorporateOffice />
    <OfficeInIndia />
    <ManufacturingUnits />
    </>
  )
}

export default page