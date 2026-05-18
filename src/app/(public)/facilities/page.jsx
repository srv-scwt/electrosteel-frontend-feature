
"use client"
import HeroSection from '@/components/common/heroSection'
import React from 'react'
import ManufacturingFacilities from '../about/company-profile/_components/manufacturingFacilities'

const page = () => {
  return (
    <>
    <HeroSection data = {{title: "Facilities" , banner: "/images/hero_banner.png" }} />
    <ManufacturingFacilities />
    </>
  )
}

export default page