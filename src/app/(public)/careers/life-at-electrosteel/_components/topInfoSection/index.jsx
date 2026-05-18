"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const TopInfoSection = () => {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <p>
              Electrosteel is powered by a well bonded and committed team of professionals who are equipped to understand customer priorities and consistently strive to offer superior Product Quality and Services across the globe.</p>
            <p className='!my-4'><b>Team Drives the Business</b></p>
            <p>At Electrosteel, we strongly believe that our people are our biggest asset. The Company, along with its workforce, acts as ‘one family’ where each individual is committed towards achieving the common goal of delivering the best to our customers across the globe. Progressing towards this endeavour, Electrosteel fosters a happy and healthy workforce that thrives in an environment conducive to growth, development and success.</p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-[450px] overflow-hidden shadow-md">
            <Image
              src="/images/corporateProfileImg.jpg"
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopInfoSection