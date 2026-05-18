"use client";
import Container90 from '@/components/common/Container90'
import { Calendar, MapPin } from 'lucide-react'
import React from 'react'
import styles from "./style.module.css";
import { OutlineBackButtonLink } from '@/components/ui/Button';
import { date } from 'yup';
import HTMLRender from '@/components/ui/HTMLRender';
import { createImageSourceURL } from '@/utils';

const data = {
  title: "Electrosteel participated at CII's Water Innovation Summit - 2024",
  date: "September 16, 2024",
  address: "Binbirdirek, Celine Hotel, Kolkata",
  decs: `The 10th Water Innovation Summit "Viksit Bharat @2024, Water Partnerships for Sustainable and Inclusive Growth" was held recently at New Delhi on 12-13th November. In this summit, leaders from Electrosteel shared their vision on Viksit Bharat 2047 and discussed the role of water and Electrosteel's contribution in the journey towards a developed India by 2047.`,
  content: `
  <p>The event was organised by CII Water Institute to bring together stakeholders to discuss and deliberate on diverse water-related issues Electrosteel is a Platinum member of the CII Water Institute and sponsored a special session named as Leader's vision on Viksit Bharat 2047 @ Water. We organised a guest presentation by Mr. Agam Mathur, Retd. Chief Engineer of PHED Rajasthan. Mr. Atindra Narayan Dey (AVP-Technical Services) was one of the panellists in this session.</p>
                  
                  <p>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.From addressing non-revenue water and lifecycle cost management to leveraging technology for efficient water use, the discussions highlighted strategies to overcome critical challenges. Insights from fellow visionary leaders revealed how sustainable practices, innovation, and collaboration can ensure water security, support economic growth, and create resilient communities.</p>
                  <p>The event was organised by CII Water Institute to bring together stakeholders to discuss and deliberate on diverse water-related issues Electrosteel is a Platinum member of the CII Water Institute and sponsored a special session named as Leader's vision on Viksit Bharat 2047 @ Water. We organised a guest presentation by Mr. Agam Mathur, Retd. Chief Engineer of PHED Rajasthan. Mr. Atindra Narayan Dey (AVP-Technical Services) was one of the panellists in this session. </p>
                  <h4>The 10th Water Innovation Summit "Viksit Bharat @2024, Water Partnerships for Sustainable and Inclusive Growth" was held recently at New Delhi on 12-13th November. In this summit, leaders from Electrosteel shared their vision on Viksit Bharat 2047 and discussed the role of water and Electrosteel's contribution in the journey towards a developed India by 2047.</h4>
                  <p>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.From addressing non-revenue water and lifecycle cost management to leveraging technology for efficient water use, the discussions highlighted strategies to overcome critical challenges. Insights from fellow visionary leaders revealed how sustainable practices, innovation, and collaboration can ensure water security, support economic growth, and create resilient communities.</p>

                  <ul>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                    <li>The session had a very lively discussion to showcase good practices in the sector, which will move us towards a developed India.</li>
                  </ul>`

}

const BlogDetailsContent = ({ data }) => {
  const Images = [
    { img: "/images/blog/details/blogImg.png", title: "Img 1" },
  ];
  return (
    <>
      <section>
              <Container90>
                <div className={styles.blogDetailsContent}>
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center :items-start gap-3 lg:gap-[20px] mb-[40px]">
                    <div>
                      {/* comment */}
                      <h2>{data?.title}</h2>
                      <div className="flex flex-col md:flex-row md:gap-[16px] gap-2">
                        <div className='flex gap-3 mb-0'><Calendar/> <span className='text-[#004AA1] uppercase'>{data?.date}</span></div>
                        <div className='flex gap-3 mb-0'><MapPin /> <span className='text-[#004AA1] uppercase'>{data?.location}</span></div>
                      </div>
                    </div>
                    <OutlineBackButtonLink
                      goto={"/newsroom/blog/"}
                      title={"Back"}
                      className={"btn-back-outline-text"}
                  />
                  </div>
                  <h3>{data?.description}</h3>
                  <img
                    src={createImageSourceURL(data?.image)}
                    alt={data?.title}
                    className={styles.alignRight}
                  />
                  <HTMLRender htmlString={data?.editor_description} />
                </div>
              </Container90>
            </section>  
    </>
  )
}

export default BlogDetailsContent