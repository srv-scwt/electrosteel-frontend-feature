import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { INVESTOR_PAGE_HERO_CATEGORY_MAP } from "../../_components/investorsHero.data";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getUnclaimedDividendsResponse } from "@/services/investors/investor.api";
import UnclaimedDividends from "./_components/UnclaimedDividends";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/shareholder-information/unclaimed-dividends");
}
const page = async () => {
  const [unclaimedDividendsResponse, heroBanner] = await Promise.all([
    getUnclaimedDividendsResponse(),
    getCommonBanner(
      INVESTOR_PAGE_HERO_CATEGORY_MAP.shareholderInformationUnclaimedDividends
        .category
    ),
  ]);

  if (!unclaimedDividendsResponse || unclaimedDividendsResponse?.error) {
    return <SomethingWentWrong />;
  }

  const heroData = {
    title: heroBanner?.data?.title ?? "Unclaimed Dividends",
    banner: heroBanner?.data?.image ?? "",
  };

  return (
    <>
      <HeroSection data={heroData} />

      <UnclaimedDividends items={unclaimedDividendsResponse?.data || []} />
    </>
  );
};

export default page;
