import HeroSection from '@/components/common/heroSection';
import React from 'react';
import PushOnJointsSection from './_components/pushOnJointsSection';
import PermissibleTableOne from './_components/permissibleTableOne';
import FlangedJointsSection from './_components/flangedJointsSection';
import BoltedRestrainedJoints from './_components/boltedRestrainedJoints';
import PermissibleTableTwo from './_components/permissibleTableTwo';
import ElectrolockJoint from './_components/electrolockJoint';
import PermissibleTableThree from './_components/permissibleTableThree';
import ToothGasketRestrainedJoints from './_components/toothGasketRestrainedJoints';
import PermissibleTableFour from './_components/permissibleTableFour';
import ExpressMechanicalJointFittings from './_components/expressMechanicalJointFittings';


import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/investors/jointing-system");
}
const page = () => {
  return (
    <>
        <HeroSection data={{title: "Jointing Systems" , banner:`/images/board/policies_banner_large.jpg`}} />
        <PushOnJointsSection />
        <PermissibleTableOne />
        <FlangedJointsSection />
        <BoltedRestrainedJoints />
        <PermissibleTableTwo />
        <ElectrolockJoint />
        <PermissibleTableThree />
        <ToothGasketRestrainedJoints />
        <PermissibleTableFour />
        <ExpressMechanicalJointFittings />
    </>
  )
}

export default page