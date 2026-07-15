import PaintApprovalsCard from '@/components/common/card/PaintApprovalsCard';
import React from 'react'
import styles from "@/app/common.module.css";

const BusinessOverview = ({ data }) => {
  return (
    <>
      <section id={"TestPerformed"} className=" bg-[#cccc]">
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <h2>
              <span>{data?.title}</span>
            </h2>
            {data?.description && <p>{data.description}</p>}
          </div>
          <div className="my-6 grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6 items-stretch">
            {Array.isArray(data?.card) && data?.card.map((item, index) => (
              <div key={item?.title} className="h-full">
                <PaintApprovalsCard
                  data={item}
                  isLeft={index % 2 ? true : false}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BusinessOverview