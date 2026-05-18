"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { OutlineButtonLink } from "@/components/ui/Button";
import TrackerRope from "./TrackerRope";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

const ITEMS_PER_SLIDE = 4;

const OurJourney = ({ label, data = [] }) => {
  const containerRef = useRef(null);

  const totalSteps = data.flat().length;
  console.log(totalSteps , "slider data ");
  
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedCount((prev) =>
        prev === totalSteps ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSteps , data]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDown = (e) => {
      isDown = true;
      startX = e.pageX;
      scrollLeft = container.scrollLeft;
    };

    const handleMove = (e) => {
      if (!isDown) return;
      container.scrollLeft = scrollLeft - (e.pageX - startX);
    };

    const handleUp = () => {
      isDown = false;
    };

    container.addEventListener("mousedown", handleDown);
    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseup", handleUp);
    container.addEventListener("mouseleave", handleUp);

    return () => {
      container.removeEventListener("mousedown", handleDown);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseup", handleUp);
      container.removeEventListener("mouseleave", handleUp);
    };
  }, [data]);

  let globalIndex = 0;

  return (
    <section className={styles.ourMilestoneSection}>
      <div className={styles.mileStoneBannerWrapper}>
        <div className={styles.mileStoneBanner}>
          <Image
            src="/images/pipeBanner.png"
            alt="pipeBanner"
            fill
            className="absolute object-cover object-center"
          />
        </div>
        <div className={styles.triangle}></div>
      </div>

      <div className={styles.sectionContentTitle}>
        <HTMLRender htmlString={`<h2>${label?.title}</h2>`} />
        <HTMLRender htmlString={`<h3>${label?.description}</h3>`} />
      </div>
      <div ref={containerRef} className={styles.pipeGifContainer}>
        {Array.isArray(data) && data?.map((slides, slideIndex) => {
          const slideCompletedCount = Math.min(
            Math.max(completedCount - slideIndex * ITEMS_PER_SLIDE, 0),
            ITEMS_PER_SLIDE
          );

          const trackerFill =
            (slideCompletedCount / ITEMS_PER_SLIDE) * 100;

          return (
            <div key={slideIndex} className={styles.pipeGifWrapper}>
              <div className={styles.tracker}>
                <TrackerRope fillPercentage={trackerFill} />
              </div>

              <div className={styles.journeyCardWrapper}>
                {Array.isArray(slides) && slides?.map((itemData) => {
                  globalIndex++;

                  if (globalIndex > completedCount) return null;

                  return (
                    <div key={itemData?.id} className={styles.journeyCard}>
                      <Image
                        src={createImageSourceURL(itemData?.image)}
                        width={143}
                        height={80}
                        alt="paani"
                      />

                      <div className={styles.cardContent}>
                        <p>{itemData?.title}</p>
                        <h4>{itemData?.description}</h4>

                        <OutlineButtonLink
                          goto={itemData?.link || '#'}
                          title="Know More"
                          className="font-700 know-more-btn-font"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurJourney;
