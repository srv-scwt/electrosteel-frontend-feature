import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getInvestorResponse } from "@/services/investors/investor.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import NewslettersListingSection from "./_components/newlettersListingSection";

const NEWSLETTER_CATEGORY = "newsLetterDocs";

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;

  // Newsletters are filtered by the calendar year on each item, which cuts
  // across the API's financial-year buckets, so fetch the full list and
  // narrow it in the listing section.
  const [newsletters, homeBanner] = await Promise.all([
    getInvestorResponse({
      category: NEWSLETTER_CATEGORY,
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
