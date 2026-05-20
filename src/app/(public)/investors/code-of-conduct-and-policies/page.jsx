import SectionTitleDesc from "@/components/common/SectionTitleDesc";
import { getCommonProductsCategory } from "@/services/commonP/commonProductsCat";
import InvestorCategoryPage from "../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../_components/investorpage.data";

const page = async ({ searchParams }) => {
  const codeConductContent = await getCommonProductsCategory(
    "code-of-conduct-policies-content"
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
      {...InvestorPageConfigObject.codeOfConductAndPoliciesOverview}
    >
      {showOverview ? (
        <div id="overview">
          <SectionTitleDesc data={overviewData} />
        </div>
      ) : null}
    </InvestorCategoryPage>
  );
};

export default page;
