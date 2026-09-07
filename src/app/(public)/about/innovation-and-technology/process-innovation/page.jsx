import GridTwoSection from '@/components/common/GridTwoSection';
import HeroSection from '@/components/common/heroSection';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';
import { getProcessInnovation } from '@/services/processInnovation.api';
import React from 'react'

import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/innovation-and-technology/process-innovation");
}


const page = async () => {
  const processInnovationData = await getProcessInnovation();
  if (!processInnovationData || processInnovationData?.error) return <SomethingWentWrong />
  
  return (
    <>
      <HeroSection data={processInnovationData?.data?.heroSection?.[0]} />
      <GridTwoSection data={processInnovationData?.data?.electrosteelIsro?.[0]} bannerOrder={"order-1"} contentOrder={"order-2"} />
      <GridTwoSection data={processInnovationData?.data?.reachingStars?.[0]} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} className={"py-0!"} />
      <GridTwoSection data={processInnovationData?.data?.ultimateDIPipes?.[0]} bannerOrder={"order-1"} contentOrder={"order-2"} />
      <GridTwoSection data={processInnovationData?.data?.changiWater?.[0]} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} className={"pt-0!"} />
    </>
  )
}

export default page