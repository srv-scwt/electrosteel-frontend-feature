import InvestorCategoryPage from "../../../_components/InvestorCategoryPage";
import {
  getInvestorArchivePageConfig,
  InvestorPageConfigObject,
} from "../../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <InvestorCategoryPage
    searchParams={searchParams}
    {...getInvestorArchivePageConfig(
      InvestorPageConfigObject.accountsOfSubsidiaries
    )}
  />
);

export default page;
