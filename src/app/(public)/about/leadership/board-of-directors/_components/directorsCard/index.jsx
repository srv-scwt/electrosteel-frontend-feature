import Image from "next/image";
import React from "react";
import styles from "./style.module.css";
import { createImageSourceURL } from "../../../../../../../utils";

const DirectorCard = ({data , action}) => {
  return (
    <li onClick={() => action()} className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <Image
          // src={data?.image}
          src={createImageSourceURL(data?.profile_image)}
          alt={data?.name ?? "director"}
          fill
          className="object-cover object-center w-100 h-100"
        />
      </div>
      <div className={styles.cardBottomContent}>
        <div className={styles.cardContent}>
          <h2>{data?.name ?? ""}</h2>
          <h3>{data?.designation ?? ""}</h3>
        </div>
        <div>
          <svg
            width="105"
            height="94"
            viewBox="0 0 105 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6268 69.3333C22.6077 89.6 7.20096 92.8889 0 92V94H105V0C104.598 21.8667 89.4258 28.2222 81.89 28.6667H47.2249C32.3541 31.8667 27.2967 49.1111 26.6268 57.3333V69.3333Z"
              fill="white"
            />
            <path
              d="M50.5859 59.9167V58H62.0859V46.5H64.0026V58H75.5026V59.9167H64.0026V71.4167H62.0859V59.9167H50.5859Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default DirectorCard;
