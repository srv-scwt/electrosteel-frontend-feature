"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Tooltip from "@/components/ui/Tooltip";
import HTMLRender from "@/components/ui/HTMLRender";
import { countryQueryMap } from "@/app/(public)/about/global-presence/_components/m.data";

const DEFAULT_COUNTRY = "France";

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

const normalizeSlug = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

const OverseasOffices = ({ selectedCountryParam, data }) => {
  const overseasOffices = data?.data || [];

  const groupedData = useMemo(() => {
    return overseasOffices.reduce((acc, office) => {
      const country = office?.country || office?.title || "Others";

      if (!acc[country]) acc[country] = [];
      acc[country].push(office);

      return acc;
    }, {});
  }, [overseasOffices]);

  const countries = Object.keys(groupedData);

  const getCountryFromQuery = (countryParam) => {
    if (!countryParam) return countries[0] || DEFAULT_COUNTRY;

    const normalizedCountry = normalizeSlug(countryParam);
    const mappedCountry = countryQueryMap?.[normalizedCountry];

    if (mappedCountry && groupedData[mappedCountry]) {
      return mappedCountry;
    }

    const matchedCountry = countries.find(
      (country) => normalizeSlug(country) === normalizedCountry
    );

    return matchedCountry || countries[0] || DEFAULT_COUNTRY;
  };

  const [activeCountry, setActiveCountry] = useState("");

  useEffect(() => {
    if (countries.length) {
      setActiveCountry(getCountryFromQuery(selectedCountryParam));
    }
  }, [selectedCountryParam, countries.join("|")]);

  return (
    <div id="offices-overseas" className="flex h-full flex-col">
      <h3 className="text-2xl text-[#ffffff] font-semibold mb-5 flex gap-2 items-start">
        <HTMLRender htmlString={data?.sub_heading || "<h3>Overseas</h3>"} />
        <Tooltip message="This is a Tooltip" />
      </h3>

      <select
        value={activeCountry}
        onChange={(e) => setActiveCountry(e.target.value)}
        className={`${styles.customSelectDropdown} border border-[#ffffff] rounded-[12px] py-3 px-3 md:px-[30px] focus:outline-none w-full text-[#00418e] !bg-[#ffffff] mb-4 uppercase`}
      >
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <div
        className={`${commonStyles.officeBox} bg-white shadow-md border border-[#00000029] rounded-[12px] h-full`}
      >
        <Swiper
          modules={[Navigation]}
          navigation
          loop={groupedData?.[activeCountry]?.length > 1}
          slidesPerView={1}
          spaceBetween={30}
          className={commonStyles.overseasSwiper}
        >
          {groupedData?.[activeCountry]?.map((office, index) => (
            <SwiperSlide key={office?.id || index}>
              <div className="py-5 px-[40px] lg:px-[50px] lg:py-[30px]">
                <h4 className="text-sm md:text-lg font-semibold mb-4 text-[#00418e]">
                  {office?.title || office?.country}
                </h4>

                <div className="text-[#545454] mb-4">
                  {toArray(office?.address).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className="text-[#545454]">
                  {toArray(office?.contact).map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OverseasOffices;