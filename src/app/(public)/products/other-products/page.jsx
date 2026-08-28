import React from "react";
import HeroSection from "@/components/common/heroSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import TwoGridImageSection from "@/components/common/TwoGridImageSection";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { getOtherProductsAll } from "@/services/product/otherProducts/otherProductsAll.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";
import { getFinishedProductByCategory } from "@/services/product/otherProducts/FinishedProductByCategory.api";
import CardSection from "./_components/cardSection";

const Page = async () => {
  // Independent requests, run concurrently instead of as a serial waterfall.
  const [OtherProductsData, FinishedProductData, SemiFinishedProductData] = await Promise.all([
    getOtherProductsAll(),
    getFinishedProductByCategory("otherProductsfinishedProduct"),
    getFinishedProductByCategory("otherProductssemiFinishedProduct"),
  ]);

  const boxdata = [
    {
      title: "Explore our Product Range",
      description: "Check our complete portfolio of products.",
      image: "https://www.electrosteel.com/electrosteel-static-assets/1786014019518-file-1778767728765-684139422.webp",
      btn_title: "View Product Brochures",
      link: "/resource-and-download/brochure",
    },
    {
      title: "Got a Query?",
      description: "Submit your enquiry here, and our team will get back to you.",
      image: "https://www.electrosteel.com/electrosteel-static-assets/1786014406057-file-1778761081430-589725434.webp",
      btn_title: "Enquire Now",
      link: "/connect/business-enquiry",
    },
  ];

  if (!OtherProductsData || OtherProductsData.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={OtherProductsData?.data?.heroSection} />
      {/* Finished Products Heading */}
      <section>
        <div className={`${styles.containerLg} !pb-0`}>
          <div className={`${styles.sectionContent}`}>
            <h2>
              Finished <span>Products</span>
            </h2>
          </div>
        </div>
      </section>
      {FinishedProductData?.data?.map((item, index) => {
        const isEven = index % 2 === 0;

        return (
          <GridTwoSection
            key={item?.id || index}
            data={item}
            bannerOrder={
              isEven
                ? "order-1"
                : "order-1 lg:order-2"
            }
            contentOrder={
              isEven
                ? "order-2"
                : "order-2 lg:order-1"
            }
            sectionID={
              item?.title
                ?.replace(/<[^>]*>/g, "")
                ?.toLowerCase()
                ?.replace(/\s+/g, "-")
            }
          />
        )
      })};
      {/* Semi-Finished Products Heading */}
      <section>
        <div className={`${styles.containerLg} !py-0`}>
          <div className={`${styles.sectionContent} `}>
            <h2>
              Semi-Finished<span> Products</span>
            </h2>
          </div>
        </div>
      </section>
      <div>
        {SemiFinishedProductData?.data?.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <GridTwoSection
              key={item?.id || index}
              data={item}
              bannerOrder={
                isEven
                  ? "order-2"
                  : "order-2 lg:order-1"
              }
              contentOrder={
                isEven
                  ? "order-1"
                  : "order-1 lg:order-2"
              }
              sectionID={
                item?.title
                  ?.replace(/<[^>]*>/g, "")
                  ?.toLowerCase()
                  ?.replace(/\s+/g, "-")
              }
            />
          );
        })}
      </div>

      <TwoGridImageSection
        data={OtherProductsData?.data?.otherProductsGallery1?.[0]}
        data1={OtherProductsData?.data?.otherProductsGallery2?.[0]}
      />
      <CardSection data={boxdata} />
    </>
  );
};

export default Page;
