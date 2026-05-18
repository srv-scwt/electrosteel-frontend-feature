import HeroSection from '@/components/common/heroSection'
import React from 'react'
import NewslettersListingSection from './_components/newlettersListingSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Newsletters", banner: "/images/board/newsletters_banner_large.jpg"}} />
    <NewslettersListingSection />
    </>
  )
}

export default page