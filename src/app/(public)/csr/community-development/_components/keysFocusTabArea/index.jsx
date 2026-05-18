"use client";
import React from "react";
import styles from "@/app/common.module.css";
import CommonTab from "@/components/common/CommonTab";
import Image from "next/image";

const KeysFocusTabArea = () => {
    const tabsData = [
        {
            id: "education",
            title: "Education",
            icon: "/images/icons/icon11.png",
            content: (
                <>
                    <p className='mb-3'>At Electrosteel, we strongly believe that one of the greatest and long last legacies we can offer to the local communities is education. We take active initiatives to improve educational infrastructure and encourage more and more children to go to school.</p>
                    <p className='mb-3'><strong>Some of these education initiatives include -</strong></p>
                    <div className={styles.customUlListing}>
                        <ul>
                            <li>Financial support to ensure continuous infrastructural development at local schools and educational institutes</li>
                            <li>Encouraging talent by rewarding good and bright students</li>
                            <li>Health and Safety Awareness initiatives for local school children</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {["community_healthcare_thumb1", "community_healthcare_thumb2", "community_healthcare_thumb3"].map(
                            (img, i) => (
                                <div key={i} className="relative shadow-md">
                                    <Image
                                        src={`/images/csr/${img}.jpg`}
                                        alt="img"
                                        fill
                                        className="!relative object-cover"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </>
            ),
        },
        {
            id: "healthcare",
            title: "Healthcare",
            icon: "/images/icons/icon12.png",
            content: (
                <>
                    <p className='mb-3'>A healthy community is a happy community and Electrosteel is committed in this belief. The Company supports continuous improvement in healthcare facilities for the local populace in and around its surrounding areas.</p>
                    <p className='mb-3'><strong>Some of these healthcare initiatives include the following -</strong></p>
                    <div className={styles.customUlListing}>
                        <ul>
                            <li>Free medical checkups and blood donation camps</li>
                            <li>Setting up charitable homeopathy clinics</li>
                            <li>Organizing charitable eye camps</li>
                            <li>Distribution of free medicine</li>
                            <li>Distribution of free blankets during winter</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {["community_health_thumb", "community_health_thumb2", "community_health_thumb3"].map(
                            (img2, i) => (
                                <div key={i} className="relative shadow-md">
                                    <Image
                                        src={`/images/csr/${img2}.jpg`}
                                        alt="img"
                                        fill
                                        className="!relative object-cover"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </>
            ),
        },
        {
            id: "infrastructure",
            title: "Infrastructure",
            icon: "/images/icons/icon13.png",
            content: (
                <>
                    <p className='mb-3'>At Electrosteel, we are committed to the well-being of the community around our areas of operations and actively support various infrastructural development activities.</p>
                    <p className='mb-3'><strong>Some of these infrastructure initiatives include -</strong></p>
                    <div className={styles.customUlListing}>
                        <ul>
                            <li>Setting up of drinking water kiosks</li>
                            <li>Street lighting in adjoining villages</li>
                            <li>Digging and upgrading of ponds on a regular basis in and around local villages</li>
                            <li>Financial support to local schools and civic bodies to construct necessary facilities</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {["infra_thubmb_n1", "infra_thubmb_n2", "infra_thubmb_n3"].map(
                            (img3, i) => (
                                <div key={i} className="relative shadow-md">
                                    <Image
                                        src={`/images/csr/${img3}.jpg`}
                                        alt="img"
                                        fill
                                        className="!relative object-cover"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </>
            ),
        },
        {
            id: "sports",
            title: "Sports",
            icon: "/images/icons/icon14.png",
            content: (
                <>
                     <p className='mb-3'>At Electrosteel, we are committed to the well-being of the community around our areas of operations and actively support various infrastructural development activities.</p>
                    <p className='mb-3'><strong>Some of these infrastructure initiatives include -</strong></p>
                    <div className={styles.customUlListing}>
                        <ul>
                            <li>Setting up of drinking water kiosks</li>
                            <li>Street lighting in adjoining villages</li>
                            <li>Digging and upgrading of ponds on a regular basis in and around local villages</li>
                            <li>Financial support to local schools and civic bodies to construct necessary facilities</li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {["sports_thubmb_n1", "sports_thubmb_n2", "sports_thubmb_n3"].map(
                            (img4, i) => (
                                <div key={i} className="relative shadow-md">
                                    <Image
                                        src={`/images/csr/${img4}.jpg`}
                                        alt="img"
                                        fill
                                        className="!relative object-cover"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </>
            ),
        },
    ];

    return (
        <section className="bg-[#f9f9f9]">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <h2 className="text-center !w-full">
                        Key <span>CSR Focus</span> Areas
                    </h2>
                    <CommonTab tabsData={tabsData} />
                </div>
            </div>
        </section>
    );
};

export default KeysFocusTabArea;
