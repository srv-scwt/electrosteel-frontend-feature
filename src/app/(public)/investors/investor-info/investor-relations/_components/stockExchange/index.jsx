"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";

const overseasData = [
    {
        cardName: [
            {
                heading: "Equity shares:",
                isinNo: "ISIN: INE086A01029",
                company: "BSE Limited",
                address: [
                    "P. J. Towers, Dalal Street,",
                    "Mumbai 400 001",
                ],
                code: "Stock Code: 500128",
            },
        ],
    },
    {
        cardName: [
            {
                company: "BSE Limited",
                address: [
                    "P. J. Towers, Dalal Street,",
                    "Mumbai 400 001",
                ],
                code: "Stock Code: 500128",
            },
        ],
    },
];

const StockExchangeInfo = () => {
    return (
        <section className="bg-white" id="cardName">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <h2>Stock Exchange Info</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {overseasData.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-[#004aa1] p-5 lg:p-[30px] shadow-md border border-[#004aa1] rounded-[12px]`}
                            >
                                {item.cardName.map((cards, index) => (
                                    <div key={index} className="py-5 p-[40px]">
                                        <h4 className="!text-white">
                                            {cards.heading}
                                        </h4>

                                        <h4 className="!text-white">
                                            {cards.isinNo}
                                        </h4>

                                        <p className="!text-white">{cards.company}</p>

                                        <div>
                                            {cards.address.map((line, i) => (
                                                <p className="!text-white" key={i}>{line}</p>
                                            ))}
                                        </div>

                                        <p className="!text-white">{cards.code}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StockExchangeInfo;