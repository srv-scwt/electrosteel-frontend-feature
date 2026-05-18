"use client"
import Container90 from "@/components/common/Container90";
import React, { useState } from "react";
import styles from "./style.module.css";
import { SlCalender } from "react-icons/sl";
import { events } from "./m.data";
import Image from "next/image";
import HorizontalSwipe from "@/components/ui/HorizontalSwipe";
import VideoModal from "@/components/modals/VideoModel";
import SectionTitleWithButton from "@/components/ui/sectionTitleWithButton";
const HandPickedVideos = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <section className={styles.sectionSpacing}>
      <Container90>
        <SectionTitleWithButton
          title={"<h2>Hand-picked <span>Videos</span></h2>"}
          buttonActive={false}
          rightParaActive={true}
        />
      </Container90>

      <div className={styles.containerLeft}>
        <HorizontalSwipe>
          {events.map((post, index) => (
            <article key={index} className={`${styles.socialCardWrapper}`}>
              <div className={styles.socialCardImage}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="w-full h-full absolute object-cover rounded-t-[10px]"
                />
                <button onClick={() => setIsOpen(true)} className={styles.playButton}>
                  <svg
                    width="110"
                    height="110"
                    viewBox="0 0 110 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="55"
                      cy="55"
                      r="55"
                      fill="#003879"
                      fill-opacity="0.69"
                    />
                    <path
                      d="M83.3281 54.9993L40.8281 79.5367L40.8281 30.462L83.3281 54.9993Z"
                      fill="#FDD307"
                    />
                  </svg>
                </button>
              </div>
              <div className={styles.sectionContent}>
                <span>{post.category}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <ul className={`${styles.eventDetails} flex flex-wrap gap-1 `}>
                  <li>
                    <SlCalender size={14} color="white" />
                    <span>{post.date}</span>
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </HorizontalSwipe>
      </div>
        <VideoModal
        isModelOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Watch Our Latest Video"
      />
    </section>
  );
};

export default HandPickedVideos;
