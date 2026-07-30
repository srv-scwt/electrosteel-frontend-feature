import React from 'react'
import cstyle from "@/app/common.module.css";
import styles from "../../ductile-iron-fittings/_components/chooseSection/style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";

const BusinessOverview = ({ data }) => {
  const listItemsHtml = Array.isArray(data?.card) 
    ? data.card.map(item => `<li><strong>${item.title}:</strong> ${item.desc}</li>`).join('')
    : '';

  const fullDescriptionHtml = `
    <p>${data?.description || ''}</p>
    <ul>${listItemsHtml}</ul>
  `;

  return (
    <section id={"TestPerformed"} className={`${styles.backgroundImg} bg-[url('/images/product-details/PaintBanner-2.png')]`}>
      <div className={styles.container}>
        <div className={`${cstyle.sectionContent} ${styles.title}`}>
          <HTMLRender htmlString={data?.title} />
        </div>
        <div className={`${cstyle.sectionContent} pl-3 lg:pl-0 ${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.listWhite} !text-white`}>
          <HTMLRender htmlString={fullDescriptionHtml} />
        </div>
      </div>
    </section>
  )
}

export default BusinessOverview