"use client";

import { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FancyboxWrapper = ({ delegate = "[data-fancybox]", options, children }) => {
  useEffect(() => {
    // Bind Fancybox
    NativeFancybox.bind(delegate, options || {});

    return () => {
      NativeFancybox.unbind(delegate);
      NativeFancybox.close();
    };
  }, [delegate, options]);

  return <>{children}</>;
};

export default FancyboxWrapper;
