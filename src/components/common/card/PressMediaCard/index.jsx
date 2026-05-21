"use client";

import React from "react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import styles from "./style.module.css";
import Link from "next/link";
import { createImageSourceURL, formatDate } from "@/utils";

export default function PressMediaCard({ goTo , post, onVideoOpen }) {
  const isVideo = post?.type === "video"; // "video" or "image"

  return (
    <Link href={goTo ?? "#"}>
    <article className={styles.socialCardWrapper}>
      
      {/* MEDIA SECTION (Image or Video Thumbsnail) */}
      {post.image && (
        <div className={styles.socialCardImage}>
          <Image
            src={createImageSourceURL(post?.image)}
            alt={post?.title}
            fill
            className="w-full h-full absolute object-cover rounded-t-[10px]"
          />

            {isVideo && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onVideoOpen?.();
                }}
                className={styles.playButton}
              >
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
                    fillOpacity="0.69"
                  />
                  <path
                    d="M83.3281 54.9993L40.8281 79.5367L40.8281 30.462L83.3281 54.9993Z"
                    fill="#FDD307"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className={styles.sectionContent}>
          {post?.subtitle && <span>{post?.subtitle}</span>}

          <h3 className={styles.title}>{post.title}</h3>

          <ul className={`${styles.eventDetails} flex flex-wrap gap-1`}>
            <li>
              <SlCalender size={14} color="white" />
              <span>{formatDate(post.date)}</span>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}
