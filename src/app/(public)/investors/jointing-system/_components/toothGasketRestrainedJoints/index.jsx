
"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const ToothGasketRestrainedJoints = () => {
  return (
    <section id='tooth-gasket-joint' className="">
      <div className={`${styles.containerLg} !pt-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2><span>Ductile Iron Fittings - Tooth Gasket Restrained Joints</span></h2>

            <p className="mb-3">Electrosteel manufactures Flanged Fittings using the “as cast” method. The PN ratings are PN 10, PN 16, PN 25 and PN 40.
              Flange fittings are also available with rotating adjustable flanges.
            </p>
            <div className={styles.customUlListing}> 
              <ul>
                <li>Can be used on any push-on joint socket and spigot fitting.</li>
                <li>Needs specially manufactured steel teeth inserted gasket in place of a normal gasket.</li>
                <li>Like any other fitting, the steel teeth allow the spigot to be pushed into the socket.</li>
                <li>Once the spigot is fully inserted, the teeth bite into the spigot and restrict it from coming out.</li>
                <li>This specially designed gasket performs the dual role of water sealing and restraining.</li>
                <li>After assembly, it is recommended to pull back the fitting a little bit, to ensure engagement of teeth.</li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-100 overflow-hidden shadow-md">
            <Image
              src="/images/investors/img3.png"
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

export default ToothGasketRestrainedJoints