import HeroSection from '@/components/common/heroSection'
import React from 'react'
import GridTwoSection from '@/components/common/GridTwoSection';
import { getPrestigious } from '@/services/prestigious.api';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/innovation-and-technology/prestigious-projects");
}
const page = async () => {
  const prestigiousData = await getPrestigious();
  if (!prestigiousData || prestigiousData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={prestigiousData?.data?.hero_data?.[0]} />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section1?.[0]}
        bannerOrder={"order-1"} contentOrder={"order-2"}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section2?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        className={"py-0!"}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section3?.[0]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        isVideo={true}
        isIFrame={true}
      />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section4?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        className={"py-0!"} />
      <GridTwoSection
        data={prestigiousData?.data?.prestigious_project_sectionData?.prestigious_project_section5?.[0]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"} />
    </>
  )
}

export default page