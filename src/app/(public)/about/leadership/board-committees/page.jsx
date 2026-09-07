import HeroSection from "@/components/common/heroSection";
import React from "react";
import CommitteesTable from "./_components/committeeTableSection";
import { getBoardCommittee } from "@/services/boardCommittees.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/about/leadership/board-committees");
}
  const page = async () => {
  const committeesData = await getBoardCommittee();
  
  if(!committeesData || committeesData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={committeesData?.data?.heroSection?.[0]} />
      <CommitteesTable data={committeesData?.data?.committeeMembers} />
    </>
  );
};

export default page;
