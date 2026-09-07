import SrikalahasthiPipesMainPage from "./_components/SrikalahasthiPipesMainPage";
import { InvestorPageConfigObject } from "../../_components/investorpage.data";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/amalgamation/srikalahasthi-pipes-ltd");
}
const page = ({ searchParams }) => (
  <SrikalahasthiPipesMainPage
    searchParams={searchParams}
    {...InvestorPageConfigObject.amalgamationSrikalahasthiPipesLtd}
  />
);

export default page;
