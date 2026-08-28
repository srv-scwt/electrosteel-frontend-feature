import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getInvestorResponse } from "@/services/investors/investor.api";
import FinancialReportsSection from "./FinancialReportsSection";

const DEFAULT_LIMIT = 12;

function readNumberParam(value, fallback) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

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
  paginate = true,
  defaultLimit = DEFAULT_LIMIT,
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
  const currentPage = readNumberParam(resolvedSearchParams?.page, 1);
  const limit = readNumberParam(resolvedSearchParams?.limit, defaultLimit);
  const investorRequest = {
    category,
    year: selectedYear,
  };

  if (paginate) {
    investorRequest.page = currentPage;
    investorRequest.limit = limit;
  }

  if (resolvedIsLatestValue !== undefined) {
    investorRequest.is_latest = resolvedIsLatestValue;
  }

  // The year dropdown used to need its own request; the main response now
  // carries a flat `years` list covering every year in the category, so one
  // request serves both the results and the filter.
  const [Investors, heroBanner] = await Promise.all([
    getInvestorResponse(investorRequest),
    commonBannerPageName
      ? getCommonBanner(commonBannerPageName)
      : Promise.resolve({ data: null, error: null }),
  ]);

  if (!Investors || Investors?.error) return <SomethingWentWrong />;

  // A page number past the end (hand-edited URL, or a stale link after records
  // were removed) comes back empty with totalCount 0, which would render an
  // empty list and no controls to get back. Fall back to the first page.
  const countResults = (payload) =>
    payload?.financialYears?.reduce(
      (sum, item) => sum + (item?.results?.length || 0),
      0
    ) ?? 0;

  let investorData = Investors?.data?.data;
  let activePage = currentPage;

  if (paginate && currentPage > 1 && countResults(investorData) === 0) {
    const firstPage = await getInvestorResponse({ ...investorRequest, page: 1 });

    if (firstPage?.data?.data) {
      investorData = firstPage.data.data;
      activePage = 1;
    }
  }

  const heroData = {
    title: heroBanner?.data?.title ?? title,
    image: heroBanner?.data?.image ?? "",
    banner: "/images/board/policies_banner_large.jpg",
  };

  //console.log("investorData", investorData);

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
        data={investorData}
        yearData={investorData}
        yearFieldDropdown={yearFieldDropdown}
        searchParams={resolvedSearchParams}
        paginate={paginate}
        currentPage={activePage}
        limit={limit}
        totalCount={investorData?.totalCount}
      />
    </>
  );
}
