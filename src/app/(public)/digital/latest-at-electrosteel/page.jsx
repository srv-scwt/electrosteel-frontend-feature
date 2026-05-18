import HeroSection from '@/components/common/heroSection'
import React from 'react'
import LatestElectrosteelListing from './_components/latestElectrosteelListSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Latest @ Electrosteel" , banner: "/images/board/latestn_banner_big.jpg"}} />
    <LatestElectrosteelListing />
    </>
  )
}

export default page