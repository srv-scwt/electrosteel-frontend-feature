
"use client"
import React from 'react';
import styles from "@/app/common.module.css";
import Image from 'next/image';

const ExpressMechanicalJointFittings = () => {
  return (
    <section id='express-mechanical-joint' className="">
      <div className={`${styles.containerLg} !pt-0`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <h2><span>Ductile Iron Fittings - Express Mechanical Joint Fittings</span></h2>

            <p className="mb-3">Mechanical Joint fittings come with a flexible joint, where the sealing is obtained by applying pressure to the gasket by mechanical means, viz. a separate gland. The gland when bolted with the pipe exerts pressure on the sealing rubber products and makes the joint leak-proof. The pipe socket provides an exterior flange having bolt holes and an internal socket with annular recess for both the gasket and the mating plain end. Accessories consists of a gasket, a flower gland and tee head bolts with hexagonal nuts.
            </p>
            <div className={styles.customUlListing}> 
              <ul>
                <li>Offers excellent convenience during jointing. A tee or a connection can be easily inserted into an already laid line, which is difficult with normal push-on joints.</li>
                <li>Requires very small space during jointing as no pushing is involved.</li>
                <li>No chamfering of the jointing pipe is required.</li>
                <li>In case the joint leaks, the bolts can be tightened further to stop leakage.</li>
                <li>The joint does not need extra equipment to force the spigot into the socket. Only a rachet type spanner is needed to tighten the nuts on the holding bolt.</li>
              </ul>
            </div>
          </div> 	
          {/* Right Image */}
          <div className="relative w-full h-64 md:h-80 lg:h-100 overflow-hidden shadow-md">
            <Image
              src="/images/investors/img4.png"
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

export default ExpressMechanicalJointFittings