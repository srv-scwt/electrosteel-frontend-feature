import HeroSection from '@/components/common/heroSection'
import React from 'react'
import PresenceMoreCountriesSection from './_components/presenceMoreCountries'
import SubsidiariesMapSection from './_components/subsidiariesMapSection'

const page = () => {
 
    return (
        <>
        <HeroSection data={{ title: "Subsidiaries", banner: "/images/board/global_dsk_banner.jpg" }}/>
        <PresenceMoreCountriesSection />
        <SubsidiariesMapSection />
        </>
    )
}

export default page