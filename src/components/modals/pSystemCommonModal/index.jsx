"use client";

import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import style from "./style.module.css"

const PSystemCommonModal = ({ open, onClose, modalData }) => {
    if (!open || !modalData?.length) return null;

    return (
        <div className="fixed inset-0 top-[75px] flex items-center justify-center shadow-md z-50">
            <div
                className={`relative bg-[#eeeeee] shadow-2xl ${styles.containerLg} px-10`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-[31px] right-[48px] cursor-pointer text-gray-600 hover:text-black"
                >
                    <AiOutlineClose size={32} />
                </button>

                {Array.isArray(modalData) && modalData?.map((item, index) => (
                    <div
                        key={index}
                        className={`flex md:flex-row flex-col gap-8 !max-h-[350px] ${style.modalBox} ${styles.containerModelWrapper}`}
                    >


                        {/* Right Content */}
                        <div className={`${styles.sectionContent} ${styles.textSection} ${styles.customUlListing} ${styles.sectionContent}}`}>

                            {item?.label && (
                                <HTMLRender htmlString={item?.label} />
                            )}
                            {item?.description && (
                                <HTMLRender htmlString={item?.description} />
                            )}

                            {item?.description1 && (
                                <HTMLRender htmlString={item?.description1} />
                            )}

                            {item?.title && <h3>{item?.title}</h3>}
                            {item?.description2 && (
                                <HTMLRender htmlString={item?.description2} />
                            )}
                        </div>

                        {/* Right Image */}
                        {item?.image && (
                            <div className="w-full md:w-[250px] h-full flex-shrink-0">
                                <Image
                                    src={item?.image}
                                    alt={item?.title || "Modal Image"}
                                    width={400}
                                    height={200}
                                    className="object-cover w-full h-full rounded-[12px] shadow-sm"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div >
    );
};

export default PSystemCommonModal;