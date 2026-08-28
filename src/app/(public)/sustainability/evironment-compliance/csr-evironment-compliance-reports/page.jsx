import styles from "@/app/common.module.css";
import CommonTab from "@/components/common/CommonTab";
import HeroSection from "@/components/common/heroSection";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import FinancialReportsSection from "@/app/(public)/investors/_components/FinancialReportsSection";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getInvestorResponse } from "@/services/investors/investor.api";
import {
  csrEnvironmentComplianceHero,
  csrEnvironmentComplianceSections,
} from "./csr-environment-compliance-reports.data";

// Each tab shows every report for its plant and filters by year in the browser,
// so the whole category has to be fetched. The API defaults to 10 records per
// request, which was hiding older reports and emptying the year filter.
const ALL_RECORDS_LIMIT = 500;

export default async function page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  const [heroBanner, ...sectionResponses] = await Promise.all([
    getCommonBanner(csrEnvironmentComplianceHero.commonBannerPageName),
    ...csrEnvironmentComplianceSections.map((section) =>
      getInvestorResponse({
        category: section.category,
        limit: ALL_RECORDS_LIMIT,
      })
    ),
  ]);

  // Each plant is an independent category, so one failing feed should only drop
  // its own tab - bail out completely when none of them could be loaded.
  const tabsData = csrEnvironmentComplianceSections
    .map((section, index) => {
      const response = sectionResponses[index];

      if (!response || response?.error) return null;

      return {
        id: section.key,
        title: section.title,
        content: (
          <FinancialReportsSection
            data={response?.data?.data}
            yearData={response?.data?.data}
            searchParams={resolvedSearchParams}
            heading={section.title}
            titleYearExceptional={section.titleYearExceptional}
            filterTitle={section.filterTitle}
            subHeading={section.subHeading}
            headingLink={section.headingLink}
            yearQueryKey={section.yearQueryKey}
            yearFieldDropdown={true}
            titleFollowsYear={false}
            headingField={false}
            latestFeild={false}
            containerClassName=""
          />
        ),
      };
    })
    .filter(Boolean);

  if (!tabsData.length) return <SomethingWentWrong />;

  const heroData = {
    title: heroBanner?.data?.title ?? csrEnvironmentComplianceHero.title,
    image: heroBanner?.data?.image ?? "",
    banner: csrEnvironmentComplianceHero.banner,
  };

  return (
    <>
      <HeroSection data={heroData} />

      <section>
        <div className={styles.containerLg}>
          <div className={styles.sectionContent}>
            <CommonTab
              tabsData={tabsData}
              tabListClassName="!justify-start mb-10"
            />
          </div>
        </div>
      </section>
    </>
  );
}
