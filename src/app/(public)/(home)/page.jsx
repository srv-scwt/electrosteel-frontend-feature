import React from "react";
import {
  HeroSection,
  AdvertiseSection,
  ElectroSteelSection,
  OurMileStoneSection,
  OurProductSection,
  SocialSection,
  StatSection,
  VideoWaterSection,
} from "./_components";
import HorizontalCardSection from "./_components/HorizontalCardSection";
import { businessData, businessTitle } from "./_components/HorizontalCardSection/bussiness.data";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getHomeListing } from "@/services/home.api";
import { getSocialData } from "@/services/socialData.api";

const page = async () => {
  const HomeData = await getHomeListing();
  const SocialData = await getSocialData();
  
  if (!HomeData || HomeData?.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection slides={HomeData?.data?.slides} miniStats={HomeData?.data?.mini_stats} />
      <StatSection overview={HomeData?.data?.overview_section} />
      <OurProductSection data={HomeData?.data?.ecl_products} />
      <ElectroSteelSection data={HomeData?.data?.growing_from_strength?.[0]} />
      <VideoWaterSection waterSectionData={HomeData?.data?.water_section} />
      <HorizontalCardSection title={businessTitle} cardData={HomeData?.data?.business_world ?? ''} headerButton={"#"} />
      <OurMileStoneSection data={HomeData?.data?.milestones} timelineData={HomeData?.data?.milestones?.milestones_data || []} />
      <SocialSection data={HomeData?.data?.facebook_posts ?? ''} />
      <AdvertiseSection
        AdvertiseData={HomeData?.data?.advertisements?.[0]}
        ulData={HomeData?.data?.advertisements?.[0]?.box_data}
      />
    </>
  );
};

export default page;
