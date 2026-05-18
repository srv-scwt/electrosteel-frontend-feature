import React from "react";
import HeroSection from "@/components/common/heroSection";
import GridTwoSection from "@/components/common/GridTwoSection";
import TwoGridImageSection from "@/components/common/TwoGridImageSection";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { getOtherProductsAll } from "@/services/product/otherProducts/otherProductsAll.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
import { getFinishedProductByCategory } from "@/services/product/otherProducts/FinishedProductByCategory.api";

const Page = async () => {
  const OtherProductsData = await getOtherProductsAll();
  const FinishedProductData = await getFinishedProductByCategory("otherProductsfinishedProduct");
  const SemiFinishedProductData = await getFinishedProductByCategory("otherProductssemiFinishedProduct");

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
                : "order-1"
            }
            contentOrder={
              isEven
                ? "order-2"
                : "order-2"
            }
            sectionID={
              item?.title
                ?.replace(/<[^>]*>/g, "")
                ?.toLowerCase()
                ?.replace(/\s+/g, "-")
            }
            className={"!py-0"}
          />
        )
      })};
      {/* Semi-Finished Products Heading */}
      <section>
        <div className={`${styles.containerLg} !pb-0`}>
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
              className={
                index === 1
                  ? "!pt-4"
                  : index !== SemiFinishedProductData?.data?.length - 1
                    ? "!py-2"
                    : ""
              }
            />
          );
        })}
      </div>

      <TwoGridImageSection
        data={OtherProductsData?.data?.otherProductsGallery1?.[0]}
        data1={OtherProductsData?.data?.otherProductsGallery2?.[0]}
      />
    </>
  );
};

export default Page;
