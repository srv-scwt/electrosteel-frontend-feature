"use client";

import React, { useState } from "react";
import styles from "@/app/common.module.css";
import PressMediaCard from "@/components/common/card/PressMediaCard";
import { OutlineButton } from "@/components/ui/Button";
import {
  BLOG_PAGE_SIZE,
  fetchBlogsPage,
  hasNextPage,
} from "@/services/blogs/blog.client.api";

const LatestElectrosteelListing = ({
  className,
  data = [],
  pagination = null,
  category,
  pageSize = BLOG_PAGE_SIZE,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialPosts = Array.isArray(data) ? data : [];
  const [posts, setPosts] = useState(initialPosts);
  const [lastPage, setLastPage] = useState(pagination?.page ?? 1);
  const [hasMore, setHasMore] = useState(hasNextPage(pagination));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // A fresh server render (navigation, revalidate) must reset the appended
  // pages, otherwise the browser keeps showing the previous request's tail.
  // Compared by value: the props are new arrays on every render.
  const serverKey = `${pagination?.page ?? 1}:${initialPosts.length}:${initialPosts[0]?.id ?? ""}`;
  const [previousServerKey, setPreviousServerKey] = useState(serverKey);
  if (previousServerKey !== serverKey) {
    setPreviousServerKey(serverKey);
    setPosts(initialPosts);
    setLastPage(pagination?.page ?? 1);
    setHasMore(hasNextPage(pagination));
    setError(null);
  }

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    setError(null);

    const result = await fetchBlogsPage({
      category,
      page: lastPage + 1,
      limit: pageSize,
    });

    if (!result) {
      setError("Couldn’t load more stories. Please try again.");
      setIsLoading(false);
      return;
    }

    setPosts((current) => {
      // De-dupe by id: a CMS entry added between requests shifts everything
      // down a slot and would otherwise repeat an item across pages.
      const seen = new Set(current.map((post) => post?.id));
      return [...current, ...result.data.filter((post) => !seen.has(post?.id))];
    });
    setLastPage((current) => current + 1);
    setHasMore(hasNextPage(result.pagination));
    setIsLoading(false);
  };

  return (
    <section>
      <div className={`${styles.containerLg} ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <PressMediaCard
              key={post?.id || index}
              post={post}
              onVideoOpen={() => setIsOpen(true)}
              goTo={`/newsroom/latest-at-electrosteel/${post?.slug}`}
            />
          ))}
        </div>

        {hasMore ? (
          <div className="flex flex-col justify-center items-center gap-3 pt-10">
            <OutlineButton
              action={handleLoadMore}
              title={isLoading ? "loading..." : "load more"}
              disabled={isLoading}
              className={"flex items-center !justify-center"}
            />
            {error ? (
              <p className="fontF-secondary text-sm text-red-600">{error}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default LatestElectrosteelListing;
