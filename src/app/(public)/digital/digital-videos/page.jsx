import HeroSection from '@/components/common/heroSection'
import React from 'react'
import VideoListingSection from './_components/videoListingSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Videos", banner: "/images/board/events_big.jpg"}}/>
    <VideoListingSection />
    </>
    
  )
}

export default page