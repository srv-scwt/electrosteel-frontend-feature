import SrikalahasthiPipesPage from "../../amalgamation/srikalahasthi-pipes-ltd/_components/SrikalahasthiPipesPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <SrikalahasthiPipesPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.shareholderInformationUnclaimedDividends}
  />
);

export default page;
