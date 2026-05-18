"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import { OutlineButtonLink } from '@/components/ui/Button';
import CommonTab from '@/components/common/CommonTab';
import Image from 'next/image';
import Link from 'next/link';

const EnvironmentComplianceReports = () => {
    const EnvironmentTabsData = [
        {
            id: "tab1",
            title: "Haldia Ferro Alloy Plant",
            content: (
                <>
                    <h2>Haldia Ferro Alloy Plant</h2>
                    <div
                        className={`${styles.pdfLinkBox} flex gap-3 items-center bg-white h-full mb-5`}
                    >
                        <div className="relative w-[30px] h-[30px] flex-shrink-0">
                            <Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain" />
                        </div>
                        <p className="w-full">
                            <Link
                                href="/"
                                className="text-[#545454] hover:text-[#00418e] transition-colors duration-200"
                            >
                                Environmental Clearance of Ferro Alloy Plant at Haldia
                            </Link>
                        </p>
                    </div>
                    <div className='flex items-center gap-4 justify-between mb-4 flex-wrap md:flex-nowrap'>
                        <p className='!font-bold'>Six-Monthly Environmental Clearance Compliance Reports</p>
                        <div className='flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto'>
                            <label className='whitespace-nowrap text-[#545454]'>Find Compliance Reports</label>
                            <select className='border border-gray-300 p-3 rounded-md focus:outline-none w-full sm:w-auto text-[#545454]'>
                                <option value="">All</option>
                                <option value="">FY 2025-26</option>
                                <option value="">FY 2025-27</option>
                                <option value="">FY 2025-28</option>
                                <option value="">FY 2025-29</option>
                            </select>
                        </div>
                    </div>
                    {/* while all select repeat box */}
                    <div className='each-item flex item-center gap-4 md:gap-[40px] lg:gap-[80px] bg-gray-50 p-3 md:p-[30px] border border-gray-200 overflow-x-auto sm:overflow-visible'>
                        <div className="leftContent">
                            <p className='whitespace-normal md:whitespace-nowrap !text-[#00418e] !font-bold'>FY 2025-26</p>
                        </div>
                        <div className="rightContent w-full">
                            <div className={styles.customUlListing}>
                                <ul>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>Six Monthly EC Compliance (October-24 to March-25)</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>Six Monthly EC Compliance (October-24 to March-25)</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            id: "tab2",
            title: "Srikalahasthi Works",
            content: (
                <>
                    <h2>Srikalahasthi Works</h2>
                    <div className='flex items-center gap-4 justify-between mb-4 flex-wrap md:flex-nowrap'>
                        <p className='!font-bold'>Six-Monthly Environmental Clearance Compliance Reports</p>
                        <div className='flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto'>
                            <label className='whitespace-nowrap'>Find Compliance Reports</label>
                            <select className='border border-gray-300 p-3 rounded-md focus:outline-none w-full sm:w-auto text-[#545454]'>
                                <option value="">All</option>
                                <option value="">FY 2025-26</option>
                                <option value="">FY 2025-27</option>
                                <option value="">FY 2025-28</option>
                                <option value="">FY 2025-29</option>
                            </select>
                        </div>
                    </div>
                    {/* while all select repeat box */}
                    <div className='each-item flex item-center gap-4 md:gap-[40px] lg:gap-[80px] bg-gray-50 p-3 md:p-[30px] border border-gray-200 overflow-x-auto sm:overflow-visible'>
                        <div className="leftContent">
                            <p className='whitespace-normal md:whitespace-nowrap !text-[#00418e] !font-bold'>FY 2025-26</p>
                        </div>
                        <div className="rightContent w-full">
                            <div className={styles.customUlListing}>
                                <ul>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>BMW Annual Report 2024</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>Six Monthly EC Compliance (October-24 to March-25)</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },
        {
            id: "tab3",
            title: "Khardah Works",
            content: (
               <>
                    <h2>Srikalahasthi Works</h2>
                    <div className='flex items-center gap-4 justify-between mb-4 flex-wrap md:flex-nowrap'>
                        <p className='!font-bold'>Six-Monthly Environmental Clearance Compliance Reports</p>
                        <div className='flex flex-wrap sm:flex-nowrap items-center gap-4 w-full sm:w-auto'>
                            <label className='whitespace-nowrap'>Find Compliance Reports</label>
                            <select className='border border-gray-300 p-3 rounded-md focus:outline-none w-full sm:w-auto text-[#545454]'>
                                <option value="">All</option>
                                <option value="">FY 2025-26</option>
                                <option value="">FY 2025-27</option>
                                <option value="">FY 2025-28</option>
                                <option value="">FY 2025-29</option>
                            </select>
                        </div>
                    </div>
                    {/* while all select repeat box */}
                    <div className='each-item flex item-center gap-4 md:gap-[40px] lg:gap-[80px] bg-gray-50 p-3 md:p-[30px] border border-gray-200 overflow-x-auto sm:overflow-visible'>
                        <div className="leftContent">
                            <p className='whitespace-normal md:whitespace-nowrap !text-[#00418e] !font-bold'>FY 2025-26</p>
                        </div>
                        <div className="rightContent w-full">
                            <div className={styles.customUlListing}>
                                <ul>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>BMW Annual Report 2025</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/" className='flex justify-between items-center text-[#545454] hover:text-[#00418e] transition-colors duration-200 gap-5'>
                                            <span className='!w-full'>UNGC CERTIFICATE ELECTROSTEEL (KHARDAH WORKS)</span>
                                            <span className='!w-full flex items-center gap-3 justify-end text-end !pl-3'><Image src="/images/icons/pdf.png" alt="pdf icon" fill className="object-contain !relative !w-[24px] !h-[24px]" />Download</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ),
        },

    ];
    return (
        <section className="">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <CommonTab tabsData={EnvironmentTabsData} />
                </div>
            </div>
        </section>
    )
}

export default EnvironmentComplianceReports