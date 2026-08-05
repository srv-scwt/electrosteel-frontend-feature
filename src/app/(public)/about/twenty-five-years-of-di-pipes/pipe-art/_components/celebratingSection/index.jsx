"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';


const CelebartingSection = () => {
  return (
    <>
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2>
              CELEBRATING <span>MILESTONES THROUGH</span> MASTERPIECES
            </h2>
            <p>At Electrosteel, we are celebrating 25 years of pioneering Ductile Iron Pipes in India.</p>
            <p>To celebrate our glorious journey, we initiated &quot;Inspiration Canvas&quot; - an art project that uses our pipes as a canvas to depict our values of <strong>Trust, Innovation, Responsibility, Purity and Expanding Boundaries.</strong></p>
            <p>It all began when we asked for participation, and entries just started pouring in! Having selected our best artists, we gave them themes to paint under the able guidance of a professional artist. What followed were these beautiful expressions of art and creativity on our pipes.</p>
            <p>We have given these art installations pride of place at our establishments, where they will be preserved for posterity. These pieces of art stand testimony to the pioneering spirit that makes us who we are.</p>
            <p><strong>#technologythatcares</strong></p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-[500px]  overflow-hidden shadow-md">
            <Image
              src="/images/pipe-art/pioneering_thumb.jpg"
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default CelebartingSection