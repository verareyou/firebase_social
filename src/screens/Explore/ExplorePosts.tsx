import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PostCard } from '../../components'
import { sortPostsByTime, splitPosts } from '../../utils/Operations'
import { getAllPosts } from '../../services/Post'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setLoading } from '../../redux/userSlice'

const ExplorePosts = () => {
    const { theme, user } = useSelector((state: any) => state)
    const [Posts, setPosts] = useState<any>([])
    const dispatch = useDispatch()
    // const [user, setUser] = useState<any>(null)
    const [isCurrent, setIsCurrent] = useState<boolean>(false)

    const fetchPosts = async () => {
        dispatch(setLoading(true))
        const res = await getAllPosts()
        if (res) {
            const sortedPosts = sortPostsByTime(res)
            setPosts(sortedPosts)
        }
        dispatch(setLoading(false))
    }
    useEffect(() => {
        fetchPosts()
    }, [user])

    // useEffect(() => {
    //     fetchPosts()
    // }, [])

    const animate = {
        initial: {
            // opacity: 0,
            scale: 1.2,
        },
        animate: {
            // opacity: 1,
            scale: 1,
        },
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    }

    return (
        <motion.div
            // {...animate}
            style={{
                color: theme.text,
                backgroundColor: theme.background
            }}
            className=' flex md:flex-col flex-row flex-grow gap-2 md:p-4 p-2 '

        >
            <div
                className='h-full md:hidden w-[50%] gap-2 flex flex-col'
            >
                {Posts && splitPosts(Posts)[0].map((post: any, index: any) => (
                    <PostCard
                        key={index}
                        post={post}
                        isCurrent={isCurrent}
                    />
                ))}
            </div>
            <div
                className='md:hidden w-[50%] h-full gap-2 flex flex-col'
            >

                {Posts && splitPosts(Posts)[1].map((post: any, index: any) => (
                    <PostCard
                        key={index}
                        post={post}
                        isCurrent={isCurrent}
                    />
                ))}
            </div>

            <div
                className='hidden md:grid grid-cols-3 flex-1 flex-grow justify-center flex-wrap gap-1'
            >
                {Posts && Posts.map((post: any, index: any) => (
                    <PostCard
                        key={index}
                        post={post}
                        isCurrent={isCurrent}
                    />
                ))}
            </div>

        </motion.div>
    )
}


export default ExplorePosts