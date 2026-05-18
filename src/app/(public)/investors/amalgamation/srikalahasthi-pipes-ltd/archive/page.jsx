import SrikalahasthiPipesPage from "../_components/SrikalahasthiPipesPage";
import {
  getInvestorArchivePageConfig,
  InvestorPageConfigObject,
} from "../../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <SrikalahasthiPipesPage
    searchParams={searchParams}
    {...getInvestorArchivePageConfig(
      InvestorPageConfigObject.amalgamationSrikalahasthiPipesLtd
    )}
  />
);

export default page;
