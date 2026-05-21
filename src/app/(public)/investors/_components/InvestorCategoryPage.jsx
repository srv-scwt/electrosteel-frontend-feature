import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getInvestorResponse } from "@/services/investors/investor.api";
import FinancialReportsSection from "./FinancialReportsSection";

export default async function InvestorCategoryPage({
  searchParams,
  title,
  category,
  filterTitle,
  titleYearExceptional,
  archieveLink,
  archieveLabel = "View Archive",
  yearFieldDropdown = false,
  headingField = false,
  latestFeild = false,
  showTitle = true,
  sectionTitle = false,
  isLatestValue,
  commonBannerPageName,
  children,
}) {
  const resolvedSearchParams = await searchParams;
  const selectedYear =
    yearFieldDropdown && resolvedSearchParams?.year !== "all"
      ? resolvedSearchParams?.year
      : "";
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

  const [InvestorsYear, Investors, heroBanner] = await Promise.all([
    yearFieldDropdown
      ? getInvestorResponse({
          category,
          is_latest:
            resolvedIsLatestValue !== undefined ? resolvedIsLatestValue : 1,
        })
      : Promise.resolve({ data: null, error: null }),
    getInvestorResponse(investorRequest),
    commonBannerPageName
      ? getCommonBanner(commonBannerPageName)
      : Promise.resolve({ data: null, error: null }),
  ]);

  if (!Investors || Investors?.error) return <SomethingWentWrong />;

  const heroData = {
    title: heroBanner?.data?.title ?? title,
    image: heroBanner?.data?.image ?? "",
    banner: "/images/board/policies_banner_large.jpg",
  };

  return (
    <>
      <HeroSection data={heroData} />
      {children}

      <FinancialReportsSection
        archieveLink={archieveLink}
        archieveLabel={archieveLabel}
        filterTitle={filterTitle}
        heading={title}
        headingField={headingField}
        latestFeild={latestFeild}
        showTitle={showTitle}
        sectionTitle={sectionTitle}
        titleYearExceptional={titleYearExceptional}
        data={Investors?.data?.data}
        yearData={InvestorsYear?.data?.data}
        yearFieldDropdown={yearFieldDropdown}
        searchParams={resolvedSearchParams}
      />
    </>
  );
}
