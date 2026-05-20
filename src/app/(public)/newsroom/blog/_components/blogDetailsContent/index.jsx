"use client";
import { Calendar, MapPin } from "lucide-react";
import React from "react";
import styles from "./style.module.css";
import { OutlineBackButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";
import commonStyles from "@/app/common.module.css";
 
const BlogDetailsContent = ({ data }) => {
  return (
    <>
      <section>
        <div className={`${commonStyles.containerLg} py-0!`}>
          <div className={styles.blogDetailsContent}>
            <div className="flex flex-col lg:flex-row justify-between lg:items-center :items-start gap-3 lg:gap-[20px] mb-[40px]">
              <div>
                {/* comment */}
                <h2>{data?.title}</h2>
                <div className="flex flex-col md:flex-row md:gap-[16px] gap-2">
                  <div className="flex gap-3 mb-0">
                    <Calendar />{" "}
                    <span className="text-[#004AA1] uppercase">
                      {data?.date}
                    </span>
                  </div>
                  <div className="flex gap-3 mb-0">
                    <MapPin />{" "}
                    <span className="text-[#004AA1] uppercase">
                      {data?.location}
                    </span>
                  </div>
                </div>
              </div>
              <OutlineBackButtonLink
                goto={"/newsroom/blog/"}
                title={"Back"}
                className={"btn-back-outline-text"}
              />
            </div>
            <h3>{data?.description}</h3>
            <img
              src={createImageSourceURL(data?.image)}
              alt={data?.title}
              className={styles.alignRight}
            />
            <HTMLRender htmlString={data?.editor_description} />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailsContent;
