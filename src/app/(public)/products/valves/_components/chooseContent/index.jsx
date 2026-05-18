import React from 'react'
import styles from './style.module.css';
import cstyle from '@/app/common.module.css';
import HTMLRender from '@/components/ui/HTMLRender';

const ChooseElectrosteelContent = ({ data }) => {
    return (
        <div className={`${styles.backgroundImg} bg-[url('/images/product-details/background-img.jpg')]`}>
            <div className={styles.container}>
                <div className={`${cstyle.sectionContent} ${styles.title}`}>
                    <HTMLRender htmlString={`<h2>${data.title}</h2>`} />
                </div>
            </div>
        </div>
    )
}

export default ChooseElectrosteelContent;