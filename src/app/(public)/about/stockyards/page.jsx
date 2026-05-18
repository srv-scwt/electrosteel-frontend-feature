import HeroSection from '@/components/common/heroSection'
import React from 'react'
import StockListSection from './_components/stockListSection'

const page = () => {
  return (
    <>
    <HeroSection data={{ title: "Stockyards", banner: "/images/board/global_dsk_banner.jpg" }} />
    <StockListSection />
    </>
  )
}

export default page