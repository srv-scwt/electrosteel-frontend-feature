import React from 'react'
import Image from "next/image";
import cstyle from "@/app/common.module.css";
import styles from "../../ductile-iron-fittings/_components/chooseSection/style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

const BusinessOverview = ({ data, badges = [] }) => {
  const listItemsHtml = Array.isArray(data?.card)
    ? data.card.map(item => `<li><strong>${item.title}:</strong> ${item.desc}</li>`).join('')
    : '';

  const fullDescriptionHtml = `
    <p>${data?.description || ''}</p>
    <ul>${listItemsHtml}</ul>
  `;

  return (
    <section 
      id={"TestPerformed"} 
      className={`${styles.backgroundImg}`}
      style={{ backgroundImage: `url('${data?.image ? createImageSourceURL(data.image) : '/images/product-details/PaintBanner-2.png'}')` }}
    >
      <div className={styles.container}>
        <div className={`${cstyle.sectionContent} ${styles.title}`}>
          <HTMLRender htmlString={data?.title} />
        </div>
        <div className={`${cstyle.sectionContent} pl-3 lg:pl-0 ${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.listWhite} !text-white`}>
          <HTMLRender htmlString={fullDescriptionHtml} />
          {Array.isArray(badges) && badges.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-start gap-3 sm:gap-4 items-center">
              {badges.map((badge, index) => (
                <div key={badge?.label || index} className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-white rounded-md p-1 border border-gray-100 shadow-sm">
                  <Image
                    src={createImageSourceURL(badge?.image)}
                    alt={badge?.label || "Approval"}
                    width={80}
                    height={80}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default BusinessOverview