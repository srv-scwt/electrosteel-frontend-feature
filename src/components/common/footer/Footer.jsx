import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";
import { footerData, copyrightLinks, supportPartnersImage, socialMedia } from './footer.data'
import { getSocialIconsData } from "@/services/social-icons/socialIcons.api";

// comment
const Footer = async () => {
  const socialApiData = await getSocialIconsData();
  const socialItem = socialApiData?.data?.[0];

  const apiLinks = [
    socialItem?.icon1,
    socialItem?.icon2,
    socialItem?.icon3,
    socialItem?.icon4,
    socialItem?.icon5,
  ].filter(Boolean);
console.log( socialMedia[0])
  const updatedSocialLinks = socialMedia[0].links.map(link => {
    let url = link.url;
    const matchedUrl = apiLinks.find(api_url => {
      const lower = api_url.toLowerCase();
      if (link.platform === "LinkedIn" && lower.includes("linkedin")) return true;
      if (link.platform === "Facebook" && lower.includes("facebook")) return true;
      if (link.platform === "Instagram" && lower.includes("instagram")) return true;
      if (link.platform === "Twitter" && (lower.includes("twitter") || lower.includes("x.com"))) return true;
      if (link.platform === "YouTube" && lower.includes("youtube")) return true;
      return false;
    });

    return { ...link, url: matchedUrl || url };
  });
  console.log("updatedSocialLinks: ", updatedSocialLinks)

  return (
    <footer className="bg-[#00418E] text-white">
      <div className={styles.containerLg}>
        <div className="lg:grid lg:grid-cols-12 pb-[32px] lg:gap-4 grid-cols-1 grid-none gap-0">
          <div className="col-span-8">
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 ${styles.footerGrid}`}
            >
              {footerData.map((section, idx) => (
                <div key={idx}>
                  <div className={styles.sectionContentTitle}>
                    <h6>{section.title}</h6>
                  </div>

                  {/* Products List */}
                  <div className={styles.sectionContent}>
                    {section.type === "list" && (
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i}>
                            <Link href={item.url} className="hover:underline">
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Address Sections */}
                  <div className={styles.sectionContent}>
                    {section.type === "address" && (
                      <div className="space-y-3">
                        {section.address.map((addr, i) => (
                          <div key={i}>
                            {addr.label.map((line, j) => (
                              <p key={j}>{line}</p>
                            ))}
                          </div>
                        ))}

                        <div className="mt-3 space-y-1">
                          {section.contacts.map((contact, i) => (
                            <p key={i}>
                              {contact.name ? (
                                <>
                                  <strong>{contact.name}</strong>{" "}
                                  <Link
                                    href={`tel:${contact.phone}`}
                                    className="hover:underline"
                                  >
                                    {contact.phone}
                                  </Link>
                                </>
                              ) : (
                                <>
                                  <strong>{contact.type}</strong>{" "}
                                  <Link
                                    href={`${contact.url}`}
                                    className="hover:underline"
                                  >
                                    {contact.value}
                                  </Link>
                                </>
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* <HTMLRender htmlString={`<ul>
  <li>Electrosteel Castings Limited</li>
  <li>G.K. TOWER</li>
  <li>19, Camac Street</li>
  <li>Kolkata - 700 017</li>
</ul>

<!-- Contact Section -->
<ul>
  <li>Ph. +91-33-22839990 / 71034400</li>
  <li>Fax +91-33-22894336 (Directors)</li>
  <li>+91-33-22894337 (Sales)</li>
  <li>+91-33-2289-4338 (Export)</li>
  <li>+91-33-22894339 (Finance)</li>
</ul>`} /> */}

                  </div>

                  {/* Social Links */}
                  {/* {section.type === "social" && (
                <div className="flex space-x-2 mt-2">
                  {section.links.map((link, i) => (
                    <Link key={i} href={link.url} target="_blank">
                      <div className={styles.socialLinkIcon}>
                        <Image
                          src={link.image}
                          alt={link.platform}
                          fill
                          className="absolute w-[100%] h-[100%] object-fill object-center hover:opacity-75"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              )} */}
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4">
            {/* partner  footer updated2*/}
            <div
              className={`${styles.supportPartnerContainer} flex items-end justify-start !pt-0 mt-5 lg:mt-0`}
            >
              <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-6 gap-5">
                {supportPartnersImage?.map((items, index) => (
                  <div key={index} className={`flex flex-col gap-2 ${index < 2 ? "col-span-3" : "col-span-2"
                    }`}>
                    <div className={styles.sectionContent}>
                      <strong>{items?.label}</strong>
                    </div>
                    <Image
                      src={items?.path}
                      width={items.width}
                      height={items?.height}
                      alt={items?.alt ?? "asdasd"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


        <div className={styles.footerCopyRight}>
          <div className={styles.sectionContents}>
            <div className="flex lg:flex-row flex-col justify-between gap-3 items-center">
              <ul className="flex flex-1 flex-row items-center mb-2 md:mb-0 flex-wrap justify-center md:justify-normal">
                {copyrightLinks?.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <Link href={item?.url} className="hover:underline">
                      <span>{item?.label}</span>
                    </Link>
                    {index !== copyrightLinks.length - 1 && (
                      <span className="mx-2">|</span>
                    )}
                  </li>
                ))}
                <li><span className="mx-2">|</span>2025 Electrosteel Castings Limited.</li>
              </ul>
              {/* SOCIAL MEDIA ICONS */}
              <div className="flex items-center gap-3">
                {updatedSocialLinks.map((link, i) => (
                  <Link key={i} href={link.url} target="_blank">
                    <div className={styles.socialLinkIcon}>
                      <Image
                        src={link.image}
                        alt={link.platform}
                        fill
                        className="absolute w-[100%] h-[100%] object-fill object-center hover:opacity-75"
                      />
                    </div>
                  </Link>
                ))}
              </div>

              {/* <p>&copy; 2025 Electrosteel Castings Limited.</p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
