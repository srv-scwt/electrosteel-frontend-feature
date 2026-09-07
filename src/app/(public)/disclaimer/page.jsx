import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/disclaimer");
}
const page = async() => {
      const homeBanner = await getCommonBanner("DisclaimerHeroSection");
      const data1 = await getCommonProductsCategory("SettingsDisclaimerContent");

      const heroData = {
        banner: createImageSourceURL(homeBanner?.data?.image) ?? "/images/board/policies_banner_large.jpg",
        title: homeBanner?.data?.title ?? "Disclaimer",
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
