import React from "react";
import HeroSection from "@/components/common/heroSection";
import HTMLRender from "@/components/ui/HTMLRender";
import styles from "@/app/common.module.css";
import { getOurCommitments } from "@/services/ourCommitment.api";
import SomethingWentWrong from "@/components/common/SomethingWentsWrong";
const heroData = {
  banner: "/images/product-details/ductile-iron-pipes-banner.png",
  title: "OUR COMMITMENT GOING FORWARD",
};

const data = {
 title: "Sustaining Impact.<span> Deepening Roots.</span>",
 description: `<p>At Electrosteel Castings Limited, sustainability is not a department - it is a disposition. It shapes how we treat the people who build our pipes, the communities that surround our plants, and the environment we all share.</p>

 <p>Our people are our greatest asset, and the welfare measures we have built over decades reflect a simple belief: when employees thrive, organisations do too. From subsidised meals to emergency financial support, from health insurance to cooperative savings, every initiative is designed to make life a little more secure, a little more dignified for those who give Electrosteel their best every day.</p>
 
 <p>Beyond our gates, we recognise that the trust of a community must be earned, not assumed. Our work in health, education, women’s empowerment, and environmental care is our ongoing answer to that responsibility. We do not measure success only in pipes produced or markets served, but in schools better equipped, in families healthier, in women more self-reliant, and in villages greener than before.</p>

 <p>As we grow, so does our commitment. We remain dedicated to deepening these programmes, expanding their reach, and ensuring that Electrosteel’s presence is a source of pride, not just for our shareholders but for every community that calls us a neighbour.</p>`
};

const page = async () => {

  const OurCommitments = await getOurCommitments();
  if (!OurCommitments || OurCommitments.error) return <SomethingWentWrong />

  return (
    <>
      <HeroSection data={OurCommitments?.data?.heroData?.[0]} />
      <section>
        <div className={`${styles.containerLg}`}>
          <div className={`${styles.sectionContent} ${styles.customUlListing}`}>
            <HTMLRender htmlString={`<h2>${OurCommitments?.data?.sustainingImpactSection?.[0]?.title}</h2>`} />
            <HTMLRender htmlString={OurCommitments?.data?.sustainingImpactSection?.[0]?.description} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
