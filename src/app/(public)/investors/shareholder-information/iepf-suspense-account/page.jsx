import InvestorCategoryPage from "../../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";
import NodalOfficerSection from "./_components/NodalOfficerSection";

const page = ({ searchParams }) => (
  <InvestorCategoryPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.shareholderInformationTransferOfShareToDematAccountOfIepfAuthority}
  >
    <NodalOfficerSection />
  </InvestorCategoryPage>
);

export default page;
