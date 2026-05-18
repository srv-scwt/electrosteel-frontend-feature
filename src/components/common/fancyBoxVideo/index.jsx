// "use client";

// import { useEffect } from "react";
// import { Fancybox as NativeFancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// export default function FancyboxWrapper({ children }) {
//   useEffect(() => {
//     NativeFancybox.bind("[data-fancybox='video']", {
//       infinite: true,

//       Thumbs: {
//         autoStart: false,
//       },

//       Toolbar: {
//         display: ["counter", "fullscreen", "close"],
//       },

//       Carousel: {
//         transition: "slide",
//       },

//       Html5Video: {
//         autoplay: true,
//         controls: true,
//         preload: "metadata",
//       },
//     });

//     return () => {
//       NativeFancybox.destroy();
//     };
//   }, []);

//   return <>{children}</>;
// }


// "use client";

// import { useEffect } from "react";
// import { Fancybox as NativeFancybox } from "@fancyapps/ui";
// import "@fancyapps/ui/dist/fancybox/fancybox.css";

// export default function FancyboxWrapper({ children }) {
//   useEffect(() => {
//     NativeFancybox.bind("[data-fancybox='video']", {
//       infinite: true,

//       Thumbs: {
//         autoStart: false,
//       },

//       Toolbar: {
//         display: ["counter", "fullscreen", "close"],
//       },

//       Carousel: {
//         transition: "slide",
//         transitionDuration: 800,  // <-- slower transition (800ms)
//       },

//       Video: {
//         autoplay: true,
//         controls: true,
//         preload: "metadata",
//       },
//     });

//     return () => {
//       NativeFancybox.destroy();
//     };
//   }, []);

//   return <>{children}</>;
// }





"use client";

import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function FancyboxVideoWrapper({ children }) {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox='video-gallery']", {
      infinite: true,
      Thumbs: { autoStart: true },
      Toolbar: { display: ["counter", "fullscreen", "close"] },
      Carousel: {
        transition: "slide",
        transitionDuration: 600,
      },
      Html5Video: {
        autoplay: true,
        controls: true,
        preload: "metadata",
      },
    });

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{children}</>;
}
