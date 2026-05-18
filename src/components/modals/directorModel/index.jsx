import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { createImageSourceURL } from "../../../utils";

const DirectorModel = ({ action, isModelOpen, data }) => {
  if (!isModelOpen || !data) return null;

  return (
    <div
      className={`${styles.directorModelContainer} ${isModelOpen ? styles.modelOpen : styles.modelClose}`}
    >
      <div className={`${styles.modelContainer} relative`}>
        <button
          onClick={() => action()}
          className={`absolute top-[clamp(24px, 2.3vw, 48px)] cursor-pointer right-[clamp(24px, 2.3vw, 48px)] text-gray-600 hover:text-black text-xl ${styles.closeBtnContainer}`}
        >
          <AiOutlineClose size={32} />
        </button>
        <div className={`${styles.modelWrapperFlex} flex`}>
          <div className={styles.imageContainer}>
            <Image
              // src={data?.image}
              src={createImageSourceURL(data?.profile_image)}
              alt={data?.name}
              fill
              className="w-100 h-100 object-center object-cover"
            />
          </div>
          <div className={`${styles.sectionContent} flex-1`}>
            <h4>{data?.name ?? ""}</h4>
            <h5>{data?.designation ?? ""}</h5>
            <p>{data?.description ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorModel;
