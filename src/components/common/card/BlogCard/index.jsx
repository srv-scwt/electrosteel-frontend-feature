import React from 'react'
import styles from './style.module.css'
import Link from 'next/link'
import { OutlineButtonLink } from '@/components/ui/Button'

const BlogCard = ({ blog }) => {
    return (
        <>
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
                            className={""}
                        />
                    </div>
                </div>
            </article>
        </>
    )
}

export default BlogCard