import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { LegendVideoCard } from './_components'
import { getEclLegends } from '@/services/legendsEcl.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';


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
