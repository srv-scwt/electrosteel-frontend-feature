import React from 'react'
import HeroSection from '@/components/common/heroSection'
import GridTwoSection from '@/components/common/GridTwoSection';
import CardSection from './_components/cardSection';
import JointingSystemSection from '../_components/jointingSystemsSection';
import ProductDetailsSection from './_components/productDetails';
import ApplicationSection from '../_components/applicationSection';
import ProtectionSystemSectionInternal from './_components/protectionSectionInternal';
import { divalvesPInternal, divalvesproductDetails } from '../data/m.data';
import ChooseElectrosteelContent from './_components/chooseContent';
import { getValves } from '@/services/product/valves.api';
import SomethingWentWrong from '@/components/common/SomethingWentsWrong';
import { getFinishedProductByCategory } from '@/services/product/otherProducts/FinishedProductByCategory.api';
import { createImageSourceURL } from '@/utils';

const page = async () => {
  const valvesData = await getValves();
  const ProductsData = await getFinishedProductByCategory("valvesprductlist");

  if (!valvesData || valvesData.error) return <SomethingWentWrong />

  const boxdata = [
    {
      title: valvesData?.data?.parsedDIValvesExploreourProductRange?.title,
      description: valvesData?.data?.parsedDIValvesExploreourProductRange?.description,
      image: valvesData?.data?.parsedDIValvesExploreourProductRange?.image,
      btn_title: "View Product Brochures",
      link: valvesData?.data?.parsedDIValvesExploreourProductRange?.url,
    },
    {
      title: valvesData?.data?.parsedDIValvesGotaQuery?.title,
      description: valvesData?.data?.parsedDIValvesGotaQuery?.description,
      image: valvesData?.data?.parsedDIValvesGotaQuery?.image,
      btn_title: "Connect Us Now",
      link: valvesData?.data?.parsedDIValvesGotaQuery?.url,
    },
  ];

  return (
    <>
      <HeroSection data={valvesData?.data?.heroSection} objectPosition={"object-right"} />
      <GridTwoSection
        data={valvesData?.data?.overview}
        bannerOrder="order-2"
        contentOrder="order-1"
        sectionID="overview"
        showButton={true}
        buttonLink={valvesData?.data?.overview?.url}
        buttonTitle="KNOW MORE"
      />
      <ChooseElectrosteelContent data={valvesData?.data?.inSupport?.[0]} />
      <GridTwoSection data={valvesData?.data?.keyBenefits?.[0]} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} sectionID={"keyBenefits"} className={"!pb-0"} />
      <GridTwoSection
        data={valvesData?.data?.electrosteelValveRange?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-1 lg:order-2"}
        sectionID="valveRange"
        isDownloadLink={true}
        downloadButton={createImageSourceURL(valvesData?.data?.electrosteelValveRange?.[0]?.download_link)}
        objectPosition={"object-contain"}
      />
      <ApplicationSection sectionID={"applications"} data={valvesData?.data?.applications || []} />

      <ProductDetailsSection
        sectionID={"product-details"}
        label={valvesData?.data?.ProductDetails}
        products={ProductsData?.data || []}
        jointingSystemLink={createImageSourceURL(valvesData?.data?.ProductDetails?.download_link)}
      />

      <ProtectionSystemSectionInternal
        data={valvesData?.data?.protectionInternal}
        sectionID={"protection-system"}
      />

      <CardSection data={boxdata} />
    </>
  )
}

export default page;