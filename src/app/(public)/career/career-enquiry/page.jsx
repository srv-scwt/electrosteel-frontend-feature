import React from 'react';
import HeroSection from '@/components/common/heroSection';
import ContentSection from '@/components/common/contentSection';
import { careerData } from '../career.data';
import cstyles from "@/app/common.module.css";
import CareerEnquiryForm from '../_components/forms/CareerEnquiryForm';

const page = () => {
  return (
    <>
        <HeroSection data={{title: "Career Enquiry" , banner:"/images/board/enquiry_banner_big.jpg"}} />
        <section id="career-enquiry" className="scroll-mt-24 pb-12 pt-8">
          <ContentSection data={careerData.careerEnquiry} />
          <div className={`${cstyles.containerLg} !pt-0`}>
            <CareerEnquiryForm />
          </div>
        </section>
    </>
  )
}

export default page;