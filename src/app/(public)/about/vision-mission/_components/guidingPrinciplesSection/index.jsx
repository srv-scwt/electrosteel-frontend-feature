"use client";
import Image from "next/image";
// import styles from "./style.module.css";
import styles from "@/app/common.module.css"

export default function GuidingPrinciples() {
  // Dynamic data array
  const principlesData = [
    {
      id: 1,
      img: "/images/icons/icon4.png",
      bg: "#fdc700",
      title: "Transparency and Shareholder Value",
      desc: "The Company recognizes its primary obligation to generate a superior return for its shareowners through a prudent strategy, reasonable payouts of dividend and a fair degree of corporate transparency that does not threaten its competitive position in the marketplace.",
    },
    {
      id: 2,
      img: "/images/icons/icon5.png",
      bg: "#fdc700",
      title: "Customer Centricity",
      desc: "At Electrosteel, our customers are the central focus around which the Company revolves. We proactively strive to provide them a unique customer experience.",
    },
    {
      id: 3,
      img: "/images/icons/icon6.png",
      bg: "#fdc700",
      title: "Respect for People",
      desc: "People represent our intellectual capital. Respect for the individual is of paramount importance. We treat our people like members, not employees. We provide an exciting working environment. We recognize that learning is an important part of the growing process.",
    },
    {
      id: 4,
      img: "/images/icons/icon7.png",
      bg: "#004aa1",
      title: "Community Development",
      desc: "We do not live for bread alone. The Company is committed to contributing meaningfully to the community and society in which it lives.",
    },
    {
      id: 5,
      img: "/images/icons/icon8.png",
      bg: "#004aa1",
      title: "Leadership",
      desc: "Electrosteel's focus is to emerge as a great company - with leaders not only at the top, but at every level.",
    },
    {
      id: 6,
      img: "/images/icons/icon9.png",
      bg: "#fdc700",
      title: "Environment",
      desc: "Electrosteel's world does not end with the perimeter of its office and factory. It extends beyond: to conducting its various manufacturing processes with adequate respect for a safe and pollution-free environment.",
    },
    {
      id: 7,
      img: "/images/icons/icon10.png",
      bg: "#004aa1",
      title: "Teamwork",
      desc: "The Company recognizes its primary obligation to generate a superior return for its shareowners through a prudent strategy, reasonable payouts of dividend and a fair degree of corporate transparency that does not threaten its competitive position in the marketplace.",
    },
  ];

  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2>
            Guiding <span>Principles</span>
          </h2>
          <p className="mb-5">
            Our Guiding Principles help us to grow, thrive, prosper and realize
            our vision.
          </p>

          <div className="guidingWrapper grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {principlesData.map((item) => (
              <div
                key={item.id}
                className="guidingItem bg-white p-5 rounded-[12px] shadow-md h-full"
              >
                <div
                  className="guideingLeft relative w-[83px] h-[83px] rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: item.bg }}
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="!relative !w-[40px] !h-auto"
                  />
                </div>

                <div className="guidingRight">
                  <p>
                    <b>{item.title}</b>
                  </p>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
