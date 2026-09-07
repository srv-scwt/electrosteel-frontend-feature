import React from 'react'
import HeroSection from '@/components/common/heroSection'
import GridTwoSection from '@/components/common/GridTwoSection';
import ChooseElectrosteel from './_components/chooseSection';
import CardSection from './_components/cardSection';
import JointingSystemSection from '../_components/jointingSystemsSection';
import ApplicationSection from '../_components/applicationSection';
import ProtectionSystemSection from '../_components/protectionSystemSection';
import { getDuctileIronFittings } from '@/services/product/ductileIronFittings.api';
import SomethingWentWrong from '@/components/common/SomethingWentWrong';
import { createImageSourceURL } from '@/utils';



import { buildMetadataForPathname } from "@/utils/seo";

// Declared per route so the pathname is known at build time. The shared
// layout previously derived it from headers(), which is a request-time API
// and opted every public page out of Next's Full Route Cache.
export async function generateMetadata() {
  return buildMetadataForPathname("/products/ductile-iron-fittings");
}
const page = async () => {
  const DuctileIronFittingsData = await getDuctileIronFittings();
  if (!DuctileIronFittingsData || DuctileIronFittingsData.error) return <SomethingWentWrong />

  const boxdata = [
    {
      title: DuctileIronFittingsData?.data?.exploreProductRange[0]?.title,
      description: DuctileIronFittingsData?.data?.exploreProductRange[0]?.description,
      image: DuctileIronFittingsData?.data?.exploreProductRange[0]?.image,
      link: DuctileIronFittingsData?.data?.exploreProductRange[0]?.url,
      btn_title: "View Product Brochures",
    },
    {
      title: DuctileIronFittingsData?.data?.gotAQuery[0]?.title,
      description: DuctileIronFittingsData?.data?.gotAQuery[0]?.description,
      image: DuctileIronFittingsData?.data?.gotAQuery[0]?.image,
      link: DuctileIronFittingsData?.data?.gotAQuery[0]?.url,
      btn_title: "Connect Us Now",
    },
  ];
  return (
    <>
      <HeroSection data={DuctileIronFittingsData?.data?.heroSection} />
      <GridTwoSection data={DuctileIronFittingsData?.data?.overview} bannerOrder={"order-2"} contentOrder={"order-1"} />
      <ChooseElectrosteel data={DuctileIronFittingsData?.data?.whyChooseElectrosteel?.[0]} />
      <GridTwoSection data={DuctileIronFittingsData?.data?.productDetails} bannerOrder={"order-1 lg:order-2"} contentOrder={"order-2 lg:order-1"} sectionID={"product-details"} className={"!pb-0"} />
      <GridTwoSection
        data={DuctileIronFittingsData?.data?.electrosteelFittingsRange?.[0]}
        bannerOrder={"order-1 lg:order-2"}
        contentOrder={"order-1 lg:order-2"}
        isDownloadLink={true}
        downloadButton={createImageSourceURL(DuctileIronFittingsData?.data?.electrosteelFittingsRange?.[0]?.download_link)}
      />
      <ApplicationSection sectionID={"applications"} data={DuctileIronFittingsData?.data?.applications || []} />

      <JointingSystemSection
        sectionID={"jointing-systems"}
        label={DuctileIronFittingsData?.data?.jointingSystem?.title}
        data={DuctileIronFittingsData?.data?.jointingSystem?.systems || []}
        jointingSystemLink={"/products/ductile-iron-fittings/jointing-systems"}
      />

      <ProtectionSystemSection data={DuctileIronFittingsData?.data?.protectionInternal} className={"!pb-0"} sectionID={"protection-system"} />
      <ProtectionSystemSection data={DuctileIronFittingsData?.data?.protectionExternal} sectionID={"protection-system-external"} />
      <CardSection data={boxdata || []} />
    </>
  )
}

export default page;