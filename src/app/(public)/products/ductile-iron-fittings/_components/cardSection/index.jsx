"use client"
import React from 'react'
import styles from './style.module.css';
import { ButtonLink } from '@/components/ui/Button';
import Image from 'next/image';
import cstyle from '@/app/common.module.css'
import { createImageSourceURL } from '@/utils';
import HTMLRender from '@/components/ui/HTMLRender';


const CardSection = ({ data = [] }) => {
    console.log(data);
    
    return (
        <section id="ourProductSection" className="bg-[#F5F5F5]">
            <div className={cstyle.containerLg}>
                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {Array.isArray(data) && data?.map((product, index) => {
                        const isLastCol = (index + 1) % 2 === 0;

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
                                        src={createImageSourceURL(product?.image)}
                                        alt={product?.title}
                                        width={48}
                                        height={48}
                                        className="object-contain object-center"
                                    />
                                </div>

                                <div className={cstyle.sectionContent}>
                                    <h4 className='text-[#05509E]'>{product?.title}</h4>
                                    <HTMLRender htmlString={`${product?.description}`} />
                                    <ButtonLink goto={product?.link ?? "#"} title={"View Product Brochures"} className={`${styles.viewBtn} mt-[16px]`} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default CardSection;