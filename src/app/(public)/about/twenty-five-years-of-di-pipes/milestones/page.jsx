import HeroSection from '@/components/common/heroSection'
import React from 'react'
import OurMilesstonesSection from './_components/ourMilesstonesSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Milestones", banner: "/images/board/milestones_large.jpg" }} />
    <OurMilesstonesSection />
    </>
  )
}

export default page