import GridTwoSection from "@/components/common/GridTwoSection";
import React from "react";
import styles from "@/app/common.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { getDiFittingJointingSystem } from "@/services/product/diFittingJointingSystem.api";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

const MechanicalJoint = async ({ data2 }) => {
  const DiFittingData = await getDiFittingJointingSystem();
  if (!DiFittingData || DiFittingData.error) return <SomethingWentWrong />

  return (
    <>
      <GridTwoSection
        data={DiFittingData?.data?.multi_section?.[2]}
        bannerOrder={"order-1"}
        contentOrder={"order-2"}
        sectionID={"express-mechanical-joint"}
      />
      <section className="">
        <div className={`${styles.containerLg} !mt-0 !pt-0`}>
          <div
            className={`${styles.sectionContent} ${styles.customUlListing}`}
          >
            {data2?.title && (
              <HTMLRender htmlString={data2?.title} />
            )}
            <HTMLRender htmlString={data2?.description} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MechanicalJoint;
