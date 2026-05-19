import SrikalahasthiPipesMainPage from "./_components/SrikalahasthiPipesMainPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <SrikalahasthiPipesMainPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.amalgamationSrikalahasthiPipesLtd}
  />
);

export default page;
