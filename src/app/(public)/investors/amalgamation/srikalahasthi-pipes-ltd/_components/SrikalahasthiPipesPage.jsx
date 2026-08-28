import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getInvestorResponse } from "@/services/investors/investor.api";
import SrikalahasthiPipesSection from "./SrikalahasthiPipesSection";

const DEFAULT_LIMIT = 12;

function readNumberParam(value, fallback) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

export default async function SrikalahasthiPipesPage({
  searchParams,
  title,
  category,
  titleYearExceptional,
  isLatestValue,
  commonBannerPageName,
  showYearField = true,
  paginate = true,
  defaultLimit = DEFAULT_LIMIT,
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

  const currentPage = readNumberParam(resolvedSearchParams?.page, 1);
  const limit = readNumberParam(resolvedSearchParams?.limit, defaultLimit);

  if (paginate) {
    investorRequest.page = currentPage;
    investorRequest.limit = limit;
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

  const countResults = (payload) =>
    payload?.financialYears?.reduce(
      (sum, item) => sum + (item?.results?.length || 0),
      0
    ) ?? 0;

  let investorData =
    investors?.data?.statusCode == 200 ? investors?.data?.data : investors?.data;
  let activePage = currentPage;

  // A page past the end returns nothing; fall back to the first page rather
  // than showing an empty list with no way back.
  if (paginate && currentPage > 1 && countResults(investorData) === 0) {
    const firstPage = await getInvestorResponse({ ...investorRequest, page: 1 });
    const firstPageData =
      firstPage?.data?.statusCode == 200 ? firstPage?.data?.data : firstPage?.data;

    if (firstPageData) {
      investorData = firstPageData;
      activePage = 1;
    }
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
        data={investorData}
        searchParams={resolvedSearchParams}
        titleYearExceptional={titleYearExceptional}
        showYearField={showYearField}
        paginate={paginate}
        currentPage={activePage}
        limit={limit}
        totalCount={investorData?.totalCount}
      />
    </>
  );
}
