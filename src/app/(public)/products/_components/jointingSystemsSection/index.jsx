"use client"
import { ButtonLink, ButtonWithIcon, OutlineButton, OutlineButtonLink } from '@/components/ui/Button';
import Image from 'next/image';
import React, { useState } from 'react'
import styles from './style.module.css'
import cStayle from '@/app/common.module.css'
import { HiDownload } from 'react-icons/hi';
import HTMLRender from '@/components/ui/HTMLRender';
import { createImageSourceURL } from '@/utils';

const JointingSystemSection = ({ sectionID, isDownloadLink = true, label, data = [], jointingSystemLink }) => {
  const limit = 80;
  const [expanded, setExpanded] = useState(false);
  const isLong = data[0].description.length > limit;

  return (
    <section id={sectionID} className="bg-[#F5F5F5]">
      <div className={cStayle.containerLg}>
        {/* Heading */}
        <div className={cStayle.sectionContent}>
          <HTMLRender htmlString={`<h2>${label}</h2>`} />
        </div>
        {/* Grid */}
        <div className="grid my-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {Array.isArray(data) && data?.map((product, index) => {
            const isLastCol = (index + 1) % 3 === 0;

            const borderClasses = [
              !isLastCol ? "border-r" : "",
              "border-gray-200",
            ].join(" ");

            return (
              <div
                key={index}
                className={`flex flex-row lg:gap-0 md:gap-0 md:flex-col lg:flex-col ${borderClasses} ${styles.productBoxContainer}`}>
                <div className={styles.productIcon}>
                  <Image
                    src={createImageSourceURL(product?.icon)}
                    alt={product?.title}
                    width={48}
                    height={48}
                    className="object-contain object-center"
                  />
                </div>

                <div className={styles.sectionContent}>
                  <h4>{product?.title}</h4>
                  <p>
                    {expanded
                      ? product?.description
                      : product?.description.slice(0, limit)}
                    {isLong && (
                      <span
                        onClick={() => setExpanded(!expanded)}
                        className="text-blue-600 cursor-pointer ml-2"
                      >
                        {expanded ? "product.description" : ". . ."}
                      </span>
                    )}
                  </p>
                  <div className='flex gap-3 items-center flex-wrap justify-between'>
                    <ButtonLink goto={product?.sectionID} title={"More"} className={styles.moreBtn} />
                    {isDownloadLink && (
                      <OutlineButtonLink
                        goto={createImageSourceURL(product?.link)}
                        title={"Download"}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex w-full items-center justify-center pt-6'>
          <OutlineButtonLink
            goto={jointingSystemLink}
            title={"Explore Jointing System in Details"}
            className={"font-700"}
          />
        </div>
      </div>
    </section>
  )
}

export default JointingSystemSection;