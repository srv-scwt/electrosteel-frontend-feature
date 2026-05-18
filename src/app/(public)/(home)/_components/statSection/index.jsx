"use client";
import Image from "next/image";
import CountUp from "react-countup";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
 
export default function StatSection({ overview }) {
  const overviewData = overview?.[0];
  return (
    <section className="relative bg-white text-[#1a1a1a]">
      <div className={styles.statsContainer}>
        {/* Main Content */}
        <div>
 
          <div id="overview" className={`flex justify-start items-start ${styles.overViewSection}`}>
            <div>
             
              <div className={`${styles.sectionContent} ${styles.sectionContentHeading}`}>
                <h2>{overviewData?.title ?? ""}</h2>
                <h3>
                  <HTMLRender htmlString={overviewData?.subtitle ?? ""} />
                </h3>
              </div>
            </div>
            <div>
              <div className={`${styles.sectionContent} mb-[16px]`}>
                <p>{overviewData?.description ?? ""}</p>
              </div>
              <OutlineButtonLink goto={overviewData?.url || "/about"} title={"read more"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
 