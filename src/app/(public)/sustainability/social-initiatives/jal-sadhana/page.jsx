import React from "react";
import {
  H2HFacts,
  HeroSection,
  JalSadhanaBlog,
  JalSevakSanam,
  OurJourney,
  SustainableWaterMangement,
  WaterHeros,
  WhatIsHappeing,
  WhatisJalSadhana,
  JalManthan,
  JolStuti,
  CaseStudies,
  AudioPopUp
} from "./_components";
import { getJolsadhana } from "@/services/jolsadhana.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/sustainability/social-initiatives/jal-sadhana");
}
const page = async () => {
  const jolsadhanaData = await getJolsadhana();
  if (!jolsadhanaData || jolsadhanaData.error) return <SomethingWentWrong />
  console.log("jolsadhanaData", jolsadhanaData?.data);
  return (
    <>
      <HeroSection data={jolsadhanaData?.data?.heroData} />
      <WhatisJalSadhana
        label={jolsadhanaData?.data?.whatIsJalSadhana}
        data={jolsadhanaData?.data?.whatIsJalSadhana?.slider_images || []}
        rotateImage={jolsadhanaData?.data?.whatIsJalSadhana?.image || null}
      />
      <JalSevakSanam data={jolsadhanaData?.data?.jalSevakSaman?.[0]} />
      <JolStuti data={jolsadhanaData?.data?.jalStuti || []} />
      <JalManthan data={jolsadhanaData?.data?.jalManthan || []} />
      <OurJourney
        label={jolsadhanaData?.data?.ourJourneySectionTitle?.[0]}
        data={jolsadhanaData?.data?.jalJourneyList || []}
      />
      <SustainableWaterMangement />
      <CaseStudies data={jolsadhanaData?.data?.jalCaseStudies || []} />
      <AudioPopUp />
    </>
  );
};

export default page;
