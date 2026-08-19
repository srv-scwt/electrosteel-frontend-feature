import InvestorCategoryPage from "../../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";

const page = ({ searchParams }) => (
  <InvestorCategoryPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.generalMeetingAndPostalBallotsVotingResults}
    archieveLink={""}
  />
);

export default page;
