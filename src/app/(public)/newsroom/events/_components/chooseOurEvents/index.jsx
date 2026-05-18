import React from "react";
import styles from "./style.module.css";
import Container90 from "@/components/common/Container90";
import Image from "next/image";
import cstyles from "@/app/common.module.css";

const iconsArray = [
  { icon: "/images/events/icons/i1.png", title: "Business" },
  { icon: "/images/events/icons/i2.png", title: "World" },
  { icon: "/images/events/icons/i3.png", title: "Conference" },
  { icon: "/images/events/icons/i4.png", title: "Sports" },
  { icon: "/images/events/icons/i5.png", title: "Environment" },
  { icon: "/images/events/icons/i6.png", title: "Social" },
  { icon: "/images/events/icons/i7.png", title: "Video" },
];

const ChooseOurEvents = () => {
  return (
    <section className={styles.sectionSpacing}>
      <div className={` ${cstyles.containerLg} py-0!`}>
        <div className={`${styles.sectionContentTitle}`}>
          <h2>Choose our Event topics</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            posuere, nisi nec posuere luctus.
          </p>
        </div>
        <div className={styles.eventsIconsWrapper}>
          <div className="grid w-full grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {iconsArray?.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-2 cursor-pointer flex-1 ${styles.sectionContent}`}
              >
                <div className={styles.iconContainer}>
                  <Image
                    src={item?.icon ?? ""}
                    alt={item.title ?? ""}
                    fill
                    className="absolute w-full h-full object-contain object-center"
                  />
                </div>
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseOurEvents;
