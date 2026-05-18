"use client"
import { ButtonLink } from '@/components/ui/Button';
import Image from 'next/image';
import React, { useState } from 'react'
import styles from './style.module.css'
import cStayle from '@/app/common.module.css'
import style from "@/app/common.module.css"

const products = [
    {
        title: "Push-on Joint",
        description:
            "Socket and Spigot Flexible Joints are assembled with synthetic rubber gaskets of special shape - the gasket has a hard ‘Heel' and a soft 'Bulb'",
        icon: "/images/product-details/push-on.png",
    },
    {
        title: "Flanged Joint",
        description: "For overground application and for fixing appurtenances Flat Faced Flange Joints are used.",
        icon: "/images/product-details/flanged.png",
    },
    {
        title: "Bolted Restrained Joint",
        description:
            "Restrained Joints eliminate the use of concrete anchor blocks. These special joints are made with Bolts and Glands to provide axial restraint.",
        icon: "/images/product-details/bolted.png",
    },
    {
        title: "Boltless Restrained Joint",
        description:
            "This is a special Restrained Joint system (known as Electrolock Joint) which does not use bolts for restraining.",
        icon: "/images/product-details/boltless.png",
    },
    {
        title: "Tooth Gasket Joint",
        description: "This is a self-restraining joint where thrust restraint is achieved by a specially designed gasket with embedded steel teeth. This performs the dual role of water sealing and restraining.",
        icon: "/images/product-details/tooth.png",
    },
    {
        title: "Express Mechanical Joint",
        description: "Express type mechanical joint is a bolted flexible joint used in DI fittings. The sealing is obtained by applying pressure to the gasket by a separate gland. The gland, when bolted with the pipe, exerts pressure on the sealing rubber products and makes the joint leak-proof.",
        icon: "/images/product-details/express.png",
    },
];
const JointingSystems = () => {
    const limit = 80;
    const [expanded, setExpanded] = useState(false);
    const isLong = products[0].description.length > limit;

    return (
        <section id="ourProductSection" className="bg-[#F5F5F5]">
            <div className={cStayle.containerLg}>
                {/* Heading */}
                <div className={cStayle.sectionContent}>
                    <h2>Jointing <span>Systems</span></h2>
                    <p>Electrosteel produces fittings in the range DN 80 mm DN 1200 mm in accordance with the following standards.</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[32px]">
                    {products.map((product, index) => {
                        const isLastCol = (index + 1) % 3 === 0;

                        const borderClasses = [
                            !isLastCol ? "border-r" : "",
                            "border-gray-200",
                        ].join(" ");

                        return (
                            <div
                                key={index}
                                className={`flex flex-row lg:gap-0 md:gap-0 md:flex-col lg:flex-col ${borderClasses} ${styles.productBoxContainer}`}>
                                <div className={styles.productIcon}>
                                    <Image
                                        src={product.icon}
                                        alt={product.title}
                                        width={48}
                                        height={48}
                                        className="object-contain object-center"
                                    />
                                </div>

                                <div className={styles.sectionContent}>
                                    <h4>{product.title}</h4>
                                    <p>
                                        {expanded
                                            ? product.description
                                            : product.description.slice(0, limit)}
                                        {isLong && (
                                            <span
                                                onClick={() => setExpanded(!expanded)}
                                                className="text-blue-600 cursor-pointer ml-2"
                                            >
                                                {expanded ? "product.description" : ". . . ."}
                                            </span>
                                        )}
                                    </p>
                                    <ButtonLink goto={"/"} title={"More"} className={styles.moreBtn} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default JointingSystems;