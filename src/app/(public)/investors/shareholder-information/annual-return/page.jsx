import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import InvestorCategoryPage from "../../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";
import SectionTitleDesc from "@/components/common/SectionTitleDesc";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/shareholder-information/annual-return");
}
const page = async({ searchParams }) => {
  const codeConductContent = await getCommonProductsCategory(
      "annual-returns-content"
    );
    const overviewData = {
      title: codeConductContent?.data?.[0]?.title ?? "",
      description: codeConductContent?.data?.[0]?.description ?? "",
    };
    const showOverview = Boolean(
      overviewData.title?.trim() || overviewData.description?.trim()
    );
  return (
  <InvestorCategoryPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.shareholderInformationAnnualReturn}
  >
        {showOverview ? (
          <SectionTitleDesc data={overviewData} />
      ) : null}
      </InvestorCategoryPage>
)};

export default page;
