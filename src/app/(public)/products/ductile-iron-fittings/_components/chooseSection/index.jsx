import React from 'react'
import styles from './style.module.css';
import cstyle from '@/app/common.module.css';
import HTMLRender from '@/components/ui/HTMLRender';

const ChooseElectrosteel = ({data}) => {
  return (
    <div className={`${styles.backgroundImg} bg-[url('/images/product-details/background-img.jpg')]`}>
      <div className={styles.container}>
        <div className={`${cstyle.sectionContent} ${styles.title}`}>
          <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
        </div>
        <div
          className={`${cstyle.sectionContent} pl-3 lg:pl-0 ${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.listWhite} !text-white`}
        >
          <HTMLRender htmlString={data?.description} />
        </div>
      </div>
    </div>
  )
}

export default ChooseElectrosteel;