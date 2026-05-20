import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import InvestorCategoryPage from "../../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";
import SectionTitleDesc from "@/components/common/SectionTitleDesc";

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
