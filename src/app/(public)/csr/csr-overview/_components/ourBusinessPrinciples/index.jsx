"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';


const OurBusinessPrinciples = () => {
  return (
    <section className="">
      <div className={styles.containerLg}>
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2>
              CSR at the core of <span>our business principles</span> 
            </h2>
            <p>
              Corporate Social Responsibility has a long tradition in Electrosteel. For the last many decades, we have created a niche for ourselves, not just as a technology and innovation pioneer, but also as a Company that lives its mantra of "technology that cares".
            </p>
            <p>We engage regularly with our stakeholders to understand their needs and concerns and look to strengthen their communities with our endeavors. The guiding principle behind our CSR activities is to maximize the impact it has on the quality of lives of the community.</p>
          </div>
      </div>
    </section>
  )
}

export default OurBusinessPrinciples