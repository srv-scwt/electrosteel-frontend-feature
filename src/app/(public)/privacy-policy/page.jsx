import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";

const page = () => {
  const heroData = {
    banner: "/images/blog/blogBanner.jpg",
    title: "Privacy Policy",
  };

 const data = `
 <h2></h2>
 <p>Thank you for visiting the Electrosteel website. Visitors are guaranteed privacy and any information collected is kept private and never shared with other organizations. It is used only by the Company to administer your request, if any.</p>
 </br>
 <p>All rights are reserved by Electrosteel Castings Ltd. The content, code and applications contained on this website, under the domain www.electrosteel.com are copyright protected. Site visitors may not reproduce, copy, or redistribute content or code in any form without written permission from Electrosteel.</p>
 <p>
 </br>
 This site has security measures in place to protect the loss, misuse and alteration of the information under our control. Unauthorized attempts to upload or change information (or otherwise cause damage to this website) are strictly prohibited.
 </p>
 `
  return (
    <>
      <HeroSection data={heroData} />
      <section>
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={data} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
