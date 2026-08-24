import React from "react";
import Link from "next/link";
import styles from "./style.module.css";
import Image from "next/image";
import { footerData, socialMedia } from './footer.data'
import { getGlobalSettingsData } from "@/services/globalSettings.api";

// comment
const Footer = async () => {
  const globalApiDataRes = await getGlobalSettingsData();
  const apiData = globalApiDataRes?.data || {};

  const socialItem = apiData?.social_links?.[0];

  const apiLinks = [
    socialItem?.icon1,
    socialItem?.icon2,
    socialItem?.icon3,
    socialItem?.icon4,
    socialItem?.icon5,
  ].filter(Boolean);

  const updatedSocialLinks = socialMedia[0].links.map(link => {
    let url = link.url;
    const matchedUrl = apiLinks.find(api_url => {
      const lower = api_url.toLowerCase();
      if (link.platform === "LinkedIn" && lower.includes("linkedin")) return true;
      if (link.platform === "Twitter" && (lower.includes("twitter") || lower.includes("x.com"))) return true;
      if (link.platform === "Facebook" && lower.includes("facebook")) return true;
      if (link.platform === "Instagram" && lower.includes("instagram")) return true;
      if (link.platform === "YouTube" && lower.includes("youtube")) return true;
      return false;
    });

    return { ...link, url: matchedUrl || url };
  });

  // Force fixed platform order
  const platformOrder = ["LinkedIn", "Twitter", "Facebook", "Instagram", "YouTube"];

  const sortedSocialLinks = [...updatedSocialLinks].sort(
    (a, b) => platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform)
  );

  // 2. Format Copyright Links dynamically
  const footerLinksArr = Array.isArray(apiData?.footer_links) ? apiData.footer_links : [];
  const copyrightLinksDynamic = footerLinksArr.length > 0
    ? footerLinksArr.map(link => ({ label: link.text || link.label, url: link.url }))
    : [
      { label: "Disclaimer", url: "/disclaimer" },
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Sitemap", url: "/sitemap" },
    ];
  const copyrightText = apiData?.copyright || "2025 Electrosteel Castings Limited.";

  // 3. Format Address Columns dynamically
  const productsCol = apiData?.products?.length > 0 ? {
    title: "PRODUCTS",
    type: "list",
    items: apiData.products.map(p => ({
      label: p.title,
      url: p.link
    }))
  } : footerData[0];

  const registeredOfficeDynamic = apiData?.registered_office ? {
    title: apiData.registered_office.title,
    type: "address",
    address: [
      {
        label: [
          apiData.registered_office.address?.line1,
          apiData.registered_office.address?.line2,
          apiData.registered_office.address?.line3,
          apiData.registered_office.address?.line4,
        ].filter(Boolean),
        url: "",
      },
    ],
    contacts: apiData.registered_office.contacts?.map(c => ({
      name: c.name,
      phone: c.phone,
      url: "/"
    })) || [],
  } : footerData[1]; // fallback to static

  const corporateOfficeDynamic = apiData?.corporate_office ? {
    title: apiData.corporate_office.title,
    type: "address",
    address: [
      {
        label: [
          apiData.corporate_office.company_name,
          apiData.corporate_office.address?.line1,
          apiData.corporate_office.address?.line2,
          apiData.corporate_office.address?.line3,
        ].filter(Boolean),
        url: "/",
      },
    ],
    contacts: apiData.corporate_office.phone_numbers?.map(c => ({
      type: c.department,
      value: c.phone,
      url: `tel:${c.phone?.split('/')[0]?.trim()}`
    })) || [],
  } : footerData[2]; // fallback to static

  const dynamicColumns = [productsCol, registeredOfficeDynamic, corporateOfficeDynamic].filter(Boolean);

  // 4. Format Footer Images dynamically
  const footerImagesData = apiData?.footer_images || {};
  const hrAreas = footerImagesData.hr_areas || [];
  const businessAreas = footerImagesData.business_areas || [];
  const certificates = footerImagesData.certificates || [];

  // Keywords that identify a "label-style" contact type (Phone, Fax, Tel, etc.)
  // Add more keywords here anytime — e.g. 'mobile', 'whatsapp'
  const labelTypeKeywords = ['fax', 'ph', 'tel'];

  return (
    <footer className="bg-[#00418E] text-white">
      <div className={styles.containerLg}>
        <div className="lg:grid lg:grid-cols-12 pb-[32px] lg:gap-4 grid-cols-1 grid-none gap-0">
          <div className="col-span-8">
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8 ${styles.footerGrid}`}
            >
              {dynamicColumns.map((section, idx) => (
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
                          {section.contacts.map((contact, i) => {
                            const type = contact.type?.toLowerCase() || "";
                            const isLabelType = labelTypeKeywords.some(k => type.includes(k));
                            const match = contact.value?.match(/\(([^)]+)\)/);

                            // Clean the url: strip anything after the number (spaces, parens, etc.)
                            const cleanUrl = contact.url?.split(/[\s(]/)[0]?.trim() || "#";

                            return (
                              <p key={i}>
                                {contact.name ? (
                                  <>
                                    <strong>{contact.name}</strong>{" "}
                                    <Link href={`tel:${contact.phone}`} className="hover:underline">
                                      {contact.phone}
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    {isLabelType ? <strong>{contact.type} </strong> : null}
                                    <Link href={cleanUrl} className="hover:underline">
                                      {contact.value?.split('(')[0]?.trim()}
                                    </Link>
                                    {match
                                      ? ` (${match[1]})`
                                      : (!isLabelType && contact.type ? ` (${contact.type})` : "")}
                                  </>
                                )}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4">
            {/* partner footer */}
            <div
              className={`${styles.supportPartnerContainer} flex items-end justify-start !pt-0 mt-5 lg:mt-0`}
            >
              {apiData?.footer_images ? (
                <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-6 gap-5 w-full">
                  {/* HR Areas */}
                  {hrAreas.length > 0 && (
                    <div className="col-span-3 flex flex-col gap-2">
                      <div className={styles.sectionContent}><strong>HR Areas</strong></div>
                      <div className="flex gap-2 h-[80px]">
                        {hrAreas.map((img, i) => (
                          <div key={i} className="relative w-full h-full">
                            <Image src={img.image} alt="" fill className="object-contain object-left-bottom" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Business Areas */}
                  {businessAreas.length > 0 && (
                    <div className="col-span-3 flex flex-col gap-2">
                      <div className={styles.sectionContent}><strong>Business Areas</strong></div>
                      <div className="flex gap-2 h-[80px]">
                        {businessAreas.map((img, i) => (
                          <div key={i} className="relative w-full h-full">
                            <Link target="_blank" href="/images/162355236_Electrosteel_Group_Wins_ET_Iconic_Awards_171023.pdf">
                              <Image src={img.image} alt="" fill className="object-contain object-left-bottom" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Certificates */}
                  {certificates.length > 0 && (
                    <div className="col-span-6 flex flex-col gap-2">
                      <div className={styles.sectionContent}>
                        <strong>Certificates</strong>
                      </div>
                      <div className="flex flex-row gap-4 sm:gap-10 items-center footer-certificates-logo">
                        {certificates.map((img, i) => (
                          <Image
                            key={i}
                            src={img.image}
                            width={140}
                            height={90}
                            alt={img.title}
                            className="!h-[50px] sm:!h-[85px] !w-auto object-contain"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-12 lg:grid-cols-6 gap-5">
                  {/* Fallback rendering of old static supportPartnersImage here if needed */}
                  {/* Omitted for brevity since API replaces it */}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footerCopyRight}>
          <div className={styles.sectionContents}>
            <div className="flex lg:flex-row flex-col justify-between gap-3 items-center">
              <ul
                className={`${styles.copyrightText} flex flex-1 flex-row items-center mb-2 lg:mb-0 flex-wrap justify-center lg:justify-normal text-center lg:text-left`}
              >
                {copyrightLinksDynamic?.map((item, index) => {
                  const isLast = index === copyrightLinksDynamic.length - 1;
                  const isSecondLast = index === copyrightLinksDynamic.length - 2;
                  const nextIsLast = isSecondLast && !item?.url; // "Developed & Maintained by" case

                  return (
                    <li key={index} className="flex items-center text-[13px] lg:text-base">
                      {item?.url ? (
                        <Link
                          href={item.url}
                          className="hover:underline"
                          {...(isLast && { target: "_blank", rel: "noopener noreferrer" })}
                        >
                          <span>{item?.label}</span>
                        </Link>
                      ) : (
                        <span>{item?.label}</span>
                      )}
                      {!isLast && (
                        <span className="mx-1">{nextIsLast ? "" : "|"}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              {/* SOCIAL MEDIA ICONS */}
              <div className="flex items-center gap-3">
                {sortedSocialLinks.map((link, i) => (
                  <Link key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                    <div className={styles.socialLinkIcon}>
                      <Image
                        src={link.image}
                        alt={link.platform}
                        fill
                        className="absolute w-[100%] h-[100%] object-contain object-center hover:opacity-75"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;