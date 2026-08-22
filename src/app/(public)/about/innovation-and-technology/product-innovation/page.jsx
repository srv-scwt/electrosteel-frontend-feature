import HeroSection from '@/components/common/heroSection'
import React from 'react'
import { ElectrolockJoint } from './_components'
import GridTwoSection from '@/components/common/GridTwoSection';
import { getProductInnovation } from '@/services/productInnovation.api';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';


const page = async () => {
    const productInnovationData = await getProductInnovation();
    if (!productInnovationData || productInnovationData?.error) return <SomethingWentWrong />

    return (
      <>
        <HeroSection data={productInnovationData?.data?.[0]?.data} />
        <ElectrolockJoint data={productInnovationData?.data?.[1]?.data} />
        <GridTwoSection data={productInnovationData?.data?.[2]?.data} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} className={"pt-0!"} />
        <GridTwoSection data={productInnovationData?.data?.[3]?.data} bannerOrder={"order-1"} contentOrder={"order-2"} className={"py-0!"} />
        <GridTwoSection data={productInnovationData?.data?.[4]?.data} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} isDownloadLink={true} downloadButton="https://www.electrosteel.com/electrosteel-static-assets/1787398528955-16000052_Electro_Puc_16_05_22.pdf" />
      </>
    )
  }

export default page