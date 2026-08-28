"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useAppendQueryParam() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    // Accepts either a single (key, value) pair or an object of them. The
    // object form exists so related params can change together -- picking a
    // new filter has to reset `page` in the same navigation, otherwise the
    // reader lands on page 5 of a list that now has two pages.
    (queryKey, queryValue) => {
      const updates =
        queryKey && typeof queryKey === "object"
          ? queryKey
          : queryKey
            ? { [queryKey]: queryValue }
            : null;

      if (!updates) return;

      const params = new URLSearchParams(searchParams.toString());
      let changed = false;

      Object.entries(updates).forEach(([key, value]) => {
        const current = params.get(key);
        const next =
          value === undefined || value === null || value === ""
            ? null
            : String(value);

        if (current === next) return;

        changed = true;
        if (next === null) {
          params.delete(key);
        } else {
          params.set(key, next);
        }
      });

      if (!changed) return;

      const nextQuery = params.toString();
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams]
  );
}
