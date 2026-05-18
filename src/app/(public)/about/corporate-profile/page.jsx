import HeroSection from '@/components/common/heroSection'
import React from 'react'
import PoinerInDuctileSection from './_components/pioneersInDuctileSection'
import TestimonialSliderSection from './_components/testimonialSliderSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Corporate PROFILE", banner: "/images/growing_section.png" }} />
    <PoinerInDuctileSection />
    <TestimonialSliderSection />
    </>
  )
}

export default page