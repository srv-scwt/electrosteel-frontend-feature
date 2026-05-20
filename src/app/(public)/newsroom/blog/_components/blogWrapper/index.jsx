import BlogCard from "@/components/common/card/BlogCard";
import {
  OutlineBackButtonLink,
  OutlineButtonLink,
} from "@/components/ui/Button";
import React from "react";
import styles from "./style.module.css";
import commonStyles from "@/app/common.module.css";

const BlogWrapper = ({ data = [] }) => {
  return (
    <>
      <section>
        <div className={`${commonStyles.containerLg} py-0!`}>
          <div className={styles.blogWrapper}>
            {Array.isArray(data) &&
              data?.map((item, index) => <BlogCard blog={item} key={index} />)}
          </div>
          <div
            className={`flex items-center justify-between w-[100%] pb-12`}
          >
            <OutlineBackButtonLink
              goto={"/news/blog/hgjh"}
              title={"Previous Post"}
              className={""}
            />
            <OutlineButtonLink
              goto={"/news/blog/hgjh"}
              title={"Next post"}
              className={""}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogWrapper;
