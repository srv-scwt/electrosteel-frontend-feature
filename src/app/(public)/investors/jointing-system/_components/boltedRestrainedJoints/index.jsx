
"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const BoltedRestrainedJoints = () => {
  return (
    <section id='bolted-restrained-joint' className="">
      <div className={`${styles.containerLg} !pt-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2><span>Ductile Iron Fittings - Bolted Restrained Joints</span></h2>

            <p className="mb-3">Electrosteel manufactures Flanged Fittings using the “as cast” method. The PN ratings are PN 10, PN 16, PN 25 and PN 40.
              Flange fittings are also available with rotating adjustable flanges.
            </p>
            <div className={styles.customUlListing}> 
              <ul>
                <li>Can withstand very high pressure.</li>
                <li>Needs specially manufactured fittings with a hood on the socket and Weld Bead on spigot.</li>
                <li>Needs special accessories such as Gland, Split Retainer Ring and Nuts/ Hook Bolts.</li>
                <li>Normal gasket to be used for sealing.</li>
                <li>The Hook Bolts with the support from the socket hood holds the gland and the socket together. The welding bead on the other pipe&apos;s spigot cannot pass through Retainer Ring housed in the gland, ensures restraining of axial movement between the two components.</li>
                <li>Easy to assemble and disassemble when required.</li>
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

export default BoltedRestrainedJoints