import React from 'react'
import styles from "@/app/common.module.css";
import HTMLRender from '@/components/ui/HTMLRender';

const CountriesAbout = ({ data }) => {
    return (
        <section className={`${styles.containerLg} !pb-0`}>
            <div
                className={`${styles.sectionContent} ${styles.sectionContentSpanDark}`}
            >
                <h4>{data?.heading}</h4>
            </div>
            <div className={`${styles.sectionContent}`}>
                <HTMLRender htmlString={data?.sub_heading} />
            </div>
        </section>
    )
}

export default CountriesAbout;