"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { OutlineButtonLink } from "@/components/ui/Button";
import OverseasOffices from "../overseasOffices";
import Tooltip from "@/components/ui/Tooltip";
import HTMLRender from "@/components/ui/HTMLRender";

const toArray = (value) => {
  if (!value) return [];

  const arr = Array.isArray(value) ? value : [value];

  return arr
    .flatMap((item) =>
      String(item)
        .replace(/<[^>]*>/g, "")
        .split(/\n+/)
    )
    .map((item) => item.trim())
    .filter(Boolean);
};

const OfficeInIndia = ({ selectedCountryParam, indiaData, officesOverseasData }) => {
  const offices = indiaData?.data || [];

  const groupedData = useMemo(() => {
    return offices.reduce((acc, office) => {
      const region = office?.direction || "Others";

      if (!acc[region]) acc[region] = [];
      acc[region].push(office);

      return acc;
    }, {});
  }, [offices]);

  const regions = Object.keys(groupedData);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (regions.length && !regions.includes(activeTab)) {
      setActiveTab(regions[0]);
    }
  }, [regions, activeTab]);

  return (
    <section className="bg-[#004aa1]" id="offices">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <HTMLRender htmlString={indiaData?.heading || "<h2>Offices</h2>"} className={"!text-white"} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12">
            <div className="flex h-full flex-col">
              <h3
                id="offices-india"
                className="text-2xl text-[#ffffff] font-semibold mb-5 flex gap-2 items-start"
              >
                <HTMLRender htmlString={indiaData?.sub_heading || "<h3>India</h3>"} />
                <Tooltip message="This is a Tooltip" />
              </h3>

              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className={`${styles.customSelectDropdown} border rounded-[12px] border-[#ffffff] py-3 px-3 md:px-[30px] !bg-[#ffffff] focus:outline-none w-full text-[#00418e] mb-4 uppercase`}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              <div
                className={`${commonStyles.officeBox} bg-white shadow-md border border-[#00000029] rounded-[12px] h-full`}
              >
                <Swiper
                  modules={[Navigation]}
                  navigation
                  loop={groupedData?.[activeTab]?.length > 1}
                  slidesPerView={1}
                  spaceBetween={30}
                  className={commonStyles.officeSwiper}
                >
                  {groupedData?.[activeTab]?.map((office, index) => (
                    <SwiperSlide key={office?.id || index}>
                      <div className="py-5 px-[40px] lg:px-[50px] lg:py-[30px]">
                        <h4 className="text-sm md:text-lg font-semibold mb-4 text-[#00418e]">
                          {office?.title}
                        </h4>

                        <div className="text-[#545454] mb-4">
                          {toArray(office?.address).map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>

                        <div className="text-[#545454] mb-5">
                          {toArray(office?.contact).map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>

                        {office?.map_link && office?.map_link !== "/" && (
                          <OutlineButtonLink
                            goto={office.map_link}
                            title="Google Map"
                            className="mt-4"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <OverseasOffices
              selectedCountryParam={selectedCountryParam}
              data={officesOverseasData}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeInIndia;