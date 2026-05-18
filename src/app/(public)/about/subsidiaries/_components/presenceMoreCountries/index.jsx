"use client";
import React from 'react'
import Image from "next/image";
import styles from "@/app/common.module.css";

const PresenceMoreCountriesSection = () => {
    return (
        <section className="">
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <h2>
                        Presence in <span>more than 130 countries</span> across the globe
                    </h2>
                    <p>
                        Over the years, Electrosteel has established a strong presence in international markets as the manufacturer of high quality DI pipes.
                        The Company has extended its presence and reach by setting up foreign subsidiaries and has developed strong relations with customers abroad.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PresenceMoreCountriesSection