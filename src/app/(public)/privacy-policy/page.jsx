import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";

const page = async () => {
  const homeBanner = await getCommonBanner("PrivacyPolicyHeroSection");
  const data1 = await getCommonProductsCategory("SettingsPrivacyPolicyContent");

  console.log(data1?.data, "d");

  const heroData = {
    banner:
      createImageSourceURL(homeBanner?.data?.image) ??
      "/images/board/policies_banner_large.jpg",
    title: homeBanner?.data?.title ?? "Privacy",
  };

  return (
    <>
      <HeroSection data={heroData} />
      <section>
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={data1?.data?.[0]?.description} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
