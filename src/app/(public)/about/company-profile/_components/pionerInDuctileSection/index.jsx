"use client";
import Image from "next/image";
import styles from "@/app/common.module.css";

const PoinerInDuctileSection = () => {
  return (
    <section className="">
      <div className={styles.containerLg}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="relative w-full h-64 md:h-80 lg:h-[600px]  overflow-hidden shadow-md">
            <Image
              src="/images/corporateProfileImg.jpg"
              alt="Factory"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Right Image */}
          <div className={styles.sectionContent}>
            <h2>
              Pioneers in <span>Ductile Iron</span> Pipes In India
            </h2>
            <p>
              ELECTROSTEEL CASTINGS LIMITED (ECL) has more than six decades of experience in the water infrastructure business. We are the largest manufacturer of Ductile Iron (DI) Pipes in the Indian sub-continent, having a production capacity of 7,00,000 TPA. Back in 1994, we had pioneered the setup of a Ductile Iron Spun Pipe plant in India, using state of the art technology. Our manufacturing activities are spread over 5 different facilities. Now we are the largest producer of Ductile Iron Pipes in India, and the third largest producer of Ductile Iron Spun Pipe in the world.
            </p>
            <p>We have a strong brand presence around the globe. Our Pipes and Fittings are exported to more than 130 countries across 5 continents. We cater to a large customer base spread around the Indian subcontinent, Europe, North and South America, South East Asia, Middle East and Africa. We are the largest exporters of Ductile Iron Pipes in the nation.</p>

            <p>Electrosteel has maintained its technological leadership by continual product innovation and technical upgradation. Our widespread marketing network, supported by dedicated professionals help to deliver the product to the doorstep of the customers. Electrosteel has made enough pipes so far, to circle the earth more than 5 times!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PoinerInDuctileSection