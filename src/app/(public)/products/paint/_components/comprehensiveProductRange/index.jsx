"use client"
import React, { useState } from 'react'
import styles from '@/app/(public)/products/_components/jointingSystemsSection/style.module.css'
import cStayle from '@/app/common.module.css'
import HTMLRender from '@/components/ui/HTMLRender'

const ComprehensiveProductRange = ({ data, isGrey = true }) => {
    const limit = 80;
    const [expandedIndexes, setExpandedIndexes] = useState({});

    const toggleExpand = (index) => {
        setExpandedIndexes(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    if (!data || !data.card) return null;

    return (
        <section id="comprehensive-product-range" className={isGrey ? "bg-[#F5F5F5]" : ""}>
            <div className={cStayle.containerLg}>
                {/* Heading */}
                <div className={`${cStayle.sectionContent}`}>
                    <HTMLRender htmlString={data?.title} />
                    {data?.description && <HTMLRender htmlString={data.description} />}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px]">
                    {data.card.map((product, index) => {
                        const isLastCol = (index + 1) % 4 === 0;

                        const borderClasses = [
                            !isLastCol ? "lg:border-r border-gray-200" : "",
                        ].join(" ");

                        const isExpanded = expandedIndexes[index];
                        const isLong = product.desc && product.desc.length > limit;

                        return (
                            <div
                                key={index}
                                className={`group flex flex-row lg:gap-0 md:gap-0 md:flex-col lg:flex-col ${borderClasses} ${styles.productBoxContainer}`}>
                                
                                {/* Icon / Serial Number Wrapper */}
                                <div className={`${styles.productIcon}`}>
                                    <span 
                                        className="font-bold text-3xl lg:text-4xl text-[#05509E] group-hover:text-white transition-colors duration-500 ease-in-out"
                                        style={{ fontFamily: 'var(--font-bebas-neue)' }}
                                    >
                                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </span>
                                </div>

                                <div className={styles.sectionContent}>
                                    <h4>{product.title}</h4>
                                    <p>
                                        {isExpanded || !isLong
                                            ? product.desc
                                            : product.desc.slice(0, limit)}
                                        {isLong && (
                                            <span
                                                onClick={() => toggleExpand(index)}
                                                className="text-blue-600 cursor-pointer ml-2"
                                            >
                                                {isExpanded ? " Show Less" : ". . . ."}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default ComprehensiveProductRange;
