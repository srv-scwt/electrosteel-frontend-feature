"use client";

import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { ButtonLink, OutlineButtonLink } from "@/components/ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// ==============================
//  Overseas Data
// ==============================
const overseasUnits = [
  {
    country: "France stockYard",
    offices: [
      {
        title: "France",
        address: `Electrosteel Europe S.A.
Zone Industrielle Nord
9, Rue Galilee
F13200 Arles, France`,
        phone: "+33 4 90 96 81 30",
        fax: "+33 4 90 96 81 31",
        email: ["cjf.hahang@electrosteel.fr"],
        website: "www.electrosteel.fr",
        contactPerson: "Cyrille Hahang",
      },
    ],
  },
  {
    country: "ITALY STOCKYARD",
    offices: [
      {
        title: "ITALY",
        address: `Electrosteel Europe S.A. Succursale Italia
C/O Masiero Spedizione s.r.l.
Via Bottenigo 131 30175- Marghera,
Venice, Italy`,
      },
      {
        title: "ITALY",
        address: `Electrosteel Europe S.A.
Succursale Italia
Via Mecenate, 76/22,
20138 Milano (Ml), Italy.`,
        phone: "+39 0255199357",
        fax: "+ 39 025517915",
        email: ["a.firpo@electrosteel.it"],
        website: "www.electrosteel.it",
        contactPerson: "Alfio Firpo",
      },
    ],
  },
  {
    country: "SPAIN STOCKYARD",
    offices: [
      {
        title: "SPAIN",
        address: `Electrosteel Europe, S.A. Sucursal En Espana
Poligono Industrial de Valls
C/ Dels Blanquers 58,
Poblacion: Valls CP 43800
-Tarragona, Spain`,
        phone: "+34 91 564 73 29",
        fax: "+34 91 563 34 09",
        email: ["jlyu@electrosteel.es"],
        website: "www.electrosteel.com",
        contactPerson: "Jesus L. Yu",
      },
    ],
  },
  {
    country: "UK WAREHOUSE",
    offices: [
      {
        title: "Yard 1 :",
        address: `Broombank Road Trading Estate
Broombank Road Off Carrwood Road Chesterfield,
Derbyshire S41 9QJ, UK`,
      },
      {
        title: "Yard 2:",
        address: `Old Padley and Venables site, Callywhite Lane,
Dronfield, S18 2XR,`,
      },
      {
        title: "Electrosteel Castings (UK) Limited",
        address: `Ambrose House, Broombank Road Trading Estate
Broombank Road Off Carrwood Road
Chesterfield, Derbyshire S41 9QJ, United Kingdom`,
        phone: "+ 44 (0) 1246 264 222",
        fax: "+ 44 (0) 1246 264 224",
        email: ["sales@electrosteel.co.uk"],
        website: "www.electrosteel.co.uk",
        contactPerson: "Stew Bailie",
      },
    ],
  },
  {
    country: "USA STOCKYARD",
    offices: [
      {
        title: "USA",
        address: `Electrosteel USA LLC
1101, Louisville Road
Savannah, Georgia
31415, USA`,
        phone: "+01 912 387 0613",
        fax: "+01 912 385 0315",
        email: ["support@electrosteelusa.com"],
        website: "www.electrosteelusa.com",
        contactPerson: "Danny Swalley",
      },
    ],
  },
  {
    country: "BAHRAIN STOCKYARD",
    offices: [
      {
        title: "BAHRAIN",
        address: `Electrosteel Bahrain Trading WLL
Flat No. 1, Building No. 966,
Road No. 5218,
Block 952 Ras Zuwayed,
Kingdom of Bahrain`,
        phone: "+973 77322288",
        email: [
          "ecl.bahrain@electrosteel.com",
          "apshukla@electrosteel.com",
        ],
        contactPerson: "Awadh Prakash Shukla",
      },
    ],
  },
  {
    country: "ALGERIA STOCKYARD",
    offices: [
      {
        title: "ALGERIA",
        address: `Electrosteel Algerie SPA
Hai Alioua Fodil Villa N° 130,
Cheraga 16002, Algiers, Algeria.`,
        phone: "+213 23 361868",
        fax: "+213 23 361867",
        email: ["a.chadly@electrosteel-dz.com"],
        website: "www.electrosteel-dz.com",
        contactPerson: "Aziz Chadly",
      },
    ],
  },
  {
    country: "GERMANY STOCKYARD",
    offices: [
      {
        title: "GERMANY",
        address: `Electrosteel Europe S.A.Niederlassung Deutschland,
Bruder - Kremer - Str. 6
65549 Limburg a.d.Lahn, Germany`,
        phone: "+49 6442 9559 340",
        fax: "+49 6442 9559 341",
        email: ["cjf.hahang@electrosteel.fr"],
        website: "www.electrosteel.de",
        contactPerson: "Cyrille Hahang",
      },
    ],
  },
  {
    country: "QATAR",
    offices: [
      {
        title: "QATAR",
        address: `Electrosteel Doha for Trading LLC
P.O.Box - 80368,
Office no. 502, 5th Floor
Al Mansour Business Park, Umm Ghuwailina`,
        phone: "+974 44151735",
        fax: "+ 974 44151726",
        email: [
          "vrungta@electrosteel.com",
          "ecldoha@electrosteel.com",
        ],
        contactPerson: "Vineet Rungta",
      },
    ],
  },
  {
    country: "UAE",
    offices: [
      {
        title: "UAE",
        address: `Electrosteel Castings Gulf FZE Office No.: LB09021, Lob: 9 P.O.Box: 261462, Jebel Ali Free Zone, Dubai, U.A.E.`,
        phone: "+971 50 592 8405",
        fax: "+971 4 889 4902",
        email: [
          "sn.agarwal@electrosteel.com"
        ],
        contactPerson: "Mr.Shivendra Agarwal",
      },
    ],
  },
];

