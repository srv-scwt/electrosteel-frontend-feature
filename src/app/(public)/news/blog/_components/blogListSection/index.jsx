"use client";

import { useState } from "react";
import styles from "./style.module.css";
import HeroSection from "@/components/common/heroSection";
import { ButtonLink, OutlineButtonLink } from "@/components/ui/Button";
import Link from "next/link";
import Container90 from "@/components/common/Container90";

const BlogListSection = () => {
  const allBlogs = Array.from({ length: 50 }).map((_, index) => ({
    id: index + 1,
    img: "/images/blog/card/img1.png",
    date: `September ${16 - (index % 10)}, 2024`,
    title: `Blog title ${index + 1}`,
    desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
    link: "#",
  }));

  const [visibleCount, setVisibleCount] = useState(12);

  // const handleLoadMore = () => {
  //     setVisibleCount((prev) => prev + 8);
  // };

  const allShown = visibleCount >= allBlogs.length;

  return (
    <>
      <section>
        <Container90>
          <div className={styles.blogWrapper}>
            {allBlogs.slice(0, visibleCount).map((blog) => (
              <article key={blog.id}>
                <div className={styles.blogCard}>
                  <Link href={"/news/blog/hgjh"}>
                    <img src={blog.img} alt="img" />
                  </Link>
                  <div className={styles.blogPostDate}>{blog.date}</div>
                  <div className={styles.blogPostTitle}>
                    <h4>
                      <Link href={"/news/blog/hgjh"}>{blog.title}</Link>
                    </h4>
                  </div>
                  <div className={styles.blogPostDescription}>
                    <p>{blog.desc}</p>
                  </div>
                  <div className={styles.blogPostReakd}>
                    <OutlineButtonLink
                      goto={"/news/blog/hgjh"}
                      title={"Read More"}
                      className={"!text-white"}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!allShown && (
            <div
              className={`${styles.buttonContainer} flex justify-center items-center pb-8`}
            >
              <ButtonLink
                goto="#"
                title="Load More"
                iconActive={false}
                className="flex items-center !justify-center"
              />
            </div>
          )}
        </Container90>
      </section>
    </>
  );
};

export default BlogListSection;
