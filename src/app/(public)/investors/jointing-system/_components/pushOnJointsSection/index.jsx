"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';


const PushOnJointsSection = () => {
  return (
    <section id='push-on-joint' className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2><span>Ductile Iron Fittings - Push-on Joints</span></h2>
            
            <p>Socket and Spigot Flexible Joints are assembled with synthetic EPDM (Ethylene Propylene Diene Monomer) / SBR (Styrene-Butadiene-Rubber) rubber gaskets of special shape - the gasket has a hard ‘Heel’ and a soft ‘Bulb’.</p>

            <p>In Push-on joints, the soft bulb of the rubber products is compressed when the spigot is inserted into the socket. The 'Heel' locks the position of the gasket and does not allow the gasket to get displaced when the spigot is pushed in. The joint becomes tighter with the increase in internal pressure of water. The rubber is confined in place and cannot blow out.</p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-100 overflow-hidden shadow-md">
            <Image
              src="/images/investors/img1.png"
              alt="img"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PushOnJointsSection