const OptionalUnitsOverseas = () => {
  return (
    <section className="bg-[#fafafa]" id="operational-units-overseas">
      <div className={`${styles.containerLg}`}>
        <div className={styles.sectionContent}>
          <h3 className="!mb-[30px] md:!mb-[45px]">Overseas</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 lg:gap-x-[22px] lg:gap-y-[30px] items-start">

            {overseasUnits.map((unit, index) => (
              <div key={index} className="flex h-full flex-col">

                {/* Country Name */}
                {/* <h3 className="pl-[26px]">{unit.country}</h3> */}
                <h3 className="">{unit.country}</h3>

                {/* Box Wrapper */}
                <div className={`${commonStyles.officeBox} bg-[#004aa1] shadow-md border border-[#00000029] rounded-[12px] h-full overflow-hidden`}>

                  {/* If more than 1 office → swiper */}
                  {unit.offices.length > 1 ? (
                    <Swiper
                      modules={[Navigation]}
                      navigation={true}
                      spaceBetween={10}
                      slidesPerView={1}
                      className={`${commonStyles.officeOverseasSwiper} h-full`}
                    >
                      {unit.offices.map((office, oIndex) => (
                        <SwiperSlide key={oIndex}>
                          <div className="py-[35px] px-[48px]">
                            <h4 className="text-sm md:text-lg font-semibold text-[#ffffff] mb-2">
                              {office.title}
                            </h4>

                            <p className="mb-3 leading-relaxed !text-[#ffffff] whitespace-pre-line">
                              {office.address}
                            </p>

                            <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                              {office.phone}
                            </p>

                            <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                              {office.fax}
                            </p>

                            <p>
                              <a href={`mailto:${office.email?.[0]}`} className="text-[#dcecff] hover:underline">
                                {office.email?.[0]}
                              </a>
                            </p>
                            {office.email?.[1] && (
                              <p>
                                <a href={`mailto:${office.email?.[1]}`} className="text-[#dcecff] hover:underline">
                                  {office.email?.[1]}
                                </a>
                              </p>
                            )}

                            <p>
                              <a href={`mailto:${office.website}`} className="text-[#dcecff] hover:underline">
                                {office.website}
                              </a>
                            </p>

                            {office?.contactPerson && (
                              <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                                <strong>Contact Person:</strong> {office.contactPerson}
                              </p>
                            )}

                            <div className="mt-3 flex gap-4 items-center justify-between">
                              <ButtonLink goto="/" title="Google Map" className={`${commonStyles.manualCSSBTN}`} />
                              <OutlineButtonLink goto="/" title="Read More" className={commonStyles.manualReadMore} />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    /* For only 1 office (no swiper needed) */
                    <>
                      <div className="p-[35px]">
                        <h4 className="text-sm md:text-lg font-semibold text-[#ffffff] mb-2">
                          {unit.offices[0].title}
                        </h4>

                        <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                          {unit.offices[0].address}
                        </p>

                        <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                          {unit.offices[0].phone}
                        </p>

                        <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                          {unit.offices[0].fax}
                        </p>

                        <p>
                          <a href={`mailto:${unit.offices[0].email?.[0]}`} className="text-[#dcecff] hover:underline">
                            {unit.offices[0].email?.[0]}
                          </a>
                        </p>

                        {unit.offices[0].email?.[1] && (
                          <p>
                            <a href={`mailto:${unit.offices[0].email?.[1]}`} className="text-[#dcecff] hover:underline">
                              {unit.offices[0].email?.[1]}
                            </a>
                          </p>
                        )
                        }


                        <p>
                          <a href={`mailto:${unit.offices[0].website}`} className="text-[#dcecff] hover:underline">
                            {unit.offices[0].website}
                          </a>
                        </p>

                        {unit.offices[0]?.contactPerson && (
                          <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                            <strong>Contact Person:</strong> {unit.offices[0].contactPerson}
                          </p>
                        )}

                        <div className="mt-3 flex gap-4 items-center justify-between">
                          <ButtonLink goto="/" title="Google Map" className={`${commonStyles.manualCSSBTN}`} />
                          <OutlineButtonLink goto="/" title="Read More" className={commonStyles.manualReadMore} />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
        {/* Load More Button */}
        {/* <div className="mt-[30px] text-center">
          <OutlineButtonLink goto="/" title="Load More" className="mx-auto" />
        </div> */}
      </div>
    </section>
  );
};

export default OptionalUnitsOverseas;
