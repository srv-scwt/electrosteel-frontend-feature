import HeroSection from '@/components/common/heroSection'
import React from 'react'
import VisionSection from './_components/visionSection'
import GuidingPrinciples from './_components/guidingPrinciplesSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Vision and Mission", banner: "/images/hero_banner.png" }} />
    <VisionSection />
    <GuidingPrinciples />
    </>
  )
}

export default page