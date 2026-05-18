import React from 'react'
import styles from "@/app/common.module.css";
import SectionCard from '@/components/common/SectionCard';
import HTMLRender from '@/components/ui/HTMLRender';

const WorldClassSection = ({data}) => {

  return (
    <>
     <section id={"world-class-raw-materials-and-global-approvals"} className="!pt-0">
        <div className={`${styles.containerLg} !pt-0`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={data?.title} />
           {data?.description && <HTMLRender htmlString={data.description} />}
          </div>
          <div className='my-6'>
            <SectionCard data={data?.card} />
          </div>
        </div>
      </section>
    </>
  )
}

export default WorldClassSection