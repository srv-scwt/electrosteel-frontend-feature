"use client";

import React from "react";
import styles from "@/app/common.module.css";
import commonStyles from "./style.module.css";
import { ButtonLink, OutlineButton, OutlineButtonLink } from "@/components/ui/Button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import HTMLRender from "@/components/ui/HTMLRender";
import useLoadMoreData from "@/hooks/useLoadMoreData";

const OptionalUnitsOverseas = ({data}) => {
    const { visibleData, hasMore, handleLoadMore } = useLoadMoreData(data?.data, 6);
  return (
    <section className="bg-[#fafafa]" id="operational-units-overseas">
      <div className={`${styles.containerLg}`}>
        <div className={styles.sectionContent}>
          <h3 className="!mb-[30px] md:!mb-[45px]">
            {data?.title || "Overseas1"}
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8 lg:gap-x-[22px] lg:gap-y-[30px] items-start">
            {Array.isArray(visibleData) && visibleData?.map((unit, index) => {
              const offices = Array.isArray(unit?.data) ? unit.data : [];

              return (
                <div key={index} className="flex h-full flex-col">
                  <HTMLRender htmlString={`<h3>${unit?.heading || ""}</h3>`} />

                  <div
                    className={`${commonStyles.officeBox} bg-[#004aa1] shadow-md border border-[#00000029] rounded-[12px] h-full overflow-hidden`}
                  >
                    {offices.length > 1 ? (
                      <Swiper
                        modules={[Navigation]}
                        navigation={true}
                        spaceBetween={10}
                        slidesPerView={1}
                        className={`${commonStyles.officeOverseasSwiper} h-full`}
                      >
                        {offices?.map((office, oIndex) => (
                          <SwiperSlide key={oIndex}>
                            <div className="py-[35px] px-[48px]">
                              <h4 className="text-sm md:text-lg font-semibold text-[#ffffff] mb-2">
                                {office?.country}
                              </h4>

                              <div className={`${commonStyles.addr}`}>
                                <HTMLRender htmlString={office?.address} />
                              </div>

                              {office?.contact_person && (
                                <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                                  <strong>Contact Person:</strong>{" "}
                                  {office.contact_person}
                                </p>
                              )}

                              <div className="mt-3 flex gap-4 items-center justify-between">
                                <ButtonLink
                                  goto={office?.map_link || "#"}
                                  title="Google Map"
                                  className={`${commonStyles.manualCSSBTN}`}
                                />

                                <OutlineButtonLink
                                  goto={office?.btn_link || "#"}
                                  title="Read More"
                                  className={commonStyles.manualReadMore}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="p-[35px]">
                        <h4 className="text-sm md:text-lg font-semibold text-[#ffffff] mb-2">
                          {offices?.[0]?.country}
                        </h4>

                        <div className={`${commonStyles.addr}`}>
                          <HTMLRender htmlString={offices?.[0]?.address} />
                        </div>

                        {offices?.[0]?.contact_person && (
                          <p className="leading-relaxed !text-[#ffffff] whitespace-pre-line">
                            <strong>Contact Person:</strong>{" "}
                            {offices?.[0]?.contact_person}
                          </p>
                        )}

                        <div className="mt-3 flex gap-4 items-center justify-between">
                          <ButtonLink
                            goto={offices?.[0]?.map_link || "#"}
                            title="Google Map"
                            className={`${commonStyles.manualCSSBTN}`}
                          />

                          <OutlineButtonLink
                            goto={offices?.[0]?.btn_link || "#"}
                            title="Read More"
                            className={commonStyles.manualReadMore}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
           {hasMore ? (
            <div className={`flex w-full items-center justify-center pt-8`}>
              <OutlineButton
                action={handleLoadMore}
                title={"load more"}
                className={"flex items-center !justify-center"}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default OptionalUnitsOverseas;