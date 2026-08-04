"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import HTMLRender from '@/components/ui/HTMLRender';

const SuperiorQualityProductSection = ({ data }) => {
    if (!data) return null;

    return (
        <section>
            <div className={styles.containerLg}>
                <div className={styles.sectionContent}>
                    <h2><HTMLRender htmlString={data.title} /></h2>
                    <HTMLRender htmlString={data.description} />
                </div>
            </div>
        </section>
    )
}

export default SuperiorQualityProductSection