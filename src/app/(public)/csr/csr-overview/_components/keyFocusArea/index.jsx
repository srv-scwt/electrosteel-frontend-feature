"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';
import { OutlineButtonLink } from '@/components/ui/Button';

const KeyFocusAreaSection = () => {
  return (
    <section className="bg-[url('/images/csr/csr-section-bg.png')] bg-cover bg-no-repeat bg-center">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center">
          {/* Left Image */}
          <div className="relative w-full h-64 md:h-80 overflow-hidden">
            <Image
              src="/images/csr/community_thumb1.jpg"
              alt="img"
              fill
              className="object-cover"
            />
          </div>
          {/* Right Content */}
          <div className={styles.sectionContent}>
            <h2 className='!w-full'>Key <span>Focus</span> Area</h2>
            <p className='!font-bold !uppercase !text-[#004aa1]'>
              Community
            </p>
            <p className='mb-4'>Uplifting the community through active CSR in the areas of Health, Education, Empowerment, Infrastructure Development and Sports.</p>
            <OutlineButtonLink
              goto={"/csr/community-development"}
              title={"Community Development Initiatives"}
            />
          </div>

          
        </div>
      </div>
    </section>
  )
}

export default KeyFocusAreaSection