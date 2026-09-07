import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getInvestorResponse } from "@/services/investors/investor.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import NewslettersListingSection from "./_components/newlettersListingSection";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/newsroom/newsletters");
}
const NEWSLETTER_CATEGORY = "newsLetterDocs";

// Newsletters are filtered and paged by the calendar year printed on each
// issue, which cuts across the API's financial-year buckets, so the whole list
// has to be here to group it. The API now defaults to 10 records per request,
// hence the explicit high limit -- raise it if the archive ever outgrows it.
const ALL_RECORDS_LIMIT = 500;

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;

  const [newsletters, homeBanner] = await Promise.all([
    getInvestorResponse({
      category: NEWSLETTER_CATEGORY,
      limit: ALL_RECORDS_LIMIT,
    }),
    getCommonBanner("Newsletter")
  ]);

  if (!newsletters || newsletters?.error) {
    return <SomethingWentWrong />;
  }
  return (
    <>
      <HeroSection
        data={{
          title: homeBanner?.data?.title ?? "Newsletters",
          image: homeBanner?.data?.image ?? "",
          banner: "/images/board/newsletters_banner_large.jpg",
        }}
      />
      <NewslettersListingSection
        data={newsletters?.data?.data}
        searchParams={resolvedSearchParams}
      />
    </>
  );
};

export default page;
