"use client";

import Image from "next/image";
import React from "react";
import styles from "@/app/common.module.css";

const stockyards = [
  {
    title: "France Stockyard",
    img: "/images/stockyards/stock1.jpg",
    address: [
      "Electrosteel Europe S.A.",
      "Zone Industrielle Nord",
      "9, Rue Galilee",
      "F13200 Arles, France",
    ],
  },
  {
    title: "Italy Stockyard",
    img: "/images/stockyards/stock2.jpg",
    address: [
      "Electrosteel Europe",
      "S.A. Succursale Italia",
      "C/O Masiero Spedizione s.r.l.",
      "Via Bottenigo 131, 30175 Marghera,",
      "Venice, Italy",
    ],
  },
  {
    title: "Spain Stockyard",
    img: "/images/stockyards/stock3.jpg",
    address: [
      "Electrosteel Europe S.A. Sucursal En Espana",
      "Poligono Industrial de Valls",
      "C/ Dels Blanquers 58,",
      "Poblacion: Valls CP 43800",
      "Tarragona, Spain",
    ],
  },
  {
    title: "UK Warehouse",
    img: "/images/stockyards/stock4.jpg",
    address: [
      "Yard 1:",
      "Broombank Road Trading Estate",
      "Broombank Road Off Carrwood Road",
      "Chesterfield, Derbyshire S41 9QJ, UK",
      "Yard 2:",
      "Old Padley and Venables Site",
      "Callywhite Lane, Dronfield, S18 2XR",
    ],
  },
  {
    title: "USA Stockyard",
    img: "/images/stockyards/stock5.jpg",
    address: [
      "Electrosteel USA LLC",
      "1101, Louisville Road",
      "Savannah, Georgia",
      "31415, USA",
    ],
  },
  {
    title: "Bahrain Stockyard",
    img: "/images/stockyards/stock6.jpg",
    address: [
      "Electrosteel Bahrain Trading WLL",
      "Flat No. 1, Building No. 966",
      "Road No. 5218, Block 952 Ras Zuwayed",
      "Kingdom of Bahrain",
    ],
  },
];

const StockListSection = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 lg:gap-12 items-start">
            {stockyards.map((yard, index) => (
              <div
                key={index}
                className="shadow-md bg-[#f9f9f9] h-full hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden shadow-md">
                  <Image
                    src={yard.img}
                    alt={yard.title}
                    fill
                    className="object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="w-full p-5">
                  <h3 className="font-semibold text-lg mb-2">{yard.title}</h3>
                  <p>
                    {yard.address.map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StockListSection;
