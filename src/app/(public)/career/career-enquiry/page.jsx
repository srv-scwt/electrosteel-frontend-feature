import React from 'react';
import Script from 'next/script';
import HeroSection from '@/components/common/heroSection';
import ContentSection from '@/components/common/contentSection';
import { careerData } from '../career.data';
import cstyles from "@/app/common.module.css";

const page = () => {
  return (
    <>
        <HeroSection data={{title: "Career Enquiry" , banner:"/images/board/enquiry_banner_big.jpg"}} />
        <section id="career-enquiry" className="scroll-mt-24 pb-12 pt-8">
          <ContentSection data={careerData.careerEnquiry} />
          <div className={`${cstyles.containerLg} !pt-0`}>
            <div
              id="xr-frame-wrap"
              data-xpid="electrosteel"
              data-xsn="electrosteel"
              data-xlng="en"
              data-xcls="x-no-lang"
              data-xchost="electrosteel.x0pa.ai"
              style={{
                width: "100%",
                minHeight: "100vh",
              }}
            />
            <Script
              type="module"
              src="https://xcdn.x0pa.ai/xfe/pjs/electro-embed.js"
              strategy="afterInteractive"
            />
          </div>
        </section>
    </>
  )
}

export default page;