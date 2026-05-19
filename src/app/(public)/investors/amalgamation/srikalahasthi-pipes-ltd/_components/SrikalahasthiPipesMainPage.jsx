import HeroSection from "@/components/common/heroSection/";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getCommonBanner } from "@/services/commonBanner/commonBanner.api";
import { getSrikalahasthiMainResponse } from "@/services/investors/investor.api";
import SrikalahasthiPipesSection from "./SrikalahasthiPipesSection";

function normalizeFilterValue(value) {
  const normalizedValue = Array.isArray(value) ? value[0] : value;

  if (
    normalizedValue === undefined ||
    normalizedValue === null ||
    normalizedValue === ""
  ) {
    return 1;
  }

  const parsedValue = Number(normalizedValue);

  return Number.isNaN(parsedValue) ? 1 : parsedValue;
}

function normalizeSrikalahasthiDocuments(data = [], isLatestValue = 1) {
  const financialYearMap = new Map();

  data.forEach((section, sectionIndex) => {
    const sectionTitle = section?.section_title?.toString().trim() || "";
    const groupedData = Array.isArray(section?.data) ? section.data : [];

    groupedData.forEach((group, groupIndex) => {
      const heading = group?.title?.toString().trim() || "";
      const yearGroups = Array.isArray(group?.data) ? group.data : [];

      yearGroups.forEach((yearGroup, yearIndex) => {
        const year = yearGroup?.year?.toString().trim() || "";
        const documents = Array.isArray(yearGroup?.data) ? yearGroup.data : [];
        const results = documents
          .filter((item) => {
            if (
              item?.is_latest === undefined ||
              item?.is_latest === null ||
              item?.is_latest === ""
            ) {
              return isLatestValue === 1;
            }

            return Number(item.is_latest) === isLatestValue;
          })
          .map((item, itemIndex) => ({
            ...item,
            id:
              item?.id ||
              [
                section?.id || sectionIndex,
                sectionTitle || "section",
                heading || "heading",
                year || "year",
                itemIndex,
              ].join("-"),
            src: item?.src?.replaceAll("\\", "/"),
          }));

        if (!results.length) {
          return;
        }

        const financialYearKey = [
          sectionTitle || sectionIndex,
          heading || groupIndex,
          year || yearIndex,
        ].join("::");
        const existingFinancialYear = financialYearMap.get(financialYearKey) || {
          year,
          heading,
          section_title: sectionTitle,
          results: [],
          id:
            yearGroup?.id ||
            [
              section?.id || sectionIndex,
              group?.id || groupIndex,
              year || yearIndex,
            ].join("-"),
          resultKeys: new Set(),
        };

        results.forEach((item) => {
          const resultKey = [
            item?.title || "",
            item?.date || "",
            item?.src || "",
            item?.category || "",
            item?.is_latest ?? "",
          ].join("::");

          if (existingFinancialYear.resultKeys.has(resultKey)) {
            return;
          }

          existingFinancialYear.resultKeys.add(resultKey);
          existingFinancialYear.results.push(item);
        });

        financialYearMap.set(financialYearKey, existingFinancialYear);
      });
    });
  });

  return {
    financialYears: Array.from(financialYearMap.values()).map(
      ({ resultKeys, ...financialYear }) => financialYear
    ),
  };
}

export default async function SrikalahasthiPipesMainPage({
  searchParams,
  title,
  titleYearExceptional,
  isLatestValue,
  commonBannerPageName,
}) {
  const resolvedSearchParams = await searchParams;
  const resolvedIsLatestValue = normalizeFilterValue(isLatestValue);

  const [investors, heroBanner] = await Promise.all([
    getSrikalahasthiMainResponse(),
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

  const normalizedData = normalizeSrikalahasthiDocuments(
    investors?.data,
    resolvedIsLatestValue
  );

  return (
    <>
      <HeroSection data={heroData} />

      <SrikalahasthiPipesSection
        data={normalizedData}
        searchParams={resolvedSearchParams}
        titleYearExceptional={titleYearExceptional}
      />
    </>
  );
}
