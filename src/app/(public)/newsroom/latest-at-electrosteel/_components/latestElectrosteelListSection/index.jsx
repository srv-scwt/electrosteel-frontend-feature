"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import PressMediaCard from "@/components/common/card/PressMediaCard";
import { ButtonLink } from "@/components/ui/Button";

const LatestElectrosteelListing = ({ className, data = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      <div className={`${styles.containerLg} ${className} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {Array.isArray(data) && data?.map((post, index) => (
          <PressMediaCard
            key={index}
            post={post}
            onVideoOpen={() => setIsOpen(true)}
            goTo={`/newsroom/latest-at-electrosteel/${post?.slug}`}
          />
        ))}
      </div>
    </section>
  );
};

export default LatestElectrosteelListing;

