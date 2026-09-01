import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getExtraInvestorResponse } from "@/services/investors/investor.api";
import FinancialReportsSection from "../_components/FinancialReportsSection";
import { normalizeExtraInvestors } from "./normalizeExtraInvestors";

const CATEGORY = "extra-compliance-report";
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

  const complianceReports = await getExtraInvestorResponse({
    category: CATEGORY,
    page: currentPage,
    limit,
  });

  if (!complianceReports || complianceReports?.error) {
    return <SomethingWentWrong />;
  }

  const { sections, pagination } = complianceReports.data ?? {};
  const normalized = normalizeExtraInvestors(sections, pagination);

  const data = {
    ...normalized,
    // FinancialReportsSection keys each block on `year` first, and two sections
    // can share a year ("Share Holding Pattern" and "Corporate Governance" are
    // both 2021-2022), which collides. Dropping it lets the key fall back to
    // the heading, which carries the year and is unique.
    financialYears: normalized.financialYears.map(
      ({ year, ...section }) => section
    ),
  };

  const heroData = {
    title: "Compliance Report",
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
        heading="Compliance Report"
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
