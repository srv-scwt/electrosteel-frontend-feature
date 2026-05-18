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
            <div className={`grid grid-cols-1 sm:grid-cols-[70%_30%] gap-6 ${cstyle.containerLg}`}>
                <div>
                    <div className={cstyle.sectionContent}>
                        <h2>Application</h2>
                    </div>
                    <div className={`grid grid-cols-1 xl:grid-cols-[40%_60%] gap-4`}>
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
                <div>
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
                                        className={`object-cover ${styles.iconbg}`}
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