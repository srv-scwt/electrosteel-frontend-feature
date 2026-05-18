import React from 'react'
import styles from "@/app/common.module.css"
import Image from 'next/image'
import { createImageSourceURL } from '@/utils'
import HTMLRender from '@/components/ui/HTMLRender'
const TwoGridImageSection = ({ data, data1 }) => {
  return (
    <>
      <section>
        <div className={styles.containerLg}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* IMAGE 1 */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[320px] lg:h-[430px]">
              <Image
                src={createImageSourceURL(data?.image)}
                alt="Image 1"
                fill
                className="object-cover"
              />

              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#004aa1] text-white text-center text-sm py-2 px-3 rounded-b-lg">
                <div className={styles.sectionContent}>
                  <HTMLRender htmlString={`<h4>${data?.title}</h4>`} />
                </div>
              </div>
            </div>

            {/* IMAGE 2 */}
            <div className="relative w-full h-[280px] sm:h-[340px] md:h-[320px] lg:h-[430px]">
              <Image
                src={createImageSourceURL(data1?.image)}
                alt="Image 2"
                fill
                className="object-cover"
              />

              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#004aa1] text-white text-center text-sm py-2 px-3 rounded-b-lg">
                <div className={styles.sectionContent}>
                  <HTMLRender htmlString={`<h4>${data1?.title}</h4>`} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default TwoGridImageSection