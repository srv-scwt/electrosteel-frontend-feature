"use client";

import { useEffect } from "react";
import SomethingWentWrong from "@/components/common/SomethingWentWrong";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("APP_BOUNDARY_ERROR:", error);
  }, [error]);

  return (
    <SomethingWentWrong
      message="We couldn’t load this page right now. Please try again."
      errorCode={error?.digest || "APP_ERROR"}
      onRetry={reset}
    />
  );
}
