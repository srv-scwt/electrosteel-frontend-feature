
import React from "react";
import HeroSection from "@/components/common/heroSection";
import SocialInactiveSection from "@/components/common/socialinactiveSec";
import GridTwoSection from "@/components/common/GridTwoSection";
import { getExternalSocial } from "@/services/externalSocialSupport.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

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

