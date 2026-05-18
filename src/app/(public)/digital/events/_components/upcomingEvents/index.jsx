import React from "react";
import styles from "./style.module.css";
import { ButtonLink, OutlineButtonLink } from "@/components/ui/Button";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { events } from "./m.data";

const UpcomingEvents = () => {
  return (
    <section className="bg-[#F5F5F5]">
      <div className={styles.containerLg}>
        <div className={`flex gap-2 ${styles.sectionTopTitleGap}`}>
          <div className={`${styles.sectionContentTitle} flex-1`}>
            <h2>
              Upcoming <span>Events</span>
            </h2>
          </div>
          <div className={styles.buttonLink}>
            <ButtonLink goto={"/"} title={"view more"} />
          </div>
        </div>
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ${styles.eventsContainer}`} >
          {events.map((post , index) => (
            <article key={index} className={styles.socialCardWrapper}>
              {/* Image Section */}
              <div className={styles.socialCardImage}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full absolute object-cover rounded-t-[10px]"
                />
              </div>
              <div className={styles.sectionContent}>
                <span>{post.category}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <div className={`${styles.eventDetails} grid `}>
                  <li className="w-max">
                    <SlCalender size={14} />
                    <span>{post.date}</span>
                  </li>
                  <li className="w-max">
                    <MdOutlineWatchLater size={16} />
                    <span>{post.time}</span>
                  </li>
                  <li className="col-span-12">
                    <IoLocationOutline size={16} />
                    <span>{post.location}</span>
                  </li>
                </div>
                <div className={styles.cardLink}>
                  <OutlineButtonLink goto={"/"} title={"Read More"} className={"know-more-btn-font"} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
