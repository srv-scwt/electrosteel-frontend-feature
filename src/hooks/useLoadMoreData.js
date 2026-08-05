"use client";

import { useState } from "react";

const DEFAULT_CHUNK_SIZE = 6;

export default function useLoadMoreData(
  data = [],
  chunkSize = DEFAULT_CHUNK_SIZE
) {
  const normalizedData = Array.isArray(data) ? data : [];

  // Track how many extra chunks the user has revealed rather than an absolute
  // count, so the visible count stays derived from the current data.
  const [extraChunks, setExtraChunks] = useState(0);

  // Reset paging when the underlying dataset changes (e.g. a filter was applied).
  // Compared by value, not identity: callers routinely pass inline arrays, and an
  // identity check would reset on every render.
  const resetKey = `${chunkSize}:${normalizedData.length}`;
  const [previousResetKey, setPreviousResetKey] = useState(resetKey);

  if (previousResetKey !== resetKey) {
    setPreviousResetKey(resetKey);
    setExtraChunks(0);
  }

  const visibleCount = Math.min(
    chunkSize * (extraChunks + 1),
    normalizedData.length
  );
  const visibleData = normalizedData.slice(0, visibleCount);
  const hasMore = visibleCount < normalizedData.length;

  const handleLoadMore = () => {
    setExtraChunks((currentChunks) => currentChunks + 1);
  };

  return {
    visibleData,
    hasMore,
    handleLoadMore,
  };
}
