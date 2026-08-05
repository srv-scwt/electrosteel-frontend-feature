import HeroSection from "@/components/common/heroSection";
import React from "react";
import CommitteesTable from "./_components/committeeTableSection";
import { getBoardCommittee } from "@/services/boardCommittees.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

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
