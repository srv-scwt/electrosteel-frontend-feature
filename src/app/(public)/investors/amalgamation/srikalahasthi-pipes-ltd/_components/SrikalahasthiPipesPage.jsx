import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getInvestorResponse } from "@/services/investors/investor.api";
import SrikalahasthiPipesSection from "./SrikalahasthiPipesSection";

export default async function SrikalahasthiPipesPage({
  searchParams,
  title,
  category,
  titleYearExceptional,
  isLatestValue,
  commonBannerPageName,
}) {
  const resolvedSearchParams = await searchParams;
  const selectedYearParam = Array.isArray(resolvedSearchParams?.year)
    ? resolvedSearchParams.year[0]
    : resolvedSearchParams?.year;
  const selectedYear =
    selectedYearParam && selectedYearParam !== "all" ? selectedYearParam : "";
  const resolvedIsLatestValue =
    isLatestValue !== undefined && isLatestValue !== null && isLatestValue !== ""
      ? Number(isLatestValue)
      : undefined;
  const investorRequest = {
    category,
    year: selectedYear,
  };

  if (resolvedIsLatestValue !== undefined) {
    investorRequest.is_latest = resolvedIsLatestValue;
  }

  const [investors, heroBanner] = await Promise.all([
    getInvestorResponse(investorRequest),
    commonBannerPageName
      ? getCommonBanner(commonBannerPageName)
      : Promise.resolve({ data: null, error: null }),
  ]);

  if (!investors || investors?.error) {
    return <SomethingWentWrong />;
  }

  const heroData = {
    title: heroBanner?.data?.title ?? title,
    image: heroBanner?.data?.image ?? "",
    banner: "/images/board/policies_banner_large.jpg",
  };

  return (
    <>
      <HeroSection data={heroData} />

      <SrikalahasthiPipesSection
        data={investors?.data}
        searchParams={resolvedSearchParams}
        titleYearExceptional={titleYearExceptional}
      />
    </>
  );
}
