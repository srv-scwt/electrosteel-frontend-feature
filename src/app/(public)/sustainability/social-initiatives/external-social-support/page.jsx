
import React from "react";
import HeroSection from "@/components/common/heroSection";
import SocialInactiveSection from "@/components/common/socialinactiveSec";
import GridTwoSection from "@/components/common/GridTwoSection";
import { getExternalSocial } from "@/services/externalSocialSupport.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/sustainability/social-initiatives/external-social-support");
}
const page = async () => {
  const ExternalSocial = await getExternalSocial();
  if (!ExternalSocial || ExternalSocial.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={ExternalSocial?.data?.heroData?.[0]} />
      <SocialInactiveSection data={ExternalSocial?.data?.topSection?.[0]} />

      {ExternalSocial?.data?.multi_section?.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <GridTwoSection
            key={index}
            data={item}
            bannerOrder={isEven ?
              "order-2 lg:order-1" : "order-2"
            }
            contentOrder={isEven ?
              "order-1 lg:order-2" : "oreder-1"
            }
            sectionID=""
            className={index === 0 ? "!mt-8" : ""}
            isDarkSection={isEven}
          />
        );
      })}
    </>
  );
};

export default page;

