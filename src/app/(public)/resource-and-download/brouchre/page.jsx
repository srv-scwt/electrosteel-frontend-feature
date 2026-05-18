import HeroSection from '@/components/common/heroSection'
import React from 'react'
import FollowUsSocialmedia from '../../digital/electrosteel-on-social/_components/followUsSection'
import CardSectionGrid from '@/components/common/CardSectionGrid'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Brouchre" , banner: "/images/board/electrosteel-on-Social_banner_big.jpg"}} />
    <FollowUsSocialmedia />
    <CardSectionGrid/> 
    </>
  )
}

export default page
