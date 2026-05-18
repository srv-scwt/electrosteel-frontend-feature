import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";

const page = () => {
  const heroData = {
    banner: "/images/blog/blogBanner.jpg",
    title: "Disclaimer",
  };

 const data = `
 <h2></h2>
 <p>Electrosteel Castings Ltd. has taken all reasonable care in developing the website, and we believe that all information is accurate at the time of publication or last modification.</p>
 </br>
 <p>The Company reserves the right to make changes to this site without notice and will not be liable for any damages arising from the use of this site. Nor is it responsible for the content of any other websites linked from here.</p>
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
