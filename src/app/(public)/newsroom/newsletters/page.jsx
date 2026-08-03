import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getInvestorResponse } from "@/services/investors/investor.api";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { createImageSourceURL } from "@/utils";
import NewslettersListingSection from "./_components/newlettersListingSection";

const NEWSLETTER_CATEGORY = "newsLetterDocs";

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const selectedYearParam = Array.isArray(resolvedSearchParams?.year)
    ? resolvedSearchParams.year[0]
    : resolvedSearchParams?.year;
  const selectedYear =
    selectedYearParam && selectedYearParam !== "all" ? selectedYearParam : "";

  const [newslettersYear, newsletters, homeBanner] = await Promise.all([
    getInvestorResponse({
      category: NEWSLETTER_CATEGORY,
    }),
    getInvestorResponse({
      category: NEWSLETTER_CATEGORY,
      year: selectedYear,
    }),
    getCommonBanner("Newsletter")
  ]);

  if (
    !newsletters ||
    newsletters?.error ||
    !newslettersYear ||
    newslettersYear?.error
  ) {
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
        yearData={newslettersYear?.data?.data}
        searchParams={resolvedSearchParams}
      />
    </>
  );
};

export default page;
