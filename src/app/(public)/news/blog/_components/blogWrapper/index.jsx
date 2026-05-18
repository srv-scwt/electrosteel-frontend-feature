import BlogCard from '@/components/common/card/BlogCard'
import Container90 from '@/components/common/Container90'
import { OutlineBackButtonLink, OutlineButtonLink } from '@/components/ui/Button'
import React from 'react'
import styles from './style.module.css'

const BlogWrapper = () => {
    let index = 1
    const blogArr = [
        {
            img: "/images/blog/card/img1.png",
            date: `September ${16 - (index % 10)}, 2024`,
            title: `Blog title ${index + 1}`,
            desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
            link: "#",
        },
        {
            img: "/images/blog/card/img1.png",
            date: `September ${16 - (index % 10)}, 2024`,
            title: `Blog title ${index + 1}`,
            desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
            link: "#",
        },
        {
            img: "/images/blog/card/img1.png",
            date: `September ${16 - (index % 10)}, 2024`,
            title: `Blog title ${index + 1}`,
            desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
            link: "#",
        },
        {
            img: "/images/blog/card/img1.png",
            date: `September ${16 - (index % 10)}, 2024`,
            title: `Blog title ${index + 1}`,
            desc: "The 10th Water Innovation Summit 'Viksit Bharat @2024, Water Partnerships..",
            link: "#",
        }
    ]
    return (
        <>
            <section>
                <Container90>
                     <div className={styles.blogWrapper}>
                        {blogArr.map((item,index) => <BlogCard blog={item} key={index}/>)}
                    </div>
                    <div className={`flex items-center justify-between w-[100%] ${styles.navPAdd}`}>
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
                </Container90>
            </section>
        </>
    )
}

export default BlogWrapper