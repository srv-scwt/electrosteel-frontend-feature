"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const CsrObjectives = () => {
  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2>
              CSR <span>Objectives</span>
            </h2>
            <p className='mb-4'><strong>Electrosteel's CSR projects aim towards bringing a holistic development of the individual and the society. Our primary goals are:</strong></p>
            <div className={styles.customUlListing}>
              <ul>
                <li>To develop an equitable society by helping to create and foster livelihood opportunities for the underprivileged and marginalized communities.</li>
                <li>To impact the socio-economic life of the lesser privileged in the vicinity of our plants and to bring about sustainable development in the area.</li>
                <li>To encourage and stimulate community participation</li>
                <li>To create an enabling environment that promotes mutual trust and benefit for the community at large.</li>
              </ul>
            </div>

          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-[416px]  overflow-hidden">
            <Image
              src="/images/csr/carv_road.png"
              alt="img"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CsrObjectives