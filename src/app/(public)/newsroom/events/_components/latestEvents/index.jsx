"use client"
import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";
import React from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
// import { events, latestEvents } from "./m.data";
import {
  OutlineButton,
  OutlineButtonLink,
} from "@/components/ui/Button";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import { createImageSourceURL, formatDate } from "@/utils";
import useLoadMoreData from "@/hooks/useLoadMoreData";

const LatestEvents = ({ data = [] }) => {
  const { visibleData, hasMore, handleLoadMore } = useLoadMoreData(data, 6);

  return (
    <>
      <section className={`${styles.sectionSpacing}`}>
        <div className={` ${cstyles.containerLg} py-0!`}>
          <SectionTitleWithButton
            title={"<h2>latest <span>Events</span></h2>"}
            buttonActive={false}
            titleCenter={true}
          />
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${styles.eventsContainer}`}
          >
            {visibleData?.map((post, index) => (
              <article
                key={post?.id ?? post?.slug ?? index}
                className={styles.socialCardWrapper}
              >
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
                  <ul
                    className={`${styles.eventDetails} flex flex-wrap gap-1 `}
                  >
                    <li>
                      <SlCalender size={14} />
                      <span>{formatDate(post?.date)}</span>
                    </li>
                    <li>
                      <IoLocationOutline size={16} />
                      <span>{post?.location}</span>
                    </li>
                  </ul>
                  <div className={styles.cardLink}>
                    <OutlineButtonLink
                      goto={`/newsroom/events/${post?.slug}` || "#w"}
                      title={"Read More"}
                      className={"know-more-btn-font"}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
          {hasMore ? (
            <div className={styles.buttonContainer}>
              <OutlineButton
                action={handleLoadMore}
                title={"load more"}
                className={"flex items-center !justify-center"}
              />
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default LatestEvents;
