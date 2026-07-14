import HeroSection from '@/components/common/heroSection'
import ContentSection from '@/components/common/contentSection'
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
            <ContentSection data={pratibhaIntroData} />
        </>
    )
}

export default page