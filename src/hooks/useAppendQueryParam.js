"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useAppendQueryParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback((queryKey, queryValue) => {
    if (!queryKey) return;
    const currentValue = searchParams.get(queryKey);
    if (currentValue === queryValue) return;

    const params = new URLSearchParams(searchParams.toString());
    if (queryValue) {
      params.set(queryKey, queryValue);
    } else {
      params.delete(queryKey);
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }, [pathname, router, searchParams]);
}
