"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";

const overseasData = [
    {
        cardName: [
            {
                heading: "Mr. Sunil Katial",
                post: "Chief Executive Officer and Whole-time Director",
                company: "Electrosteel Castings Limited",
                address: [
                    "G. K. Tower, 19 Camac Street,",
                    "Kolkata 700 017",
                ],
                email: "companysecretary@electrosteel.com",
                phone: "+91 33 2283 9990",
            },
        ],
    },
    {
        cardName: [
            {
                heading: "Mr. Ashutosh Agarwal",
                post: "Whole-time Director and CFO",
                company: "Electrosteel Castings Limited",
                address: [
                    "G. K. Tower, 19 Camac Street,",
                    "Kolkata 700 017",
                ],
                email: "companysecretary@electrosteel.com",
                phone: "+91 33 2020 1789",
            },
        ],
    },
    {
        cardName: [
            {
                heading: "Mr. Indranil Mitra",
                post: "Company Secretary",
                company: "Electrosteel Castings Limited",
                address: [
                    "G. K. Tower, 19 Camac Street,",
                    "Kolkata 700 017",
                ],
                email: "companysecretary@electrosteel.com",
                phone: "+91 33 2283 9990",
            },
        ],
    },
];

const EventInformation = () => {
    return (
        <section className="bg-[#004aa1]" id="cardName">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <h2 className="text-[#ffffff]">Authorised KMP to determine materiality of an event/ information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {overseasData.map((item, idx) => (
                            <div
                                key={idx}
                                className={`${commonStyles.cardBox} bg-white p-2 lg:p-[5px] shadow-md border border-white rounded-[12px]`}
                            >
                                {item.cardName.map((cards, index) => (
                                    <div key={index} className="py-3 px-[10px] xl:px-[25px]">
                                        <h4 className="text-sm md:text-lg font-semibold mb-2">
                                            {cards.heading}
                                        </h4>

                                        <p>{cards.post}</p><br />

                                        <p>{cards.company}</p>

                                        <div className="text-[#545454]">
                                            {cards.address.map((line, i) => (
                                                <p key={i}>{line}</p>
                                            ))}
                                        </div>

                                        <p className="text-[#545454]">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href={`mailto:${cards.email}`}
                                                className="text-[#00418e] hover:underline break-all"
                                            >
                                                {cards.email}
                                            </a>
                                        </p>

                                        {cards.phone && (
                                            <p className="text-[#545454]">
                                                <strong>Phone:</strong> {cards.phone}
                                            </p>
                                        )}
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

export default EventInformation