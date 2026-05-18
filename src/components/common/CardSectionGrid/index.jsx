"use client";
import Image from "next/image";
import cstyles from "@/app/common.module.css";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";

const socialPosts = [
  {
    id: 1,
    title: "Export Brochure",
    img: "/images/certificate/c1.png",
    link: "#",
  },
  {
    id: 2,
    title: "Ductile Iron Pipes & Fittings",
    img: "/images/certificate/c2.png",
    link: "#",
  },
  {
    id: 3,
    title: "Ductile Iron Fittings",
    img: "/images/certificate/c3.jpg",
    link: "#",
  },
  {
    id: 4,
    title: "Domestic Range Brochure",
    img: "/images/certificate/c4.png",
    link: "#",
  },
  {
    id: 5,
    title: "Electrolock Restrained Joint Pipe & Fittings",
    img: "/images/certificate/c5.jpg",
    link: "#",
  },
  {
    id: 6,
    title: "Electrolock Joint Clamp Fittings",
    img: "/images/certificate/c6.png",
    link: "#",
  },
  {
    id: 7,
    title: "Electro-PUC Ductile Iron Pipes with PU Coating",
    img: "/images/certificate/c7.jpg",
    link: "#",
  },
];
export default function CardSectionGrid() {
  return (
    <section className="bg-[#f9f9f9]">
      <div className={cstyles.containerLg}>
        <div className={`${cstyles.sectionContent}`}>
          <h2>
            <span>Product Broucher</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialPosts.map((post, index) => (
            <div key={post.id} className={styles.socialCardWrapper}>
              <div className={`${styles.sectionContent} min-h-[90px]`}>
                <h3>{post.title}</h3>
              </div>
              <div
                className={`${styles.socialCardImage} relative w-full aspect-square`}
              >
                <Image
                  src={post.img}
                  alt={post.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.cardLink}>
                  <OutlineButtonLink
                    goto={"/"}
                    title={"Download"}
                    className={"!text-white"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
