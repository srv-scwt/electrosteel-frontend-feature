"use client";

import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default function FancyboxWrapper({ children }) {
  useEffect(() => {
    NativeFancybox.bind("[data-fancybox='gallery']", {
      Thumbs: {
        autoStart: true,
      },
      Toolbar: {
        display: [
          "counter",
          "zoom",
          "slideshow",
          "fullscreen",
          "thumbs",
          "close",
        ],
      },
      Images: {
        zoom: true,
      },
      Carousel: {
        transition: "slide",
      },
    });

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return children;
}
