import HeroSection from '@/components/common/heroSection';
import React from 'react';
import TopInfoSection from './_components/topInfoSection';
import TwentyFiveYearsGloriousSection from './_components/twentyFiveYearsGloriousSection';
import BottomTabSection from './_components/bottomTabSection';
import JoinElectrosteelFamily from './_components/joinElectosteelFamily';

const page = () => {
  return (
    <>
    <HeroSection data={{title: "Life @ Electrosteel" , banner: "/images/board/carrer_banner_large.jpg"}} />
    <TopInfoSection />
    <TwentyFiveYearsGloriousSection />
    <BottomTabSection />
    <JoinElectrosteelFamily />
    </>
  )
}

export default page