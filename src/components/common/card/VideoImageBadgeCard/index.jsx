"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";
import VideoModal from "@/components/modals/VideoModel";
import { createImageSourceURL } from "../../../../utils";

export default function VideoImageBadgeCard({ post }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleVideoModal = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <>
      <article className={styles.socialCardWrapper}>
        <div className="relative">
          <div className={styles.socialCardImage}>
            <Image
              // src={post.image}
              src={createImageSourceURL(post?.image)}
              alt={post?.title}
              fill
              className="w-full h-full absolute object-cover rounded-t-[10px]"
            />
          </div>
          {/* Watch button Badge */}
          <div
            onClick={handleVideoModal}
            className="absolute bottom-[-8%] right-2 bg-white  hover:text-white uppercase hover:bg-[#004aa1] cursor-pointer text-pink-500 px-4 py-2 rounded-full flex items-center gap-2 transition-colors duration-300 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
            <span>Watch</span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <Link href={post?.link ?? ""}>
          <div className={`${styles.sectionContent} mt-3 `}>
            {/* <h3 className={styles.title}>{post.title}</h3> */}
            {/* <p className={`${styles.eventDetails}`}>{post.content}</p> */}
            <h3 >{post?.title ?? ""}</h3>
            <p>{post?.content ?? ""}</p>
          </div>
        </Link>
      </article>

      <VideoModal
        isModelOpen={isOpen}
        onClose={handleVideoModal}
        title="Watch Our Latest Video"
        videoLink={post?.video_link}
      />
    </>
  );
}
