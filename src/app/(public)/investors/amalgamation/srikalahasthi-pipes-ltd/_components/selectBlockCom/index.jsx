import Image from "next/image";
import React from "react";
import { OutlineButtonLink } from '@/components/ui/Button';
//import styles from "@/app/common.module.css";

const  SectionBlock = ({ title, results }) => (
    <div className="mt-12">
        <h4 className="text-3xl font-semibold text-primaryBlue">
            <span>{title}</span>
        </h4>

        {results.map((file, idx) => (
            <div
                key={idx}
                className="flex flex-col md:flex-row justify-between md:items-center gap-5 mt-[26px]"
            >
                <div className="flex gap-4 items-center">
                    <div className="relative w-[30px] h-[30px]">
                        <Image
                            src="/images/icons/pdf.png"
                            alt="PDF Icon"
                            fill
                            className="object-contain"
                        />
                    </div>

                    <p className="font-medium">{file.fileName}</p>
                </div>

                <OutlineButtonLink goto={file.fileLink} title="Download" />
            </div>
            //  <InvestorCard key={idx} post={file} />
        ))}
    </div>
);


const SectionBlockNew = ({ title, results }) => (
    <div className="mt-12">

        {/* Section Title */}
        <h4 className="text-3xl font-semibold text-primaryBlue mb-4">
            <span>{title} </span>
        </h4>

        {/* Year Blocks */}
        {results.map((yearBlock, idx) => (
            <div key={idx} className="mt-8">

                {/* YEAR TITLE (optional for empty year) */}
                {yearBlock.year && (
                    <h5 className="text-xl font-semibold text-gray-700 mb-3">
                        {yearBlock.year}
                    </h5>
                )}

                {/* FILE ITEMS */}
                {yearBlock.items.map((file, itemIdx) => (
                    <div
                        key={itemIdx}
                        className="flex flex-col md:flex-row justify-between md:items-center gap-5 mt-[22px]"
                    >
                        <div className="flex gap-4 items-center">
                            <div className="relative w-[30px] h-[30px]">
                                <Image
                                    src="/images/icons/pdf.png"
                                    alt="PDF Icon"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <p className="font-medium">{file.fileName}</p>
                        </div>

                        <OutlineButtonLink goto={file.fileLink} title="Download" />
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export {SectionBlock, SectionBlockNew};