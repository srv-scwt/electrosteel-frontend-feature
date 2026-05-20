import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { OutlineButtonLink } from '@/components/ui/Button'
import { createImageSourceURL, formatDate } from '@/utils'

const stripHtml = (value = "") =>
    String(value)
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const truncateCharacters = (value = "", maxLength = 20) => {
    if (value.length <= maxLength) {
        return value;
    }

    return `${value.slice(0, maxLength).trimEnd()}...`;
};

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

const BlogCard = ({ blog = {} }) => {
    const href = getBlogHref(blog);
    const imageSrc = createImageSourceURL(blog?.image || blog?.img, blog?.img || "/images/blog/card/img1.png");
    const formattedDate = formatDate(blog?.date || blog?.created_at);
    const title = truncateCharacters(stripHtml(blog?.title));
    const description = truncateCharacters(stripHtml(blog?.description || blog?.desc) , 40);

    return (
        <>
            <article className={styles.cardItem}>
                <div className={styles.blogCard}>
                    <Link href={href}>
                        <img src={imageSrc} alt={blog?.title || "Blog"} />
                    </Link>
                    {formattedDate ? (
                        <div className={styles.blogPostDate}>{formattedDate}</div>
                    ) : null}
                    <div className={styles.blogPostTitle}>
                        <h4>
                            <Link href={href}>{title}</Link>
                        </h4>
                    </div>
                    <div className={styles.blogPostDescription}>
                        <p>{description}</p>
                    </div>
                    <div className={styles.blogPostReakd}>
                        <OutlineButtonLink
                            goto={href}
                            title={"Read More"}
                            className={""}
                        />
                    </div>
                </div>
            </article>
        </>
    )
}

export default BlogCard
