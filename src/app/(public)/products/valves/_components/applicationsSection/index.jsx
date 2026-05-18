import React from 'react'
import styles from './style.module.css';
import cstyle from '@/app/common.module.css';

const ListsData = [
    [
        "Raw and clear water transmission (pumping and gravity main)",
        "Distribution network of potable water",
        "Water supply for industrial/process plant application",
        "Ash-slurry handling & disposal system",
        "Fire-fighting systems - on-shore and off-shore",
        "Desalination plants",
        "Sewerage and waste water force main",
        "Gravity sewerage collection and disposal system",
        "Storm water drainage piping"
    ],
    [
        "Effluent disposal system for domestic and industrial application",
        "Recycling system",
        "Piping work inside water and sewage treatment plants",
        "Vertical connection to utilities and reservoirs",
        "Piling for ground stabilization",
        "Protective piping under major carriage-ways",
        "Trenchless applications"
    ]
]

const Applications = () => {
    return (
        <div className={styles.container}>
            <div className={cstyle.containerLg}>
                <div className={cstyle.sectionContent}>
                    <h2>Applications</h2>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${cstyle.customUlListing} ${styles.Listing}`}>
                    {ListsData?.map((item, index) => (
                        <ul key={index}>
                            {item?.map((subItem, index) => (
                                <li key={index}>{subItem}</li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Applications;