

// "use client";

// import FancyboxVideoWrapper from "@/components/common/fancyBoxVideo";
// import styles from "@/app/common.module.css";
// import { FaPlay } from "react-icons/fa";
// import { createVideoSourceURL } from "@/utils";

// const title = "Video Gallery";

// export default function VideoGallery({ sectionId, data = [] }) {
//   if (!data?.length) return null;

//   return (
//     <section id={sectionId}>
//       <div className={`${styles.containerLg} !py-0`}>
//         <FancyboxVideoWrapper>
//           <div className={styles.sectionContent}>
//             <h2>
//               <span>{title}</span>
//             </h2>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {data.map((item, index) => {
//               const videoSrc = item?.link || createVideoSourceURL(item?.image);

//               return (
//                 <a
//                   key={item?.id || index}
//                   href={`#video-${index}`}
//                   data-fancybox="video-gallery"
//                   data-caption={item?.title || ""}
//                   className="group relative overflow-hidden rounded-xl cursor-pointer"
//                 >
//                   <div className="relative h-60 bg-black">
//                     <video
//                       src={videoSrc}
//                       muted
//                       autoPlay
//                       playsInline
//                       loop
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-black/60 p-4 rounded-full group-hover:scale-110 transition">
//                       <FaPlay className="text-white text-xl ml-1" />
//                     </div>
//                   </div>

//                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
//                     <div className={`${styles.sectionContent} w-full`}>
//                       <h3 className="text-white">{item?.title}</h3>
//                     </div>
//                   </div>

//                   <div style={{ display: "none" }} id={`video-${index}`}>
//                     <video
//                       src={videoSrc}
//                       controls
//                       autoPlay
//                       className="w-full h-auto max-h-[80vh]"
//                     />
//                   </div>
//                 </a>
//               );
//             })}
//           </div>
//         </FancyboxVideoWrapper>
//       </div>
//     </section>
//   );
// }


"use client";

import FancyboxVideoWrapper from "@/components/common/fancyBoxVideo";
import styles from "@/app/common.module.css";
import { FaPlay } from "react-icons/fa";
import { createVideoSourceURL } from "@/utils";

const title = "Video Gallery";

export default function VideoGallery({ sectionId, data = [] }) {
  if (!data?.length) return null;

  return (
    <section id={sectionId}>
      <div className={`${styles.containerLg} !py-0`}>
        <FancyboxVideoWrapper>
          <div className={styles.sectionContent}>
            <h2>
              <span>{title}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.map((item, index) => {
              const videoSrc = item?.link || item?.video || item?.image;

              if (!videoSrc) return null;

              return (
                <a
                  key={item?.id || index}
                  href={createVideoSourceURL(videoSrc)}
                  data-fancybox="video-gallery"
                  data-type="html5video"
                  data-caption={item?.title || ""}
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                >
                  <div className="relative h-60 bg-black">
                    <video
                      muted
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onError={() => console.log("Video error:", videoSrc)}
                    >
                      <source src={createVideoSourceURL(videoSrc)} type="video/mp4" />
                    </video>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/60 p-4 rounded-full group-hover:scale-110 transition">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <div className={`${styles.sectionContent} w-full`}>
                      <h3 className="text-white">{item?.title || ""}</h3>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </FancyboxVideoWrapper>
      </div>
    </section>
  );
}