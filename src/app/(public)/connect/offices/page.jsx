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