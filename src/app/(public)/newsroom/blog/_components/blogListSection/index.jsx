"use client";
import styles from "./style.module.css";
import { OutlineButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import cstyles from "@/app/common.module.css";
import { SlCalender } from "react-icons/sl";
import { createImageSourceURL, formatDate, truncateText } from "@/utils";

const BlogListSection = ({ data }) => {
  return (
    <>
      <section className={`py-0! ${cstyles.containerLg}`}>
        <>
          <div className={styles.blogWrapper}>
            {Array.isArray(data) &&
              data?.map((blog) => (
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

          <div
            className={`${styles.buttonContainer} flex justify-center items-center pb-8`}
          >
            <OutlineButtonLink
              goto="#"
              title="Load More"
              iconActive={false}
              className="flex items-center !justify-center"
            />
          </div>
        </>
      </section>
    </>
  );
};

export default BlogListSection;
