import HeroSection from '@/components/common/heroSection'
import React from 'react'
import OurMileStoneSection from '@/components/common/ourMileStone'
import { getMilestonePageData } from '@/services/milestone.api';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';
 
const page = async () => {
  const MileStoneData = await getMilestonePageData();
  if (!MileStoneData || MileStoneData?.error) return <SomethingWentWrong />
 
  return (
    <>
      <HeroSection data={MileStoneData?.data?.hero_banner?.[0]} />
 
      <div className='mt-8'>
        <OurMileStoneSection
          isBottomLinkActive={false}
          data={MileStoneData?.data?.section_heading}
          timelineData={MileStoneData?.data?.milestones_list || []}
        />
      </div>
    </>
  )
}
 
export default page