import HeroSection from '@/components/common/heroSection'
import React from 'react'
import CelebartingSection from './_components/celebratingSection'
import PipeArtPostSection from './_components/pipeArtPostSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Pipe Art" , banner: "/images/board/pioneering_banner.jpg"}} />
    <CelebartingSection />
    <PipeArtPostSection />
    </>
  )
}

export default page