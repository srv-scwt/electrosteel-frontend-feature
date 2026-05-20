import BlogCard from "@/components/common/card/BlogCard";
import {
  OutlineBackButtonLink,
  OutlineButtonLink,
} from "@/components/ui/Button";
import React from "react";
import styles from "./style.module.css";
import commonStyles from "@/app/common.module.css";

const getBlogHref = (blog) => {
  if (blog?.slug) {
    return `/newsroom/blog/${blog.slug}`;
  }

  if (typeof blog?.link === "string") {
    const trimmedLink = blog.link.trim();

    if (
      trimmedLink.startsWith("/") ||
      trimmedLink.startsWith("http://") ||
      trimmedLink.startsWith("https://") ||
      trimmedLink.startsWith("#")
    ) {
      return trimmedLink;
    }
  }

  return "#";
};

const BlogWrapper = ({ data = [], previousBlog = null, nextBlog = null }) => {
  const hasRelatedBlogs = Array.isArray(data) && data.length > 0;
  const hasNavigation = previousBlog || nextBlog;

  return (
    <>
      <section>
        <div className={`${commonStyles.containerLg} py-0!`}>
          {hasRelatedBlogs ? (
            <div className={styles.blogWrapper}>
              {data.map((item, index) => (
                <BlogCard blog={item} key={item?.id ?? item?.slug ?? index} />
              ))}
            </div>
          ) : null}

          {hasNavigation ? (
            <div
              className={`flex items-center justify-between gap-4 w-[100%] ${styles.navPAdd}`}
            >
              <div>
                {previousBlog ? (
                  <OutlineBackButtonLink
                    goto={getBlogHref(previousBlog)}
                    title={"Previous Post"}
                    className={""}
                  />
                ) : null}
              </div>
              <div className="ml-auto">
                {nextBlog ? (
                  <OutlineButtonLink
                    goto={getBlogHref(nextBlog)}
                    title={"Next Post"}
                    className={""}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default BlogWrapper;
