"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import VideoImageBadgeCard from "@/components/common/card/VideoImageBadgeCard";

const LegendVideoCard = ({ className, events = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoLink, setVideoLink] = useState(null);

  console.log(events );
  

  const handleVideoOpen = (id) => {
    setVideoLink(id);
    setIsOpen(true);
  };

  return (
    <section>
      <div className={`${styles.containerLg} ${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {Array.isArray(events) && events.map((post, index) => (
          <VideoImageBadgeCard
            key={index}
            post={post}
            onVideo={() => handleVideoOpen(post?.link)}
          />
        ))}
      </div>
    </section>
  );
};

export default LegendVideoCard;
