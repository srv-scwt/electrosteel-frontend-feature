"use client";

import { useEffect, useState } from "react";

const DEFAULT_CHUNK_SIZE = 6;

export default function useLoadMoreData(
  data = [],
  chunkSize = DEFAULT_CHUNK_SIZE
) {
  const normalizedData = Array.isArray(data) ? data : [];
  const [visibleCount, setVisibleCount] = useState(chunkSize);

  useEffect(() => {
    setVisibleCount(chunkSize);
  }, [data, chunkSize]);

  const visibleData = normalizedData.slice(0, visibleCount);
  const hasMore = visibleCount < normalizedData.length;

  const handleLoadMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + chunkSize, normalizedData.length)
    );
  };

  return {
    visibleData,
    hasMore,
    handleLoadMore,
  };
}
