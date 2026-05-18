import CommonTable from '@/components/common/CommonTable';
import GridTwoSection from '@/components/common/GridTwoSection';
import HeroSection from '@/components/common/heroSection'
import React from 'react'
import ToothGasketRestrained from '../../_components/toothGasketRestrained';
import BoltedRestrainedJoints from '../../_components/boltedRestrainedJoints';
import { BoltedRestrainedData, ElectrolockJoint, flangedPipeHeaders, flangedPipeSections } from '../../data/m.data';
import FlangedJointsTable from '../../_components/flangedJoints';
import MechanicalJoint from '../_components/mechanicalJoint';
import { getDiFittingJointingSystem } from '@/services/product/diFittingJointingSystem.api copy';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';

const page = async () => {
  const DiFittingData = await getDiFittingJointingSystem();
  if (!DiFittingData || DiFittingData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={DiFittingData?.data?.heroData?.[0]} />
      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[4]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"flexible-push"}
      />
      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[5]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        sectionID={"overview"}>
        <CommonTable
          key={DiFittingData?.data?.multi_section?.[5]?.table_data?.title}
          columns={DiFittingData?.data?.multi_section?.[5]?.table_data?.columns}
          rows={DiFittingData?.data?.multi_section?.[5]?.table_data?.rows}
        />
      </GridTwoSection>

      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[6]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"flanged-joints"}
      />
      <FlangedJointsTable
        borderRadiusClass="rounded-[16px]"
        tableHeaders={DiFittingData?.data?.multi_section?.[6]?.table_headers}
        tableData={DiFittingData?.data?.multi_section?.[6]?.table_data}
      />
      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[7]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
      />

      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[8]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"bolted-restrained-joint"}
      />
      <BoltedRestrainedJoints
        label={DiFittingData?.data?.multi_section?.[9]}
        data={DiFittingData?.data?.multi_section?.[9]?.table_data}
        className="[&_.overflow-x-auto]:rounded-t-[16px] [&_.overflow-x-auto]:overflow-hidden"
      />

      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[10]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-2 lg:order-1"}
        sectionID={"boltless-restrained-joint"}
        objectPosition='object-contain'
      />
      <BoltedRestrainedJoints
        label={DiFittingData?.data?.multi_section?.[0]}
        data={DiFittingData?.data?.multi_section?.[0]?.table_data}
        className="[&_.overflow-x-auto]:rounded-t-[16px] [&_.overflow-x-auto]:overflow-hidden"
      />

      <ToothGasketRestrained
        data={DiFittingData?.data?.multi_section?.[1]}
        images={DiFittingData?.data?.multi_section?.[1]?.slider_images || []}
        TableData={DiFittingData?.data?.multi_section?.[1]?.table_data}
      />
      <MechanicalJoint
        data2={DiFittingData?.data?.multi_section?.[3]}
      />
    </>
  )
}

export default page;