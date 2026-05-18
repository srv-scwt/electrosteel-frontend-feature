import SrikalahasthiPipesPage from "./_components/SrikalahasthiPipesPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <SrikalahasthiPipesPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.amalgamationSrikalahasthiPipesLtd}
  />
);

export default page;
