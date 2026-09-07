import HeroSection from '@/components/common/heroSection';
import React from 'react';
import TopInfoSection from './_components/topInfoSection';
import TwentyFiveYearsGloriousSection from './_components/twentyFiveYearsGloriousSection';
import BottomTabSection from './_components/bottomTabSection';
import JoinElectrosteelFamily from './_components/joinElectosteelFamily';


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/career/life-at-electrosteel");
}
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