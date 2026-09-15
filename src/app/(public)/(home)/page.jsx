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
import JsonLd from "@/components/common/JsonLd";
import { getHomeListing } from "@/services/home.api";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/");
}

// Organization structured data for search engines. Home page only.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Electrosteel Castings Limited",
  alternateName: "ECL",
  url: "https://www.electrosteel.com/",
  logo: "https://www.electrosteel.com/images/logo.png",
  sameAs: [
    "https://www.facebook.com/ElectrosteelGroup/",
    "https://x.com/ElectrosteelG",
    "https://www.instagram.com/electrosteel_group",
    "https://www.youtube.com/@electrosteelgroupofficial9185",
    "https://www.linkedin.com/company/18119245/",
    "https://en.wikipedia.org/wiki/Electrosteel_Castings",
  ],
};

const page = async () => {
  const HomeData = await getHomeListing();

  // Schema is static, so keep it even when the CMS call fails.
  if (!HomeData || HomeData?.error) {
    return (
      <>
        <JsonLd data={organizationJsonLd} />
        <SomethingWentWrong />
      </>
    );
  }

  return (
    <>
      <JsonLd data={organizationJsonLd} />
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
