import HeroSection from '@/components/common/heroSection'
import ContentSection from '@/components/common/contentSection'
import GridTwoSection from '@/components/common/GridTwoSection'
import React from 'react'
import { pragatiIntroData, pragatiPillarsData } from './pragati.data'

const page = () => {
    return (
        <>
            <HeroSection
                data={{
                    title: "Pragati",
                    banner: "/images/board/policies_banner_large.jpg",
                }}
            />
            <ContentSection data={pragatiIntroData} />
            <GridTwoSection 
                data={pragatiPillarsData} 
                bannerOrder="order-first lg:order-last"
                contentOrder="order-last lg:order-first"
            />
        </>
    )
}

export default page