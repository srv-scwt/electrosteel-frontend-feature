"use client";
// import Container90 from "@/components/common/Container90";
import { OutlineBackButtonLink } from "@/components/ui/Button";
import { Calendar, MapPin } from "lucide-react";
import styles from "./style.module.css";

import commonStyles from "@/app/common.module.css";

import React from "react";
import HTMLRender from "@/components/ui/HTMLRender";
import { formatDate } from "@/utils";

const EventDetails = ({ data }) => {
  if (!data) return null;

  return (
    <>
      <section>
        <div className={commonStyles.containerLg}>
          {/* <Container90> */}

          <div className={`${styles.blogDetailsContent} !pt-0`}>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center :items-start gap-3 lg:gap-[20px] mb-[40px]">
              <div>
                <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
                <div className="flex flex-col md:flex-row md:gap-[16px] gap-2">
                  {data?.date && (
                    <div className="flex gap-3 mb-0">
                      <Calendar />
                      <span className="text-[#004AA1] uppercase">
                        {formatDate(data?.date)}
                      </span>
                    </div>
                  )}
                  {data?.location && (
                    <div className="flex gap-3 mb-0">
                      <MapPin />
                      <span className="text-[#004AA1] uppercase">
                        {data?.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <OutlineBackButtonLink
                goto={"/newsroom/events"}
                title={"Back"}
                className={"btn-back-outline-text"}
              />
            </div>

            <HTMLRender htmlString={data.description} />
          </div>
          {/* </Container9s0> */}
        </div>
      </section>
    </>
  );
};

export default EventDetails;
