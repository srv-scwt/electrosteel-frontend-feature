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