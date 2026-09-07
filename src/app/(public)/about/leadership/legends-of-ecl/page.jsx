import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { LegendVideoCard } from './_components'
import { getEclLegends } from '@/services/legendsEcl.api';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';



import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/leadership/legends-of-ecl");
}
const page = async () => {
  const eventsData = await getEclLegends();
  if (!eventsData || eventsData?.error) return <SomethingWentWrong />
  return (
    <>
      <HeroSection data={eventsData?.data?.heroSection?.[0]} />
      <LegendVideoCard events={eventsData?.data?.cardData} />
    </>
  )
}

export default page
