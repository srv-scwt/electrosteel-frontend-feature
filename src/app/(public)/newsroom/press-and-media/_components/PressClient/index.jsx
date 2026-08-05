"use client"
import React from "react";
import styles from "@/app/common.module.css";
import PressMediaCard from "@/components/common/card/PressMediaCard";
const PressClient = ({ className, data = [] }) => {
  if (!data?.length) return null;

  return (
    <section>
      <div
        className={`${styles.containerLg} ${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
      >
        {Array.isArray(data) &&
          data?.map((post, index) => (
            <PressMediaCard
              key={post?.id || index}
              post={post}
              goTo={`/newsroom/press-and-media/${post?.slug}`}
            />
          ))}
      </div>
    </section>
  );
};

export default PressClient;
