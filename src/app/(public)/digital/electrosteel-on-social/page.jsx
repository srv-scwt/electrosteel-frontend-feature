import HeroSection from '@/components/common/heroSection'
import React from 'react'
import FollowUsSocialmedia from './_components/followUsSection'

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Electrosteel on Social" , banner: "/images/board/electrosteel-on-Social_banner_big.jpg"}} />
    <FollowUsSocialmedia />
    </>
  )
}

export default page
