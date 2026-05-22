import CommonTable from "@/components/common/CommonTable";
import GridTwoSection from "@/components/common/GridTwoSection";
import HeroSection from "@/components/common/heroSection";
import React from "react";
import BoltedRestrainedJoints from "../../_components/boltedRestrainedJoints";
import FlangedJointsTable from "../../_components/flangedJoints";
import { getDipipesJointingSystem } from "@/services/product/dipipesJointingSystem.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import ToothGasketRestrained from "../../_components/toothGasketRestrained";

const page = async () => {
  const DipipesJointingSystem = await getDipipesJointingSystem();
  if (!DipipesJointingSystem || DipipesJointingSystem.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection
        data={DipipesJointingSystem?.data?.heroData?.[0]}
      />
      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[0]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"flexible-push"}
        objectPosition="object-contain"
      />
      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[1]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        sectionID={"overview"}
        objectPosition="object-contain"
        className={"!py-0"}
      >
        <CommonTable
          key={DipipesJointingSystem?.data?.multi_section?.[1]?.table_data?.title}
          columns={DipipesJointingSystem?.data?.multi_section?.[1]?.table_data?.columns}
          rows={DipipesJointingSystem?.data?.multi_section?.[1]?.table_data?.rows}
          className={"!mt-0"}
        />
      </GridTwoSection>

      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[2]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"flanged-joints"}
      />
      <FlangedJointsTable
        borderRadiusClass="rounded-[16px]"
        tableHeaders={DipipesJointingSystem?.data?.multi_section?.[2]?.table_headers}
        tableData={DipipesJointingSystem?.data?.multi_section?.[2]?.table_data2}
      />

      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[3]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
      />

      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[4]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"bolted-restrained-joint"}
        objectPosition="object-contain"
        className={"!pt-0"}
      />
      <BoltedRestrainedJoints
        label={DipipesJointingSystem?.data?.multi_section?.[5]}
        data={DipipesJointingSystem?.data?.multi_section?.[5]?.table_data}
        CommonTableClass={`mt-4!`}
        className="[&_.overflow-x-auto]:rounded-t-[16px] [&_.overflow-x-auto]:overflow-hidden"
      />

      <GridTwoSection
        data={DipipesJointingSystem?.data?.multi_section?.[6]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        sectionID={"boltless-restrained-joint"}
        objectPosition="object-contain"
        className={"!pb-0"}
      />
      <BoltedRestrainedJoints
        label={DipipesJointingSystem?.data?.multi_section?.[7]}
        data={DipipesJointingSystem?.data?.multi_section?.[7]?.table_data}
        title={DipipesJointingSystem?.data?.multi_section?.[7]?.table_data?.title}
        roundedCLass={"rounded-t-[0px]!"}
        CommonTableClass={`mt-0!`}
        className="[&_.overflow-x-auto]:rounded-t-[16px] [&_.overflow-x-auto]:overflow-hidden"
      />

      <ToothGasketRestrained
        data={DipipesJointingSystem?.data?.multi_section?.[8]}
        images={DipipesJointingSystem?.data?.multi_section?.[8]?.images || []}
        TableData={DipipesJointingSystem?.data?.multi_section?.[8]?.table_data}
      />
    </>
  );
};

export default page;
