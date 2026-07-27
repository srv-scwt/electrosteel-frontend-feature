import React from 'react'
import styles from "@/app/common.module.css";
import videoCardStyles from "@/components/common/card/VideoImageBadgeCard/style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const BusinessOverview = ({ data }) => {
  return (
    <>
      <section id={"TestPerformed"} className=" bg-[#cccc]">
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing} mb-6`}>
            <HTMLRender htmlString={data?.title} />
            {data?.description && <p>{data.description}</p>}
          </div>
          <div className="my-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch justify-items-center">
            {Array.isArray(data?.card) && data?.card.map((item, index) => (
              <div key={item?.title} className="flex justify-center w-full">
                <article className={`${videoCardStyles.socialCardWrapper} w-full`} style={{ cursor: 'default', minHeight: '100%' }}>
                  <div className={videoCardStyles.sectionContent} style={{ paddingTop: 0 }}>
                    <h3>{item?.title}</h3>
                    <HTMLRender htmlString={`<p>${item?.desc}</p>`} />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BusinessOverview