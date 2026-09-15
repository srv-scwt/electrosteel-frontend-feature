"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { OutlineButton, OutlineButtonLink } from "@/components/ui/Button";
import { timelineData } from "./m.data";
import HistoryModal from "@/components/modals/historymodal";

const OurMileStoneSection = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [selectModal, setSelectModal] = useState(null);
  const containerRef = useRef(null);

  const handleModal = (selected, open) => {
    setSelectModal(selected);
    setModelOpen(open);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDown = (e) => {
      isDown = true;
      container.classList.add(styles.active);
      startX = e.pageX; // mouse X
      scrollLeft = container.scrollLeft;
      e.preventDefault(); // prevent text selection while dragging
    };

    const handleMove = (e) => {
      if (!isDown) return;
      const x = e.pageX;
      const walk = x - startX; // no multiplier, instant 1:1 scroll
      container.scrollLeft = scrollLeft - walk;
    };

    const handleUp = () => {
      isDown = false;
      container.classList.remove(styles.active);
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
  }, []);

  return (
    <section className={`${styles.ourMilestoneSection}`}>
      {/* -- Banner Background -- */}
      <div className={`${styles.mileStoneBannerWrapper}`}>
        <div className={`${styles.mileStoneBanner}`}>
          <Image
            src={"/images/pipeBanner.png"}
            alt="pipeBanner"
            fill
            className="absolute object-cover object-center"
          />
        </div>
        <div className={styles.triangle}></div>
      </div>

      <div className={`${styles.sectionContentTitle}`}>
        <h2>Our Milestones</h2>
        <h3>
          A Legacy Brand with <span>60 years of heritage</span>
        </h3>
      </div>

      <div ref={containerRef} className={`${styles.pipeGifContainer}`}>
        {/* {Array.from({ length: 2 }).map((_, index) => ( */}
        {timelineData.map((data, index) => (
          <div key={index} className={`${styles.pipeGifWrapper}`}>
            <Image
              src={"/images/gif/pipe.gif"}
              fill
              alt="pipe"
              className="absolute object-contain object-center"
            />
            <div className={styles.mileStoneContent}>
              <ul>
                {data.map((item, i) => (
                  <li key={i}>
                    <p>{item?.year ?? ""}</p>
                    <h4>{item?.title ?? ""}</h4>
                    <OutlineButton
                      action={() => handleModal(item, true)}
                      title={"know More"}
                      className={"font-700 know-more-btn-font"}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className={`flex items-center justify-center ${styles.finalButton}`}>
        <OutlineButtonLink
          goto={"/about/profile/milestones"}
          title={"Read History In Detail"}
          className={"font-700"}
        />
      </div>
      {isModelOpen && (
        <HistoryModal isOpen={!!selectModal} action={() => handleModal(null, false)} historyData={selectModal} />
      )}
    </section>
  );
};

export default OurMileStoneSection;
