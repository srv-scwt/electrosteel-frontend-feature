"use client";

import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import styles from "@/app/common.module.css";
import Link from "next/link";

const socialLinks = [
  {
    id: 1,
    name: "Facebook",
    icon: <FaFacebook />,
    url: "/",
    gradient:
      "bg-[linear-gradient(135deg,_#1877F2_0%,_#0D5BD7_100%)]",
  },
  {
    id: 2,
    name: "Instagram",
    icon: <FaInstagram />,
    url: "/",
    gradient:
      "bg-[linear-gradient(135deg,_#F58529_0%,_#FEDA77_20%,_#DD2A7B_55%,_#8134AF_80%,_#515BD4_100%)]",
  },
  {
    id: 3,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    url: "/",
    gradient:
      "bg-[linear-gradient(135deg,_#0A66C2_0%,_#004182_100%)]",
  },
  {
    id: 4,
    name: "Twitter",
    icon: <FaXTwitter />,
    url: "/",
    gradient:
      "bg-[linear-gradient(135deg,_#111111_0%,_#3B3B3B_100%)]",
  },
  {
    id: 5,
    name: "Youtube",
    icon: <FaYoutube />,
    url: "/",
    gradient:
      "bg-[linear-gradient(135deg,_#FF0033_0%,_#C8102E_100%)]",
  },
];

const FollowUsSocialmedia = () => {
  return (
    <section>
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <h2>
            <span>Follow</span> Us on
          </h2>

          {/* Grid of social icons */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-5 lg:gap-8 items-start">
            {socialLinks.map((social) => (
              <div key={social.id}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex gap-3 items-center justify-center text-white hover:opacity-90 text-sm md:text-[20px] p-4 shadow-md border  rounded-[12px] transition duration-300 hover:shadow-lg ${social.gradient}`}
                >
                  {social.icon} {social.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FollowUsSocialmedia;
