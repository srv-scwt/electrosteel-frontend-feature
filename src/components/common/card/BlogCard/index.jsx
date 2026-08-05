import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { OutlineButtonLink } from '@/components/ui/Button'
import { createImageSourceURL, formatDate, truncateText } from '@/utils'

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
    const title = truncateText(blog?.title, 8);
    const description = truncateText(blog?.description || blog?.desc, 18);

    return (
        <>
            <article className={styles.cardItem}>
                <div className={styles.blogCard}>
                    <Link href={href}>
                        {/* Sized entirely by `.blogCard img` in CSS, and imageSrc
                            is "" when the CMS has no image — next/image throws on
                            an empty src, while <img> degrades. images.unoptimized
                            is on, so there is no optimization to gain either. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
