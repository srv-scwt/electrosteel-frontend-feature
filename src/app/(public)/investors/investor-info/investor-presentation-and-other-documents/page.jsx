import InvestorCategoryPage from "../../_components/InvestorCategoryPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/investor-info/investor-presentation-and-other-documents");
}
const page = ({ searchParams }) => (
  <InvestorCategoryPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.investorInfoAndInvestorPresentation}
  />
);

export default page;
