import SrikalahasthiPipesMainPage from "../_components/SrikalahasthiPipesMainPage";
import {
  getInvestorArchivePageConfig,
  InvestorPageConfigObject,
} from "../../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <SrikalahasthiPipesMainPage
    searchParams={searchParams}
    {...getInvestorArchivePageConfig(
      InvestorPageConfigObject.amalgamationSrikalahasthiPipesLtd
    )}
  />
);

export default page;
