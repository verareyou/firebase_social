import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { PostCard } from '../../components'
import { sortPostsByTime, splitPosts } from '../../utils/Operations'

const ProfilePosts = ({user, isCurrent}: any) => {
    const { theme } = useSelector((state: any) => state)
    const [Posts, setPosts] = useState<any>([])

    useEffect(() => {
        if (!user.Posts) {
        }
        const sort = async () => {
        const sortedPosts = sortPostsByTime(user.Posts)
        // setPosts(sortedPosts)
        // const split = await splitPosts(sortedPosts)
        // console.log(split)
        setPosts(sortedPosts)
        }
        sort()
    }, [user])

  return (
    <div
        style={{
            color: theme.text,
        }}
        className=' flex md:flex-col flex-row flex-grow gap-2   '

    >
        <div
            className='h-full md:hidden w-[50%] gap-2 flex flex-col'
        >
        {Posts && splitPosts(Posts)[0].map((post: any, index:any) => (
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

        {Posts && splitPosts(Posts)[1].map((post: any, index:any) => (
            <PostCard
                key={index}
                post={post}
                isCurrent={isCurrent}
            />
        ))}
        </div>

        <div
            className='hidden md:grid grid-cols-3 flex-1 flex-grow justify-center flex-wrap gap-2'
        >
        {Posts && Posts.map((post: any, index:any) => (
            <PostCard
                key={index}
                post={post}
                isCurrent={isCurrent}
            />
        ))}
        </div>

    </div>
  )
}

export default ProfilePosts