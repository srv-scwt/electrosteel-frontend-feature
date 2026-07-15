import HeroSection from '@/components/common/heroSection'
import GridTwoSection from '@/components/common/GridTwoSection'
import React from 'react'
import { pratibhaIntroData } from './pratibha.data'

const page = () => {
    return (
        <>
            <HeroSection
                data={{
                    title: "Pratibha Pride",
                    banner: "/images/board/policies_banner_large.jpg",
                }}
            />
            <section className="py-4 md:py-8 lg:py-12">
                <GridTwoSection 
                    data={pratibhaIntroData} 
                    bannerOrder="order-last lg:order-last"
                    contentOrder="order-first lg:order-first"
                    objectPosition="object-contain" 
                />
            </section>
        </>
    )
}

export default page