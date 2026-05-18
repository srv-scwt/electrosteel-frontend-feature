"use client";
import Image from "next/image";
// import styles from "./style.module.css";
import styles from "@/app/common.module.css";
import cStyles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "../../../../../../../utils";

export default function GuidingPrinciples({ data, principlesData = [] }) {

  return (
    <section className="bg-[#f9f9f9]">
      <div className={styles.containerLg}>
        <div className={styles.sectionContent}>
          <div className="text-center">
            <HTMLRender htmlString={`<h2>${data?.title ?? ""}</h2>`} />
            <p className="mb-5">{data?.description ?? ""}</p>
          </div>

          <div className="guidingWrapper grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 lg:gap-12 items-start">
            {Array.isArray(principlesData) && principlesData.map((item) => (
              <div
                key={item.id}
                className={`${cStyles.totalBox} guidingItem bg-white p-5 shadow-md h-full rounded-[16px]`}
              >
                <div
                  className={`${item?.bg} ${cStyles.guideingImg} guideingLeft relative w-[83px] h-[83px] bg-[#fdc700] rounded-full flex items-center justify-center mb-4`}
                // style={{ backgroundColor: item.bg }}
                >
                  <Image
                    // src={item?.img ?? "/images/icons/icon5.png"}
                    src={createImageSourceURL(item?.image , "/images/icons/icon5.png")}
                    alt={item?.title ?? "Principle"}
                    fill
                    className={`!relative !w-[40px] !h-auto`}
                  />
                </div>

                <div className="guidingRight">
                  <p>
                    <b>{item?.title ?? ""}</b>
                  </p>
                  <p>{item?.description ?? ""}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
