import SrikalahasthiPipesPage from "../../amalgamation/srikalahasthi-pipes-ltd/_components/SrikalahasthiPipesPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/shareholder-information/unclaimed-dividends-archive");
}
const page = ({ searchParams }) => (
  <SrikalahasthiPipesPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.shareholderInformationUnclaimedDividends}
  />
);

export default page;
