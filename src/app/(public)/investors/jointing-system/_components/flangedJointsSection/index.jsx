
"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const FlangedJointsSection = () => {
  return (
    <section id='flanged-joint' className="">
      <div className={`${styles.containerLg} !pt-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2><span>Ductile Iron Fittings - Flanged Joints</span></h2>

            <p className="mb-3">Electrosteel manufactures Flanged Fittings using the “as cast” method. The PN ratings are PN 10, PN 16, PN 25 and PN 40.
              Flange fittings are also available with rotating adjustable flanges.
            </p>
            <div className={styles.customUlListing}> 
              <ul>
                <li>Buried installation of flanged fittings is not recommended.</li>
                <li>Flanged joint being a rigid joint, perfect alignment of the flange faces during jointing and bolt tightening is vital.</li>
                <li>Use of duck foot bend at the bottom of vertical flange pipeline is necessary.</li>
                <li>For high pressure application, flanged pipeline may need thrust block / support at bends / tees.</li>
              </ul>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-100 overflow-hidden shadow-md">
            <Image
              src="/images/investors/img2.png"
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

export default FlangedJointsSection