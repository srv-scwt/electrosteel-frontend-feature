"use client";
import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { OutlineButton } from "@/components/ui/Button";

const manufacturingUnitsData = [
  {
    name: "KHARDAH",
    address: [
      "30, B. T. Road, Khardah,",
      "P.O. - Sukchar,",
      "Dist.- 24 Parganas (N),",
      "West Bengal, India.",
      "Pin - 700115",
    ],
    phone: "+91 33 71014300 / 4450",
    mapLink: "/",
  },
  {
    name: "SRIKALAHASTHI",
    address: [
      "Vill - Rachagunneri,",
      "Mandal - Srikalahasthi,",
      "District - Tirupati,",
      "Andhra Pradesh, India.",
      "Pin - 517641",
    ],
    phone: "+91 8578 286650 - 55",
    mapLink: "/",
  },
  {
    name: "HALDIA",
    address: [
      "Vill - Kasberia,",
      "P.O. - Shibramnagar, Haldia,",
      "Dist. - Purba Medinipur,",
      "West Bengal, India.",
      "Pin - 721635",
    ],
    phone: "+91 9083280640 / 9434095385",
    mapLink: "/",
  },
  {
    name: "BANSBERIA",
    address: [
      "Vill - Chak Bansberia,",
      "Saptagram Panchayat,",
      "P.O. - Adcconagar,",
      "Dist. - Hooghly,",
      "West Bengal, India.",
      "Pin - 712121",
    ],
    phone: "+91 33 71014300 / 4450",
    mapLink: "/",
  },
  {
    name: "ELAVUR",
    address: [
      "Vill - Elavur,",
      "Gummidipoondi Taluk,",
      "Thiruvallur District,",
      "Tamil Nadu, India.",
      "Pin - 601201",
    ],
    phone: "+91 6292219270",
    mapLink: "/",
  },
];

const ManufacturingUnits = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2>Manufacturing Units</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-12 items-start">
            {manufacturingUnitsData.map((unit, index) => (
              <div
                key={index}
                className={`${commonStyles.officeBox} bg-white p-5 lg:p-[30px] shadow-md border border-[#00000029] rounded-[12px] my-4 h-full`}
              >
                <h3 className="text-sm md:text-lg font-semibold text-[#00418e] mb-2">
                  {unit.name}
                </h3>
                <div className="text-[#545454] mb-3 leading-relaxed">
                  {unit.address.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  <p>Ph. {unit.phone}</p>
                </div>
                <div className="mt-3">
                  <OutlineButton
                    goto={unit.mapLink}
                    title={"View in Google Maps"}
                    action={"external"}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingUnits;
