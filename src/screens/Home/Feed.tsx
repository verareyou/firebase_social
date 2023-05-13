import React from 'react'
import { useSelector } from 'react-redux'
import FeedCard from './FeedCard'

const Feed = ({ Posts, user }: any) => {
    const { theme } = useSelector((state: any) => state)
    return (
        <div
            style={{
                color: theme.text,
            }}
            className=' flex-1 min-h-screen w-full flex flex-col justify-center items-center gap-2 p-4 '
        >

            <div className=' flex flex-col flex-grow items-center w-full'>
                {Posts && Posts.map((post: any, index: any) => (
                    <FeedCard key={index} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Feed