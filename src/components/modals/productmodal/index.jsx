"use client";

import Image from "next/image";
import styles from "./style.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { OutlineButtonLink } from "@/components/ui/Button";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";

export default function ProductModal({ isOpen, action, product , isViewDetails = true }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-100  overflow-y-auto">
      <div className={`max-w-[90vw] bg-white ${styles.containerLg} shadow-2xl relative`}>
        {/* Close Button */}
        <button
          onClick={() => action()}
          className="absolute top-[16px] cursor-pointer right-[16px] text-gray-600 hover:text-black text-xl"
        >
          <AiOutlineClose size={32} />
        </button>
        <div className={styles.containerModel}>
          <div className={`flex flex-col lg:flex-row ${styles.containerModelWrapper}`}>
            {/* Left Content */}
            <div>
              <div className={styles.leftContent}>
                <div className={styles.sectionContent}>
                  <HTMLRender htmlString={`<h5>${product?.title}</h5>`} />
                  <HTMLRender htmlString={product?.description} />
                </div>
              </div>
             {isViewDetails && (
              <div className={`${styles.buttonContainer}`}>
                <OutlineButtonLink goto={product.btnLink} title={"view DETAILS"} />
              </div>
              )}
            </div>

            {/* Right Image */}
            <div className="">
              <div
                className={`relative rounded-[12px] overflow-hidden ${styles.imageContainer}`}
              >
                <Image
                  // src={"/images/modal/modal2.png"}
                  src={createImageSourceURL(product?.image)}
                  alt={product?.title}
                  fill
                  className="object-cover object-center absolute w-[100%] h-[100%]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
