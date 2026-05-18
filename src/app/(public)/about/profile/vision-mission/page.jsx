import HeroSection from '@/components/common/heroSection'
import React from 'react'
import VisionSection from './_components/visionSection'
import GuidingPrinciples from './_components/guidingPrinciplesSection'
import GridTwoSection from '@/components/common/GridTwoSection';
import { getVisionMisson } from '@/services/visionMission.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';



const page = async () => {
  const visionMision = await getVisionMisson();
  if(!visionMision || visionMision?.error) return <SomethingWentWrong />
  return (
    <>
      <HeroSection data={visionMision?.data?.visionBanner?.[0]} />
      {/* <VisionSection /> */}
      <GridTwoSection data={visionMision?.data?.vision?.[0]} bannerOrder={"order-2"} contentOrder={"order-1"} />
      <GridTwoSection data={visionMision?.data?.mission?.[0]} bannerOrder={"order-1"} contentOrder={"order-2"} className={'!pt-0'} />
      <GuidingPrinciples 
      data={visionMision?.data?.principles?.heading}
      principlesData={visionMision?.data?.principles?.principles} />
    </>
  )
}

export default page;