"use client";

import React from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
import { OutlineButton, OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";
import { createImageSourceURL, formatDate } from "@/utils";
import useLoadMoreData from "@/hooks/useLoadMoreData";

const UpcomingEvents = ({ data = [] }) => {
  const { visibleData, hasMore, handleLoadMore } = useLoadMoreData(data, 6);

  return (
    <section className="bg-[#F5F5F5]">
      <div className={cstyles.containerLg}>
        <SectionTitleWithButton
            title={"<h2>Upcoming <span>Events</span></h2>"}
            buttonActive={false}
            titleCenter={true}
          />
       
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${styles.eventsContainer}`} >
          {visibleData?.map((post , index) => (
            <article
              key={post?.id ?? post?.slug ?? index}
              className={styles.socialCardWrapper}
            >
              {/* Image Section */}
              <div className={styles.socialCardImage}>
                <Image
                  src={createImageSourceURL(post?.image)}
                  alt={post?.title}
                  fill
                  className="w-full h-full absolute object-cover rounded-t-[10px]"
                />
              </div>
              <div className={styles.sectionContent}>
                <span>{post?.category}</span>
                <h3 className={styles.title}>{post?.title}</h3>
                <div className={`${styles.eventDetails} grid `}>
                  <li className="w-max">
                    <SlCalender size={14} />
                    <span>{formatDate(post?.date)}</span>
                  </li>
                 {post?.time && <li className="w-max">
                    <MdOutlineWatchLater size={16} />
                    <span>{post?.time}</span>
                  </li>}
                  <li className="col-span-12">
                    <IoLocationOutline size={16} />
                    <span>{post?.location}</span>
                  </li>
                </div>
                <div className={styles.cardLink}>
                  <OutlineButtonLink goto={`/newsroom/events/${post?.slug}`} title={"Read More"} className={"know-more-btn-font"} />
                </div>
              </div>
            </article>
          ))}
        </div>
        {hasMore ? (
          <div className={`${cstyles.containerLg} pb-0! w-full flex items-center justify-center`}>
            <OutlineButton
              action={handleLoadMore}
              title={"load more"}
              className={"flex items-center !justify-center"}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default UpcomingEvents;
