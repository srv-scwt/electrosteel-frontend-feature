import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getExtraInvestorResponse } from "@/services/investors/investor.api";
import FinancialReportsSection from "../_components/FinancialReportsSection";
import { normalizeExtraInvestors } from "../compliance-report/normalizeExtraInvestors";

const CATEGORY = "extra-agm-egm";
const DEFAULT_LIMIT = 12;

function readNumberParam(value, fallback) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

const page = async ({ searchParams }) => {
  const resolvedSearchParams = await searchParams;
  const currentPage = readNumberParam(resolvedSearchParams?.page, 1);
  const limit = readNumberParam(resolvedSearchParams?.limit, DEFAULT_LIMIT);

  const agmEgm = await getExtraInvestorResponse({
    category: CATEGORY,
    page: currentPage,
    limit,
  });

  if (!agmEgm || agmEgm?.error) {
    return <SomethingWentWrong />;
  }

  const { sections, pagination } = agmEgm.data ?? {};
  const normalized = normalizeExtraInvestors(sections, pagination);

  const data = {
    ...normalized,
    // FinancialReportsSection keys each block on `year` first, which collides
    // when two sections share a year. Dropping it lets the key fall back to
    // the heading, which is unique.
    financialYears: normalized.financialYears.map(
      ({ year, ...section }) => section
    ),
  };

  const heroData = {
    title: "AGM / EGM",
    image: "",
    banner: "/images/board/policies_banner_large.jpg",
  };

  return (
    <>
      <HeroSection data={heroData} />

      <FinancialReportsSection
        data={data}
        yearData={data}
        searchParams={resolvedSearchParams}
        heading="AGM / EGM"
        titleYearExceptional=""
        titleFollowsYear={false}
        headingField={false}
        latestFeild={false}
        sectionTitle
        paginate
        currentPage={currentPage}
        limit={limit}
        totalCount={Number(pagination?.total) || undefined}
      />
    </>
  );
};

export default page;
