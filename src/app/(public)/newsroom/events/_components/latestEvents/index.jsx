import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";
import React from "react";
import styles from "./style.module.css";
import cstyles from "@/app/common.module.css";
// import { events, latestEvents } from "./m.data";
import {
  OutlineButtonLink,
} from "@/components/ui/Button";
import { IoLocationOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import { createImageSourceURL } from "@/utils";
const LatestEvents = ({ data = [] }) => {
  
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
            {Array.isArray(data) && data?.map((post, index) => (
              <article key={index} className={styles.socialCardWrapper}>
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
                      <span>{post?.date}</span>
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
          <div className={styles.buttonContainer}>
            <OutlineButtonLink
              goto={"/"}
              title={"load more"}
              iconActive={true}
              className={"flex items-center !justify-center"}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestEvents;
