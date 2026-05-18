import React from 'react'
import styles from './style.module.css';
import cstyle from '@/app/common.module.css';

const lists = [
  ["Quality as per International benchmarks.",
    "Product certified by leading international certifying agencies like KITEMARK (UK), DVGW (Germany), ACS (France) etc.",
    "Most modern casting techniques resulting in good quality casting.",
    "High dimensional accuracy leading to proper fitment.",
    "Varied options for coating and lining depending on external and internal conditions.",
    "Proven pre-sales and after-sales support."]];

const ChooseElectrosteel = () => {
  return (
    <div className={`${styles.backgroundImg} bg-[url('/images/product-details/background-img.jpg')]`}>
      <div className={styles.container}>
        <div className={`${cstyle.sectionContent} ${styles.title}`}>
          <h2>Why Choose Electrosteel - <span>DI Valves</span> for Water Supply in India?</h2>
        </div>
        <div
          className={`${cstyle.customUlListing} ${styles.sectionList}`}
        >
          {lists?.map((item, index) => (
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

export default ChooseElectrosteel;