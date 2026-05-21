"use client";
import styles from "./style.module.css";
import { OutlineButton, OutlineButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import cstyles from "@/app/common.module.css";
import { SlCalender } from "react-icons/sl";
import { createImageSourceURL, formatDate, truncateText } from "@/utils";
import useLoadMoreData from "@/hooks/useLoadMoreData";

const BlogListSection = ({ data }) => {
  const { visibleData, hasMore, handleLoadMore } = useLoadMoreData(data, 6);

  return (
    <>
      <section className={`py-0! ${cstyles.containerLg}`}>
        <>
          <div className={styles.blogWrapper}>
            {Array.isArray(visibleData) &&
              visibleData?.map((blog) => (
                <article key={blog.id}>
                  <div className={styles.blogCard}>
                    <Link href={`/newsroom/blog/${blog?.slug}`}>
                      <img src={createImageSourceURL(blog.image)} alt="img" />
                    </Link>
                    <div className={styles.sectionContent}>
                      {/* <div className={styles.blogPostDate}>{blog.date}</div> */}
                      <ul
                        className={`${styles.blogPostDate} flex flex-wrap gap-1`}
                      >
                        <li>
                          <SlCalender size={14} color="white" />
                          <span>{formatDate(blog?.date)}</span>
                        </li>
                      </ul>

                      <div className={styles.blogPostTitle}>
                        <h4>
                          <Link href={`/newsroom/blog/${blog?.slug}`}>
                            {blog?.title}
                          </Link>
                        </h4>
                      </div>
                      <div className={styles.blogPostDescription}>
                        <p>{truncateText(blog?.description, 10)}</p>
                      </div>
                      <div className={styles.blogPostReakd}>
                        <OutlineButtonLink
                          goto={`/newsroom/blog/${blog?.slug}`}
                          title={"Read More"}
                          className={"!text-white"}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          {hasMore ? (
            <div
              className={`${styles.buttonContainer} flex justify-center items-center pb-8`}
            >
              <OutlineButton
                action={handleLoadMore}
                title={"load more"}
                className={"flex items-center !justify-center"}
              />
            </div>
          ) : null}
        </>
      </section>
    </>
  );
};

export default BlogListSection;
