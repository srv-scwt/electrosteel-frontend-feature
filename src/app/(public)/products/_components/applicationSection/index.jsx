'use client'
import HTMLRender from '@/components/ui/HTMLRender';
import styles from './style.module.css';
import cstyle from '@/app/common.module.css';
import { createImageSourceURL } from '@/utils';
import Image from "next/image";
import { useState } from 'react';

const circleSize = 600;
const iconSize = 100;


const ApplicationSection = ({ sectionID, data = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeData = data[activeIndex];


    // const total = data.\.length;
    const total = data.length;

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <section id={sectionID} className={styles.container}>
            <div className={`grid grid-cols-1 md:grid-cols-[70%_30%] gap-6 ${cstyle.containerLg}`}>
                <div>
                    <div className={cstyle.sectionContent}>
                        <h2>Applications</h2>
                    </div>
                    {/* Mobile Accordion Layout (< 768px) */}
                    <div className="flex md:hidden flex-col gap-2 mt-4">
                        {data?.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <div key={index} className="flex flex-col border-b border-white/20 pb-2">
                                    <button
                                        onClick={() => setActiveIndex(isActive ? -1 : index)}
                                        className={`flex justify-between items-center text-left py-3 font-semibold text-[14px] transition-colors ${isActive ? 'text-[#FDD307]' : 'text-white'}`}
                                    >
                                        <span>{item.title}</span>
                                        <span className="text-xl font-bold">{isActive ? '−' : '+'}</span>
                                    </button>
                                    
                                    <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[2500px] opacity-100 mt-2 mb-4' : 'max-h-0 opacity-0'}`}>
                                        <div className={`${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.Listing}`}>
                                            <div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                    {item?.image1 && (
                                                        <div className="relative w-full h-[200px]">
                                                            <Image
                                                                src={createImageSourceURL(item.image1)}
                                                                alt="Application"
                                                                fill
                                                                className="object-cover rounded-[32px]"
                                                            />
                                                        </div>
                                                    )}
                                                    {item?.image2 && (
                                                        <div className="relative w-full h-[200px]">
                                                            <Image
                                                                src={createImageSourceURL(item.image2)}
                                                                alt="Application"
                                                                fill
                                                                className="object-cover rounded-[32px]"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <HTMLRender htmlString={`${item?.description}`} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Split Layout (>= 768px) */}
                    <div className={`hidden md:grid grid-cols-1 xl:grid-cols-[40%_60%] gap-4`}>
                        <div className={styles.leftUlList}>
                            <ul>
                                {data?.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={activeIndex === index ? styles.active : ""}
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={`${cstyle.customUlListing} ${cstyle.customUlListingWhite} ${styles.Listing} mt-10 xl:mt-0`}>
                            <div>
                                <div className="flex flex-col lg:flex-row h-auto lg:h-[200px] gap-6 mb-8">
                                    <div className="relative w-full lg:w-1/2 h-[200px]">
                                        {activeData?.image1 &&
                                            <Image
                                                src={createImageSourceURL(activeData?.image1)}
                                                alt="Application"
                                                fill
                                                className="object-cover rounded-[32px]"
                                            />
                                        }
                                    </div>

                                    <div className="relative w-full lg:w-1/2 h-[200px]">
                                        {activeData?.image2 &&
                                            <Image
                                                src={createImageSourceURL(activeData?.image2)}
                                                alt="Application"
                                                fill
                                                className="object-cover rounded-[32px]"
                                            />
                                        }
                                    </div>
                                </div>
                                <div>
                                    <HTMLRender htmlString={`${activeData?.description}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    <div
                        className={styles.circle}
                        style={{
                            transform:
                                typeof window !== "undefined" && window.innerWidth >= 640
                                    ? `rotate(-${activeIndex * (360 / total)}deg)`
                                    : "none",
                        }}
                    >
                        {data?.map((item, index) => {

                            const isMobile =
                                typeof window !== "undefined" && window.innerWidth < 640;

                            const angle = (360 / total) * index - 180;

                            const radius = circleSize / 2 - iconSize / 2;

                            const x =
                                radius * Math.cos((angle * Math.PI) / 180);

                            const y =
                                radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <div
                                    key={index}
                                    onClick={() => handleClick(index)}
                                    className={`${styles.iconCircle} ${activeIndex === index ? styles.activeCircle : ""}`}
                                    style={
                                        isMobile
                                            ? {
                                                position: "relative",
                                                left: "unset",
                                                top: "unset",
                                                transform: `scale(${activeIndex === index ? 1.2 : 1})`,
                                            }
                                            : {
                                                left: `calc(50% + ${x}px - ${iconSize / 2}px)`,
                                                top: `calc(50% + ${y}px - ${iconSize / 2}px)`,
                                                transform: `rotate(${activeIndex * (360 / total)}deg)
                                scale(${activeIndex === index ? 1.3 : 1})`,
                                            }
                                    }
                                >
                                    <Image
                                        src={createImageSourceURL(item?.icon)}
                                        alt={item?.title}
                                        fill
                                        className={`object-cover p-4 ${styles.iconbg} brightness-0 invert`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ApplicationSection;