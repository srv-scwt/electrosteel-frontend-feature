"use client";
import Container90 from '@/components/common/Container90';
import { OutlineBackButtonLink} from '@/components/ui/Button';
import { Calendar, MapPin } from 'lucide-react';
import styles from "./style.module.css";
import React from 'react'

const EventDetails = () => {
  return (
    <>
    <section>
              <Container90>
                <div className={styles.blogDetailsContent}>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center :items-start gap-3 lg:gap-[20px] mb-[40px]">
                    <div>
                      <h2>Electrosteel Proudly Partners with Daamini</h2>
                      <div className="flex flex-col md:flex-row md:gap-[16px] gap-2">
                        <div className='flex gap-3 mb-0'><Calendar/> <span className='text-[#004AA1] uppercase'>September 16, 2024</span></div>
                        <div className='flex gap-3 mb-0'><MapPin/> <span className='text-[#004AA1] uppercase'>Binbirdirek, Celine Hotel, Kolkata</span></div>
                      </div>
                    </div>
                     <OutlineBackButtonLink
                      goto={"/news/blog/hgjh"}
                      title={"Back"}
                      className={"btn-back-outline-text"}
                  />
                  </div>
                  <h3>The 10th Water Innovation Summit "Viksit Bharat @2024, Water Partnerships for Sustainable and Inclusive Growth" was held recently at New Delhi on 12-13th November. In this summit, leaders from Electrosteel shared their vision on Viksit Bharat 2047 and discussed the role of water and Electrosteel's contribution in the journey towards a developed India by 2047.</h3>
                  
                  <p>The event was organised by CII Water Institute to bring together stakeholders to discuss and deliberate on diverse water-related issues Electrosteel is a Platinum member of the CII Water Institute and sponsored a special session named as Leader's vision on Viksit Bharat 2047 @ Water. We organised a guest presentation by Mr. Agam Mathur, Retd. Chief Engineer of PHED Rajasthan. Mr. Atindra Narayan Dey (AVP-Technical Services) was one of the panellists in this session. </p>
                  
                  <p>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.From addressing non-revenue water and lifecycle cost management to leveraging technology for efficient water use, the discussions highlighted strategies to overcome critical challenges. Insights from fellow visionary leaders revealed how sustainable practices, innovation, and collaboration can ensure water security, support economic growth, and create resilient communities.</p>
                  <p>The event was organised by CII Water Institute to bring together stakeholders to discuss and deliberate on diverse water-related issues Electrosteel is a Platinum member of the CII Water Institute and sponsored a special session named as Leader's vision on Viksit Bharat 2047 @ Water. We organised a guest presentation by Mr. Agam Mathur, Retd. Chief Engineer of PHED Rajasthan. Mr. Atindra Narayan Dey (AVP-Technical Services) was one of the panellists in this session. </p>
                  <h4>The 10th Water Innovation Summit "Viksit Bharat @2024, Water Partnerships for Sustainable and Inclusive Growth" was held recently at New Delhi on 12-13th November. In this summit, leaders from Electrosteel shared their vision on Viksit Bharat 2047 and discussed the role of water and Electrosteel's contribution in the journey towards a developed India by 2047.</h4>
                  <p>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.From addressing non-revenue water and lifecycle cost management to leveraging technology for efficient water use, the discussions highlighted strategies to overcome critical challenges. Insights from fellow visionary leaders revealed how sustainable practices, innovation, and collaboration can ensure water security, support economic growth, and create resilient communities.</p>

                  <ul>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                  </ul>
                </div>
              </Container90>
            </section> 
    </>
  )
}

export default EventDetails