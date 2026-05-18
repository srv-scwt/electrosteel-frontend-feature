
"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";

const GlobalMapSection = () => {
    return (
        <section className="">
            <div className={`${styles.containerLg} !py-0`}>
                    <Image
                        src="/images/maps/map_img1.jpg"
                        alt="img"
                        fill
                        className="!relative"
                    />
            </div>
        </section>
    )
}

export default GlobalMapSection