"use client"
import CommonTab from '@/components/common/CommonTab';
import React from 'react';
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import Image from 'next/image';

const BottomTabSection = () => {
    const CareersTabsData = [
        {
            id: "tab1",
            title: "Learning and Development",
            content: (
                <>
                    <div className={`${commonStyles.careerTabContent} text-center`}>
                        <p className="mb-3">Innovation has always been at the core of our business and we actively encourage our people to think out of the box. We would like our people to grow and develop with the business, augment their skills and capabilities such that they contribute progressively towards the overall growth of the organisation.</p>
                        <p>Our focus is therefore on nurturing our people through various employee engagement initiatives and continuous training and developmental opportunities to build a capable workforce.</p>
                        <Image
                            src="/images/careers/earnng_info.jpg"
                            alt="image"
                            fill
                            className="object-contain !relative mx-auto mt-5 sm:mt-[100px] !w-[481px]"
                        />
                    </div>
                </>
            ),
        },
        {
            id: "tab2",
            title: "Rewards and Recognitions",
            content: (
                <>
                    <div className={`${commonStyles.careerTabContent} text-center`}>
                        <p className="mb-3">We believe in recognising silent performers. We identify and acknowledge performers through our PMS Processes and various rewards and recognition systems.</p>

                        <p className="mb-3">Well thought out Employee Recognition Programs and Policies are also in place to encourage employees to improve continuously and create an environment of creativity and innovation.</p>

                        <p>Our HR Policies, guidelines and practices ensure all decisions relating to recruitment, promotion, compensation and career progression are based solely on merit.</p>
                        <Image
                            src="/images/careers/earnng_info.jpg"
                            alt="image"
                            fill
                            className="object-contain !relative mx-auto mt-5 sm:mt-[100px] !w-[481px]"
                        />
                    </div>
                </>
            ),
        },
        {
            id: "tab3",
            title: "Work-Life Balance",
            content: (
                <>
                    <div className={`${commonStyles.careerTabContent} text-center`}>
                        <p>A happy workforce is a healthy workforce and our employee policies are pivoted around this belief. We strive to ensure a healthy, safe and clean working environment for our employees across locations. We believe our employees can contribute 100% towards the growth of the business if they lead a happy, healthy and balanced life. To facilitate this, we have introduced an app – EmpWin – that helps employees connect with each other both on a professional and personal level.</p>
                        <Image
                            src="/images/careers/earnng_info.jpg"
                            alt="image"
                            fill
                            className="object-contain !relative mx-auto mt-5 sm:mt-[100px] !w-[481px]"
                        />
                    </div>
                </>
            ),
        },
        {
            id: "tab4",
            title: "Employee Volunteerism",
            content: (
                <>
                    <div className={`${commonStyles.careerTabContent} text-center`}>
                        <p>We ensure our employees enjoy a healthy and peaceful family life and be an active and engaged member of the society through our CSR processes and systems. Electrosteel actively pursues CSR initiatives and also encourages its workforce to bring about a positive change in the lives of the people around its areas of operation. The Electrosteel team participates in a range of social initiatives in the areas of education, healthcare, infrastructure, empowerment and sports.</p>
                        <Image
                            src="/images/careers/earnng_info.jpg"
                            alt="image"
                            fill
                            className="object-contain !relative mx-auto mt-5 sm:mt-[100px] !w-[481px]"
                        />
                    </div>
                </>
            ),
        },

    ];
    return (
        <section className="">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <CommonTab tabsData={CareersTabsData} />
                </div>
            </div>
        </section>
    )
}

export default BottomTabSection