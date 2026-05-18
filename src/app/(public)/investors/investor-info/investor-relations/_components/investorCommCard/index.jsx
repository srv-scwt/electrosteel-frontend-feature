"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";

const overseasData = [
    {
        cardName: [
            {
                heading: "Registrar and Share Transfer Agent",
                company: "Maheshwari Datamatics Pvt. Ltd.",
                address: [
                    "23 R. N. Mukherjee Road, 5th Floor,",
                    "Kolkata - 700 001,",
                ],
                phone: "(033) 2243 5029/ 2248 2248 / 2231 6839,",
                fax: "(033) 2248 4787",
                email: "info@mdpl.in , mdpldc@yahoo.com",
            },
        ],
    },
    {
        cardName: [
            {
                heading: "Grievance Redressal",
                company: "Mr. Indranil Mitra",
                address: [
                    "Company Secretary",
                    "Electrosteel Castings Limited",
                    "G.K Tower, 19, Camac Street",
                    "Kolkata - 700017",
                ],
                email: "companysecretary@electrosteel.com",
            },
        ],
    },
];

const RegistrarGrievance = () => {

    return (
        <section className="bg-white" id="cardName">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {overseasData.map((item, idx) => (
                            <div
                                key={idx}
                                className={`bg-[#004aa1] p-5 shadow-md border border-[#00000029] rounded-[12px]`}
                            >
                                {item.cardName.map((cards, index) => (
                                    <div key={index} className="p-[40px]">
                                        <h4 className="text-sm md:text-lg font-semibold mb-2 !text-white">
                                            {cards.heading}
                                        </h4>

                                        <p className="!text-white"><strong>{cards.company}</strong></p>

                                        <div>
                                            {cards.address.map((line, i) => (
                                                <p className="!text-white" key={i}>{line}</p>
                                            ))}
                                        </div>

                                        {cards.phone && (
                                            <p className="!text-white">
                                                <strong>Phone:</strong> {cards.phone}
                                            </p>
                                        )}

                                        <p className="!text-white">
                                            <strong>Email:</strong>{" "}
                                            <a
                                                href={`mailto:${cards.email}`}
                                                className="!text-gray-200 hover:underline break-all"
                                            >
                                                {cards.email}
                                            </a>
                                        </p>
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

export default RegistrarGrievance;
