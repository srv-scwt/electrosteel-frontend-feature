import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";
import HTMLRender from "@/components/ui/HTMLRender";
import { createImageSourceURL } from "@/utils";



const AdvertiseSection = ({ AdvertiseData, ulData }) => {
  console.log(AdvertiseData);
  
  return (
    <section className={`bg-[#FFF8ED] ${styles.adSection}`}>
      <div className={`relative ${styles.containerLg}`}>
        <div className={`${styles.adBannerContent}`}>
          <div className={`flex gap-4 ${styles.adContainer}`}>
            <div className="flex-1">
              <div className={styles.sectionContentTitle}>
                
                <HTMLRender htmlString={`<h2>${AdvertiseData?.title}</h2>`} />
                <h3>{AdvertiseData?.sub_title}</h3>
              </div>
              <div className={styles.sectionContent}>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <h4>{AdvertiseData?.box_title}</h4>
                    <ul className="grid grid-cols-1 xl:grid-cols-2 items-start">
                      {Array.isArray(ulData) && ulData?.map((items, index) => (
                        <li key={index}>{items}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <HTMLRender htmlString={`<h4>${AdvertiseData?.image_title ?? ""}</h4>`} />
                    <div className="flex items-center gap-4">
                      <div className={`${styles.downloadStoreImage} lg:flex-1`}>
                        <Link href={"#appstore"} target="_blank" className="hover:opacity-90">
                          <Image
                            src={createImageSourceURL(AdvertiseData?.image1)}
                            alt="app store"
                            fill
                            className="w-[100%] h-[100%] object-fill object-center"
                          />
                        </Link>
                      </div>
                      <div className={`${styles.downloadStoreImage} lg:flex-1`}>
                        <Link href={"#playstore"} target="_blank" className="hover:opacity-90">
                          <Image
                            src={createImageSourceURL(AdvertiseData?.image2)}
                            alt="app store"
                            fill
                            className="w-[100%] h-[100%] object-fill object-center"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.adBannerContainer}>
              <div className="flex items-center justify-center">
                <div className={styles.adBanner}>
                  <Image
                    src={createImageSourceURL(AdvertiseData?.image3)}
                    alt="phone"
                    fill
                    className="object-contain object-center w-[100%] h-[100%] absolute"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertiseSection;
