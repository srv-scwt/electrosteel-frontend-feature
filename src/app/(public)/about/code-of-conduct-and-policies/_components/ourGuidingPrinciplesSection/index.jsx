"use client"
import Image from 'next/image';
import React from 'react';
import styles from '@/app/common.module.css';

const OurGuidingPrinciplesSection = () => {
    return (
        <section className="">
            <div className={styles.containerLg}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start'>
                    {/* left Content */}
                    <div className={styles.sectionContent}>
                        <h2>
                            Our <span>guiding principles</span> that lead us towards success
                        </h2>
                        <p>
                            Electrosteel in its business principles and operations is guided by a set of policies that ensure the organisation and its team members work in alignment to these.
                            The Company is committed to deliver the best to its customers and maintain high standards at all times by adhering to a set of guiding principles.
                        </p>
                    </div>
                    {/* right Image */}
                    <div className="relative w-full h-64 md:h-70 xl:h-[350px] overflow-hidden shadow-md">
                        <Image
                            src="/images/corporateProfileImg.jpg"
                            alt="Factory"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}

export default OurGuidingPrinciplesSection